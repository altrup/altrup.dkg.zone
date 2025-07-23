// NOTE: also contains logic for scrolling

import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { scroller, scrollSpy } from "react-scroll";

import ThemeChanger from "./components/theme-changer";
import WideLinks from "./components/wide-links";
import SlimLinks from "./components/slim-links";
import { ThemeContext } from "../root";

import githubIcon from "/icons/github.svg";

import styles from "./header.module.css";
import transitionStyles from "../transitions.module.css";

import setUrl from "../../helper-functions/set-url";
import { getPageUrl, getPageName } from "../../helper-functions/page-info";

function Header() {
	// import context
	const { theme } = useContext(ThemeContext);

	// updates title, url, and corresponding history entry
	const updatePageInfo = useCallback((pageName: string) => {
		setTimeout(() => {
			const pageUrl = getPageUrl(pageName);

			if (pageUrl) setUrl(pageUrl);
		});
	}, []);

	// detect page width to see if we should adjust header
	const [useSlimLinks, setUseSlimLinks] = useState(true);
	useEffect(() => {
		const resizeListener = () => {
			setUseSlimLinks(window.matchMedia("(max-width: 560px)").matches);
		};
		window.addEventListener('resize', resizeListener);

		// also call resize on load
		resizeListener();

		// remove listener on page rerender
		return () => { window.removeEventListener('resize', resizeListener); };
	}, []);

	// scroll to page based on url (only runs once)
	useEffect(() => {
		const pageUrl = window.location.pathname;
		if (pageUrl === "/") return; // don't scroll if we are on home page
		const pageName = getPageName(pageUrl);
		if (!pageName) { // if page doesn't exist, set url to default
			updatePageInfo("home");
			return;
		}

		// update page info, then scroll to page
		updatePageInfo(pageName);
		scroller.scrollTo(pageName, {
			containerId: 'main-page',
			smooth: true,
			duration: 500,
			offset: pageName == "home" ? 0 : 5, // Scroll extra to fix spy not correctly updating on mobile chrome
		});
	}, [updatePageInfo]);
	// force scroll-spy to update
	useEffect(() => {
		scrollSpy.update();
	}, []);

	const transitionClass = useMemo(() => [transitionStyles["interactive"], transitionStyles["clickable"], transitionStyles["rounded-square"]].join(' '), []);
	return (
		<div id={styles["header"]}>
			{
				useSlimLinks ?
					<SlimLinks updatePageInfo={updatePageInfo} />
					:
					<WideLinks updatePageInfo={updatePageInfo} />
			}
			<div id={styles["right-side"]}>
				<ThemeChanger />
				<a href="https://github.com/altrup" target="_blank" rel="noreferrer" className={[styles["link-icon-parent"], transitionClass].join(" ")}>
					<img src={githubIcon} alt="Github" className={[styles["link-icon"], theme === "dark" ? styles["inverted"] : undefined].join(' ')} draggable="false"></img>
				</a>
			</div>
		</div>
	);
}

export default Header;
