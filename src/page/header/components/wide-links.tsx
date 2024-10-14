// component for links when we have a wide enough screen

import { useCallback, useMemo } from "react";
import { Link, scroller } from "react-scroll";

import styles from "./wide-links.module.css";
import transitionStyles from "../../transitions.module.css";

import unFocus from "../../../helper-functions/unFocus";

function WideLinks({updatePageInfo} : {updatePageInfo: (pageName: string) => void}) {
	const onLinkClick = useCallback((name: string) => {
		updatePageInfo(name);
		unFocus();

		scroller.scrollTo(name, {
			containerId: "main-page",
			smooth: true,
			duration: 500,
			offset: name == "home"? 0: 5, // Scroll extra to fix spy not correctly updating on mobile chrome
		});
	}, []);
	
	const transitionClass = useMemo(() => [transitionStyles["interactive"], transitionStyles["clickable"]].join(' '), [transitionStyles]);
	const roundedSquareTransitionClass = useMemo(() => [transitionClass, transitionStyles["rounded-square"]].join(' '), [transitionClass, transitionStyles]);
	return (
		<div id={styles["links"]}>
			<div id={styles["logo-parent-parent"]} className={roundedSquareTransitionClass}>
				<button id={styles["logo-parent"]} onClick={() => onLinkClick("home")}>
					<Link href="/" to="home" id={styles["logo"]} activeClass={styles["selected"]} containerId="main-page" spy={true} tabIndex={-1}>
						<img src="/icon.png"></img>
						<h1>Altrup</h1>
					</Link>
				</button>
			</div>
			<div className={transitionClass}>
				<button onClick={() => onLinkClick("projects")}>
					<Link href="/projects" to="projects" activeClass={styles["selected"]} containerId="main-page" spy={true} tabIndex={-1}>
						Projects
					</Link>
				</button>
			</div>
			<div className={transitionClass}>
			<button onClick={() => onLinkClick("contacts")}>
				<Link href="/contacts" to="contacts" activeClass={styles["selected"]} containerId="main-page" spy={true} tabIndex={-1}>
					Contacts
				</Link>
			</button>
			</div>
		</div>
	);
}

export default WideLinks;