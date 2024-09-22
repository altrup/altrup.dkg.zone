// NOTE: also contains logic for scrolling

import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { scroller, scrollSpy } from "react-scroll";

import ThemeChanger from "./theme-changer";
import WideLinks from "./wide-links";
import SlimLinks from "./slim-links";
import { ThemeContext } from "../root";

import githubIcon from "/icons/github.svg";

import styles from "./header.module.css";
import transitionStyles from "../transitions.module.css";

import setUrl from "../../helper-functions/set-url";
import { getPageUrl, getPageName } from "../../helper-functions/page-info";

function Header() {
	// import context
	const {theme} = useContext(ThemeContext);

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
			return updatePageInfo("home");
		}

		// update page info, then scroll to page
		updatePageInfo(pageName);
		scroller.scrollTo(pageName, {
			containerId: 'main-page',
			smooth: true,
			duration: 500,
			offset: -125
		});
	}, []);
	// force scroll-spy to update
	useEffect(() => {
		scrollSpy.update();
	}, []);

	// updates title, url, and corresponding history entry
	const updatePageInfo = useCallback((pageName: string) => {
		setTimeout(() => {
			const pageUrl = getPageUrl(pageName);
			
			if (pageUrl) setUrl(pageUrl);
		});
	}, []);

	const transitionClass = useMemo(() => [transitionStyles["interactive"], transitionStyles["clickable"], transitionStyles["rounded-square"]].join(' '), [transitionStyles]);
	return (
		<div id={styles["header"]}>
			{
				useSlimLinks? 
					<SlimLinks updatePageInfo={updatePageInfo} />
				: 
					<WideLinks updatePageInfo={updatePageInfo} />
			}
			<div id={styles["right-side"]}>
				<ThemeChanger />
				<a href="https://github.com/EricL521" target="_blank" className={transitionClass}>
					<img src={githubIcon} className={[styles["link-icon"], theme === "dark"? styles["inverted"]: undefined].join(' ')} draggable="false"></img>
				</a> 
			</div>
		</div>
	);
}

export default Header;
