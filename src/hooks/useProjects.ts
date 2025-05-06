import { createClient, PostgrestError, RealtimeChannel } from '@supabase/supabase-js';
import { useEffect, useReducer, useRef } from 'react';

const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL as string,
	import.meta.env.VITE_SUPABASE_ANON_KEY as string
);

// Define the types for projects
export type ImageInfo = { preview: string, full: string, alt: string, aspectRatio: number, height: number };
export type ImageList = {
	height: number,
	images: (Omit<ImageInfo, "height">)[]
};
export const isImageList = (props: unknown): props is ImageList => {
	const imageScrollerProps = props as ImageList;
	return typeof imageScrollerProps.height === "number" && Array.isArray(imageScrollerProps.images) && imageScrollerProps.images.every(image =>
		typeof image.preview === "string" && typeof image.full === "string" && typeof image.alt === "string" && typeof image.aspectRatio === "number");
};
export type Link = {
	text: string;
	href: string;
}
export type Project = {
	name: string;
	description: string;
	imageScroller?: ImageList;
	image?: ImageInfo;
	links?: Link[];
}
export type ProjectSection = {
	title: string;
	description?: string | (string | Link)[];
} & (
		{
			imageScroller: ImageList;
		}
		| {
			projects: Project[]
		}
	)

export const useProjects = () => {
	const [projects, dispatchProjects] = useReducer<
		(state: ProjectSection[], action:
			{ type: "SET", projects: ProjectSection[] } |
			{ type: "ADD", project: ProjectSection } |
			{ type: "UPDATE", project: ProjectSection, index: number } |
			{ type: "DELETE", index: number }
		) => ProjectSection[]
	>((state, action) => {
		if (action.type === "SET") {
			return action.projects;
		} else if (action.type === "ADD") {
			return [...state, action.project];
		} else if (action.type === "UPDATE") {
			const newProjects = [...state];
			newProjects[action.index] = action.project;
			return newProjects;
		} else {
			return state.slice(0, action.index).concat(state.slice(action.index + 1));
		}
	}, []);
	// map of project IDs to their index in the projects array
	const projectIDMap = useRef(new Map<number, number>());

	// initial fetch
	useEffect(() => {
		supabase.from('test').select().then(({ data, error }: { data: { id: number, Projects: ProjectSection }[] | null, error: PostgrestError | null }) => {
			if (error) {
				console.error(error);
			}
			else if (data) {
				// console.log("INITIAL DATA", data);
				const sortedData = data.sort((a, b) => a.id - b.id);
				dispatchProjects({
					type: "SET",
					projects: sortedData.map(({ id, Projects }, index) => {
						projectIDMap.current.set(id, index);
						return Projects;
					})
				});
			}
		});
	}, []);

	// add listeners to the supabase client
	useEffect(() => {
		let isMounted = true;
		let channel: RealtimeChannel | null = null;

		supabase.realtime.setAuth().then(() => {
			if (!isMounted) return;
			channel = supabase
				.channel('table:public:test')
				.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'test' }, (payload) => {
					// console.log('INSERT', payload);
					dispatchProjects({
						type: "ADD",
						project: payload.new.Projects as ProjectSection
					});
					projectIDMap.current.set(payload.new.id as number, projectIDMap.current.size);
				})
				.on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'test' }, (payload) => {
					// console.log('UPDATE', payload);
					const index = projectIDMap.current.get(payload.old.id as number);
					if (index !== undefined) {
						dispatchProjects({
							type: "UPDATE",
							project: payload.new.Projects as ProjectSection,
							index: index
						});
					}
					// update the projectIDMap with the new index
					projectIDMap.current.set(payload.new.id as number, index as number);
					projectIDMap.current.delete(payload.old.id as number);
				})
				.on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'test' }, (payload) => {
					// console.log('DELETE', payload);
					const index = projectIDMap.current.get(payload.old.id as number);
					if (index !== undefined) {
						dispatchProjects({
							type: "DELETE",
							index: index
						});
						// remove the project from the projectIDMap
						projectIDMap.current.delete(payload.old.id as number);
					}
				})
				.subscribe();
		}).catch((error: unknown) => { console.error(error) });

		return () => {
			// console.log("unmounting");
			isMounted = false;
			const currentChannel = channel;
			if (currentChannel) {
				supabase.realtime.setAuth().then(() => {
					supabase.removeChannel(currentChannel).catch((error: unknown) => { console.error(error) });
				}).catch((error: unknown) => { console.error(error) });
			}
		};
	}, []);

	return projects;
};
