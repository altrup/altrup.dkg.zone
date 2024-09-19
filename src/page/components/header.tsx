// NOTE: also contains logic for scrolling

import { useCallback, useContext, useEffect } from "react";
import { Link, scroller, scrollSpy } from "react-scroll";

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
			offset: pageName === 'contacts'? 50: 0
		});

	}, []);
	// force scroll-spy to update
	useEffect(() => {
		scrollSpy.update();
	}, []);

	// updates title, url, and corresponding history entry
	const updatePageInfo = useCallback((pageName: string) => {
		setTimeout(() => {
			const pageTitle = getPageTitle(pageName);
			const pageUrl = getPageUrl(pageName);
			
			if (pageTitle) setTitle(pageTitle);
			if (pageUrl) setUrl(pageUrl);
		});
	}, []);

	return (
		<div id={styles["header"]}>
			<div id={styles["links"]}>
				<Link to="home" id={styles["logo"]} activeClass={styles["selected"]} onClick={() => updatePageInfo("home")}
				containerId="main-page" spy={true} smooth={true} duration={500}>
					<img src="/icon.png"></img>
					<h1>Altrup</h1>
				</Link>
				<Link to="projects" activeClass={styles["selected"]} onClick={() => updatePageInfo("projects")}
				containerId="main-page" spy={true} smooth={true} duration={500}>
					Projects
				</Link>
				<Link to="contacts" activeClass={styles["selected"]} onClick={() => updatePageInfo("contacts")}
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
