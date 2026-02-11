// Define the types for projects
export type StyleOptions = "dark" | "light" | "none" | "both";
export type ImageInfo = {
	preview: string;
	iframe?: boolean; // default false
	full: string;
	alt: string;
	aspectRatio: number;
	height: number;
	dropShadowWithTheme?: StyleOptions;
};
export type ImageList = {
	centerFirstImage: boolean;
	height: number;
	images: Omit<ImageInfo, "height">[];
};
export const isImageList = (props: unknown): props is ImageList => {
	const imageScrollerProps = props as ImageList;
	return (
		typeof imageScrollerProps.height === "number" &&
		Array.isArray(imageScrollerProps.images) &&
		imageScrollerProps.images.every(
			(image) =>
				typeof image.preview === "string" &&
				typeof image.full === "string" &&
				typeof image.alt === "string" &&
				typeof image.aspectRatio === "number",
		)
	);
};
export type Link = {
	text: string;
	href: string;
};
export type Project = {
	name: string;
	description: string;
	imageScroller?: ImageList;
	image?: ImageInfo;
	links?: Link[];
};
export type SubSection = {
	title: string;
	description?: string; // markdown
} & (
	| {
			imageScroller: ImageList;
	  }
	| {
			projects: Project[];
	  }
);
export type Section = {
	name: string; // used for url
	title: string;
	subtitle?: string; // displayed next to title
	description?: string; // markdown
	subSections?: SubSection[];
	links?: Link[];
};
