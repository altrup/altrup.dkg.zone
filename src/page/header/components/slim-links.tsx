"use client";

// component for links when we need to save some space
import { useCallback, useContext, useMemo, useReducer } from "react";

import styles from "./slim-links.module.css";
import transitionStyles from "../../transitions.module.css";

const arrow = "/icons/arrow.svg";

import { ThemeContext, SectionsContext } from "../../root";
import unFocus from "../../../util/un-focus";
import { scrollToElement } from "../../../util/scroll-to-element";
import { useScrollSpy } from "../../../util/use-scroll-spy";
import { inView } from "motion/react";

function SlimLinks({
	updatePageInfo,
}: {
	updatePageInfo: (pageName: string) => void;
}) {
	// import context
	const { theme } = useContext(ThemeContext);
	const sections = useContext(SectionsContext);
	const spyTargets = useMemo(
		() =>
			["home", ...sections.map((s) => s.name)].map((name, i, arr) => ({
				id: name,
				options: {
					margin: i === arr.length - 1 ? "0px" : "0px 0px -100% 0px",
					amount: i === arr.length - 1 ? 0.9 : "any",
				} as Parameters<typeof inView>[2],
			})),
		[sections],
	);
	const activeSectionName = useScrollSpy(spyTargets);

	const [showLinks, toggleShowLinks] = useReducer((state: boolean) => {
		return !state;
	}, false);

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
		<div id={styles["links-parent"]}>
			<div id={styles["links"]}>
				<div
					id={styles["logo-parent"]}
					className={roundedSquareTransitionClass}
				>
					<a
						id={styles["logo"]}
						onClick={(e) => {
							onLinkClick(e, "home");
						}}
						href="/"
					>
						<img src="/icon-small.png"></img>
					</a>
				</div>
				<div id={styles["hidden-links-parent"]}>
					<div
						id={styles["hidden-links"]}
						className={showLinks ? styles["showing"] : undefined}
					>
						<div className={transitionClass}>
							<a
								className={
									activeSectionName === "home" ? styles["selected"] : undefined
								}
								onClick={(e) => {
									onLinkClick(e, "home");
								}}
								href="/"
							>
								Home
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
				</div>
			</div>

			<div className={roundedSquareTransitionClass}>
				<button
					id={styles["toggle-show-links-button"]}
					className={showLinks ? styles["showing"] : undefined}
					onClick={toggleShowLinks}
				>
					<img
						src={arrow}
						id={styles["arrow-img"]}
						className={theme === "dark" ? styles["inverted"] : undefined}
						draggable="false"
					/>
				</button>
			</div>
		</div>
	);
}

export default SlimLinks;
