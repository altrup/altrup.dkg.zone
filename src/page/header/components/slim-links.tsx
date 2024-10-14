// component for links when we need to save some space
import { useCallback, useContext, useMemo, useReducer } from "react";

import { Link, scroller } from "react-scroll";

import styles from "./slim-links.module.css";
import transitionStyles from "../../transitions.module.css";

import arrow from "/icons/arrow.svg";

import { ThemeContext } from "../../root";

function SlimLinks({updatePageInfo} : {updatePageInfo: (pageName: string) => void}) {
	// import context
	const {theme} = useContext(ThemeContext);
	
	const [showLinks, toggleShowLinks] = useReducer((state: boolean) => {
		return !state;
	}, false);

	const onLinkClick = useCallback((name: string) => {
		updatePageInfo(name);

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
		<div id={styles["links-parent"]}>
			<div id={styles["links"]}>
				<div id={styles["logo-parent"]} className={roundedSquareTransitionClass}>
					<button id={styles["logo"]} onClick={() => onLinkClick("home")}>
						<Link href="/" to="home" containerId="main-page" spy={true} tabIndex={-1}>
							<img src="/icon.png"></img>
						</Link>
					</button>
				</div>
				<div id={styles["hidden-links-parent"]}>
					<div id={styles["hidden-links"]} className={showLinks? styles["showing"]: undefined}>
						<div className={transitionClass}>
							<button onClick={() => onLinkClick("home")}>
								<Link href="/" to="home" activeClass={styles["selected"]} containerId="main-page" spy={true} tabIndex={-1}>
									Home
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
				</div>
			</div>

			<div className={roundedSquareTransitionClass}>
				<button id={styles["toggle-show-links-button"]} className={showLinks? styles["showing"]: undefined} onClick={toggleShowLinks}>
					<img src={arrow} id={styles["arrow-img"]} className={theme === "dark"? styles["inverted"]: undefined} draggable="false" />
				</button>
			</div>
		</div>
	);
}

export default SlimLinks;