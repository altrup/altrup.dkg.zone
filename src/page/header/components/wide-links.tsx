"use client";

// component for links when we have a wide enough screen

import { useCallback, useContext, useMemo } from "react";

import styles from "./wide-links.module.css";
import transitionStyles from "../../transitions.module.css";
import unFocus from "../../../util/un-focus";

import { SectionsContext } from "../../root";
import { useScrollSpy } from "../../../util/use-scroll-spy";
import { inView } from "motion";
import { scrollToElement } from "../../../util/scroll-to-element";

function WideLinks({
	updatePageInfo,
}: {
	updatePageInfo: (pageName: string) => void;
}) {
	const sections = useContext(SectionsContext);
	const spyTargets = useMemo(
		() =>
			["home", ...sections.map((s) => s.name)].map((name, i, arr) => ({
				id: name,
				options: {
					margin: i === arr.length - 1 ? "0px" : "0px 0px -90% 0px",
					amount: i === arr.length - 1 ? 0.9 : "any",
				} as Parameters<typeof inView>[2],
			})),
		[sections],
	);
	const activeSectionName = useScrollSpy(spyTargets);

	const onLinkClick = useCallback(
		(e: React.MouseEvent, name: string) => {
			updatePageInfo(name);

			scrollToElement(name);

			unFocus();
			e.preventDefault();
		},
		[updatePageInfo],
	);

	const transitionClass = useMemo(
		() =>
			[transitionStyles["interactive"], transitionStyles["clickable"]].join(
				" ",
			),
		[],
	);
	const roundedSquareTransitionClass = useMemo(
		() => [transitionClass, transitionStyles["rounded-square"]].join(" "),
		[transitionClass],
	);
	return (
		<div id={styles["links"]}>
			<div id={styles["logo-parent"]} className={roundedSquareTransitionClass}>
				<a
					id={styles["logo"]}
					className={
						activeSectionName === "home" ? styles["selected"] : undefined
					}
					onClick={(e) => {
						onLinkClick(e, "home");
					}}
					href="/"
				>
					<img src="/icon-small.png"></img>
					<h1>Altrup</h1>
				</a>
			</div>
			{sections.map((section) => (
				<div className={transitionClass} key={section.name}>
					<a
						className={
							activeSectionName === section.name
								? styles["selected"]
								: undefined
						}
						onClick={(e) => {
							onLinkClick(e, section.name);
						}}
						href={`/${section.name}`}
					>
						{section.title}
					</a>
				</div>
			))}
		</div>
	);
}

export default WideLinks;
