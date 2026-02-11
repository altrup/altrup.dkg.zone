"use client";

// Component for showing projects
import { useMemo } from "react";

import ImageScroller from "./image-scroller";

import InteractiveImage from "../../components/interactive-image";

import type { Project } from "../../../types";

import styles from "./project.module.css";
import transitionStyles from "../../transitions.module.css";
import projectImageScrollerStyles from "./project-image-scroller.module.css";
// NOTE: imageScroller overrides image
function Project({ name, description, links, image, imageScroller }: Project) {
	const imageScrollerWidth = useMemo(() => {
		if (!imageScroller) return undefined;
		const maxWidth = imageScroller.images.reduce(
			(maxWidth, image) =>
				Math.max(maxWidth, image.aspectRatio * imageScroller.height),
			0,
		);
		return maxWidth;
	}, [imageScroller]);

	const clickableInteractiveClass = useMemo(
		() =>
			[
				transitionStyles["interactive"],
				transitionStyles["clickable"],
				transitionStyles["rounded-square"],
			].join(" "),
		[],
	);
	return (
		<div
			className={[styles["project"], transitionStyles["interactive"]].join(" ")}
		>
			<div
				className={[
					styles["project-child"],
					imageScroller
						? styles["image-scroller"]
						: image
							? styles["image"]
							: undefined,
				].join(" ")}
			>
				{imageScroller ? (
					<ImageScroller
						customStyle={projectImageScrollerStyles}
						width={imageScrollerWidth}
						height={imageScroller.height}
						centerFirstImage={imageScroller.centerFirstImage}
						images={imageScroller.images}
						arrowNavigation
					/>
				) : image ? (
					<InteractiveImage
						image={image}
						customClass={styles["custom-image-margin"]}
					/>
				) : undefined}
				<div
					className={[
						styles["text"],
						imageScroller
							? styles["image-scroller"]
							: image
								? styles["image"]
								: undefined,
					].join(" ")}
				>
					<div className={styles["label"]}>
						<h3
							className={[
								transitionStyles["interactive"],
								styles["title"],
							].join(" ")}
						>
							{name}
						</h3>
						{links ? (
							<div className={styles["links"]}>
								{links.map((link, index) => (
									<a
										key={index}
										className={clickableInteractiveClass}
										href={link.href}
										target="_blank"
										rel="noreferrer"
									>
										{link.text}
									</a>
								))}
							</div>
						) : undefined}
					</div>
					<p
						className={[
							styles["description"],
							transitionStyles["interactive"],
						].join(" ")}
					>
						{description}
					</p>
				</div>
			</div>
		</div>
	);
}

export default Project;
