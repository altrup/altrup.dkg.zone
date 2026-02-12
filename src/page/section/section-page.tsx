"use client";

import Markdown from "react-markdown";

import { isImageList, type Section } from "../../types";

import styles from "./section-page.module.css";
import transitionStyles from "../transitions.module.css";

import Project from "./components/project";
import ImageScroller from "./components/image-scroller";

const interactiveClass = transitionStyles["interactive"];
const clickableClass = [interactiveClass, transitionStyles["clickable"]].join(
	" ",
);
const clickableRoundedClass = [
	clickableClass,
	transitionStyles["rounded-square"],
].join(" ");

const markdownComponents = (pClassName: string) => ({
	p: ({ children }: { children?: React.ReactNode }) => (
		<p className={pClassName}>{children}</p>
	),
	a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
		<a
			className={clickableRoundedClass}
			target="_blank"
			rel="noreferrer"
			href={href}
		>
			{children}
		</a>
	),
});

const SectionPage = ({
	name,
	title,
	subtitle,
	description,
	subSections,
	links,
}: Section) => {
	return (
		<div
			id={name}
			className={[styles["sections-page"], !subSections ? styles["fit-content"] : undefined].join(" ")}
		>
			<div id={styles["sections-page-child"]} className={interactiveClass}>
				<div className={styles["sections-title"]}>
					<h1 id={styles["sections-label"]} className={interactiveClass}>
						{title}
					</h1>
					{subtitle ? (
						<p
							className={[styles["sections-subtitle"], interactiveClass].join(
								" ",
							)}
						>
							{subtitle}
						</p>
					) : null}
				</div>
				{description ? (
					<Markdown
						components={markdownComponents(
							[styles["sections-description"], interactiveClass].join(" "),
						)}
					>
						{description}
					</Markdown>
				) : null}

				{subSections?.map((section, index) => (
					<div
						key={index}
						className={[styles["section-type-div"], interactiveClass].join(" ")}
					>
						<h2
							className={[styles["section-type-label"], interactiveClass].join(
								" ",
							)}
						>
							{section.title}
						</h2>
						{section.description ? (
							<Markdown
								components={markdownComponents(
									[styles["section-type-description"], interactiveClass].join(
										" ",
									),
								)}
							>
								{section.description}
							</Markdown>
						) : undefined}
						{"projects" in section &&
						Object.prototype.toString.call(section.projects) ===
							"[object Array]" &&
						section.projects.length > 0 ? (
							<div className={styles["sections-div"]}>
								{section.projects.map((project, index) => (
									<Project
										key={index}
										name={project.name}
										description={project.description}
										imageScroller={
											"imageScroller" in project &&
											isImageList(project.imageScroller)
												? project.imageScroller
												: undefined
										}
										image={"image" in project ? project.image : undefined}
										links={"links" in project ? project.links : undefined}
									/>
								))}
							</div>
						) : undefined}
						{"imageScroller" in section &&
						isImageList(section.imageScroller) ? (
							<ImageScroller
								height={section.imageScroller.height}
								images={section.imageScroller.images}
								centerFirstImage={section.imageScroller.centerFirstImage}
								arrowNavigation
							/>
						) : undefined}
					</div>
				))}

				{links && links.length > 0 ? (
					<div
						className={[styles["sections-links"], interactiveClass].join(" ")}
					>
						{links.map((link) => (
							<a
								key={link.href}
								href={link.href}
								className={clickableClass}
								{...(link.href.startsWith("mailto:")
									? {}
									: { target: "_blank", rel: "noreferrer" })}
							>
								{link.text}
							</a>
						))}
					</div>
				) : null}
			</div>
		</div>
	);
};

export default SectionPage;
