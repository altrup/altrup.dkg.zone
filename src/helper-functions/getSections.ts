import { createClient, PostgrestError } from '@supabase/supabase-js';

// Define the types for projects
export type StyleOptions = "dark" | "light" | "none" | "both";
export type ImageInfo = { preview: string, full: string, alt: string, aspectRatio: number, height: number, dropShadowWithTheme?: StyleOptions };
export type ImageList = {
	centerFirstImage: boolean,
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
export type SubSection = {
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
export type Section = {
	name: string; // used for url
	title: string;
	description?: string;
	subSections: SubSection[];
}

export const getSections = (
	{ supabaseURL, supabaseAnonKey, supabaseTableName }: { supabaseURL: string, supabaseAnonKey: string, supabaseTableName: string }
) => {
	const supabase = createClient(supabaseURL, supabaseAnonKey);
	const tableName = supabaseTableName;

	return new Promise<Section[]>((resolve, reject) => {
		supabase.from(tableName).select("id, Sections").then(({ data, error }: { data: { id: number, Sections: Section }[] | null, error: PostgrestError | null }) => {
			if (error) {
				reject(error);
			}
			else if (data) {
				const sortedData = data.sort((a, b) => a.id - b.id);
				resolve(sortedData.map(({ Sections }) => Sections));
			}
		});
	});
};
