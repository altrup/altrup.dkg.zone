"use client";

// component for links when we have a wide enough screen

import { useCallback, useContext, useMemo } from "react";
import { Link, scroller } from "react-scroll";

import styles from "./wide-links.module.css";
import transitionStyles from "../../transitions.module.css";
import unFocus from "../../../util/un-focus";

import { SectionsContext } from "../../root";

function WideLinks({
	updatePageInfo,
}: {
	updatePageInfo: (pageName: string) => void;
}) {
	const sections = useContext(SectionsContext);

	const onLinkClick = useCallback(
		(name: string) => {
			updatePageInfo(name);

			// NOTE: can't use offset in Link because it affects both spy and scroll
			scroller.scrollTo(name, {
				containerId: "main-page",
				smooth: true,
				duration: 500,
				offset: name == "home" ? 0 : 5, // Scroll extra to fix spy not correctly updating on mobile chrome
			});

			// react-scroll stops propagation
			unFocus();
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
				<Link
					id={styles["logo"]}
					activeClass={styles["selected"]}
					spy={true}
					containerId="main-page"
					onClick={() => {
						onLinkClick("home");
					}}
					href="/"
					to="home"
				>
					<img src="/icon-small.png"></img>
					<h1>Altrup</h1>
				</Link>
			</div>
			{sections.map((section) => (
				<div className={transitionClass} key={section.name}>
					<Link
						activeClass={styles["selected"]}
						spy={true}
						containerId="main-page"
						onClick={() => {
							onLinkClick(section.name);
						}}
						href={`/${section.name}`}
						to={section.name}
					>
						{section.title}
					</Link>
				</div>
			))}
			<div className={transitionClass}>
				<Link
					activeClass={styles["selected"]}
					spy={true}
					containerId="main-page"
					onClick={() => {
						onLinkClick("contacts");
					}}
					href="/contacts"
					to="contacts"
				>
					Contacts
				</Link>
			</div>
		</div>
	);
}

export default WideLinks;
