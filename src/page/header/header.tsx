"use client";

// NOTE: also contains logic for scrolling

import { useCallback, useContext, useEffect, useMemo, useState } from "react";

import ThemeChanger from "./components/theme-changer";
import WideLinks from "./components/wide-links";
import SlimLinks from "./components/slim-links";
import { ThemeContext, PageInfoContext } from "../root";

const githubIcon = "/icons/github.svg";

import styles from "./header.module.css";
import transitionStyles from "../transitions.module.css";

import setUrl from "../../util/set-url";
import { scrollToElement } from "../../util/scroll-to-element";

function Header() {
	// import context
	const { theme } = useContext(ThemeContext);
	const { getPageUrl, getPageName } = useContext(PageInfoContext);

	// updates title, url, and corresponding history entry
	const updatePageInfo = useCallback(
		(pageName: string) => {
			setTimeout(() => {
				const pageUrl = getPageUrl(pageName);

				if (pageUrl) setUrl(pageUrl);
			});
		},
		[getPageUrl],
	);

	// detect page width to see if we should adjust header
	const [useSlimLinks, setUseSlimLinks] = useState(true);
	useEffect(() => {
		const resizeListener = () => {
			setUseSlimLinks(window.matchMedia("(max-width: 560px)").matches);
		};
		window.addEventListener("resize", resizeListener);

		// also call resize on load
		resizeListener();

		// remove listener on page rerender
		return () => {
			window.removeEventListener("resize", resizeListener);
		};
	}, []);

	// scroll to page based on url (only runs once)
	useEffect(() => {
		const pageUrl = window.location.pathname;
		if (pageUrl === "/") return; // don't scroll if we are on home page
		const pageName = getPageName(pageUrl);
		if (!pageName) {
			// if page doesn't exist, set url to default
			updatePageInfo("home");
			return;
		}

		// update page info, then scroll to page
		updatePageInfo(pageName);
		scrollToElement(pageName);
	}, [updatePageInfo, getPageName]);

	const transitionClass = useMemo(
		() =>
			[
				transitionStyles["interactive"],
				transitionStyles["clickable"],
				transitionStyles["rounded-square"],
			].join(" "),
		[],
	);
	return (
		<header id={styles["header"]}>
			{useSlimLinks ? (
				<SlimLinks updatePageInfo={updatePageInfo} />
			) : (
				<WideLinks updatePageInfo={updatePageInfo} />
			)}
			<div id={styles["right-side"]}>
				<ThemeChanger />
				<a
					href="https://github.com/altrup"
					target="_blank"
					rel="noreferrer"
					className={[styles["link-icon-parent"], transitionClass].join(" ")}
				>
					<img
						src={githubIcon}
						alt="Github"
						className={[
							styles["link-icon"],
							theme === "dark" ? styles["inverted"] : undefined,
						].join(" ")}
						draggable="false"
					></img>
				</a>
			</div>
		</header>
	);
}

export default Header;
