// NOTE: also contains logic for scrolling

import { useCallback, useContext, useEffect, useState } from "react";
import { Link, scroller } from "react-scroll";

import ThemeChanger from "./theme-changer";
import { ThemeContext } from "../root";

import githubIcon from "../../icons/github.svg";

import styles from "./header.module.css";

import setTitle from "../../helper-functions/set-title";
import setUrl from "../../helper-functions/set-url";
import { getPageUrl, getPageTitle, getPageName } from "../projects/page-info";

function Header() {
	// import context
	const {theme} = useContext(ThemeContext);

	// scroll to page based on url (only runs once)
	useEffect(() => {
		const pageUrl = window.location.pathname;
		if (pageUrl === "/") return setIgnorePageInfo(false); // don't scroll if we are on home page
		const pageName = getPageName(pageUrl);
		if (!pageName) { // if page doesn't exist, set url to default
			setIgnorePageInfo(false);
			return updatePageInfo("home", false);
		}

		scroller.scrollTo(pageName, {
			containerId: 'main-page',
			smooth: true,
			duration: 500
		});
		// once done scrolling, stop ignoring page info
		setTimeout(() => setIgnorePageInfo(false), 500);
	}, []);

	// used to ignore page info updates while doing initial scroll
	const [ignorePageInfo, setIgnorePageInfo] = useState(true);
	// updates title, url, and corresponding history entry
	const updatePageInfo = useCallback((pageName: string, ignorePageInfo: boolean) => {
		console.log(pageName);
		if (ignorePageInfo) return;

		const pageTitle = getPageTitle(pageName);
		const pageUrl = getPageUrl(pageName);
		
		if (pageTitle) setTitle(pageTitle);
		if (pageUrl) setUrl(pageUrl);
	}, []);

	return (
		<div id={styles["header"]}>
			<div id={styles["links"]}>
				<Link to="home" id={styles["logo"]} onSetActive={() => updatePageInfo("home", ignorePageInfo)}
				containerId="main-page" spy={true} smooth={true} duration={500}>
					<img src="/icon.png"></img>
					<h1>Altrup</h1>
				</Link>
				<Link to="projects" onSetActive={() => updatePageInfo("projects", ignorePageInfo)}
				containerId="main-page" spy={true} smooth={true} duration={500}>
					Projects
				</Link>
				<Link to="contacts" onSetActive={() => updatePageInfo("contacts", ignorePageInfo)}
				containerId="main-page" spy={true} smooth={true} offset={50}>
					Contacts
				</Link>
			</div>
			<div id={styles["right-side"]}>
				<ThemeChanger />
				<a href="https://github.com/EricL521" target="_blank">
					<img src={githubIcon} className={theme === "dark"? styles["inverted"]: undefined}></img>
				</a> 
			</div>
		</div>
	);
}

export default Header;
