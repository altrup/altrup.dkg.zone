// component for links when we need to save some space
import { useContext, useReducer } from "react";

import { Link } from "react-scroll";

import styles from "./slim-links.module.css";
import transitionStyles from "../transitions.module.css";

import arrow from "../../icons/arrow.svg";

import unFocus from "../../helper-functions/unFocus";
import { ThemeContext } from "../root";

function SlimLinks({updatePageInfo} : {updatePageInfo: (pageName: string) => void}) {
	// import context
	const {theme} = useContext(ThemeContext);
	
	const [showLinks, toggleShowLinks] = useReducer((state: boolean) => {
		return !state;
	}, false);

	return (
		<div id={styles["links-parent"]}>
			<div id={styles["links"]}>
				<div id={styles["logo"]} className={[transitionStyles["interactive"], transitionStyles["interactive-rounded-square"]].join(' ')}>
					<Link href="/" to="home" onClick={() => { updatePageInfo("home"); unFocus(); }}
					containerId="main-page" spy={true} smooth={true} duration={500}>
						<img src="/icon.png"></img>
					</Link>
				</div>
				<div id={styles["hidden-links-parent"]}>
					<div id={styles["hidden-links"]} className={showLinks? styles["showing"]: undefined}>
						<div className={transitionStyles["interactive"]}>
							<Link href="/" to="home" activeClass={styles["selected"]} onClick={() => { updatePageInfo("home"); unFocus(); }}
							containerId="main-page" spy={true} smooth={true} duration={500} offset={-100}>
								Home
							</Link>
						</div>
						<div className={transitionStyles["interactive"]}>
							<Link href="projects" to="projects" activeClass={styles["selected"]} onClick={() => { updatePageInfo("projects"); unFocus(); }}
							containerId="main-page" spy={true} smooth={true} duration={500} offset={-100}>
								Projects
							</Link>
						</div>
						<div className={transitionStyles["interactive"]}>
							<Link href="contacts" to="contacts" activeClass={styles["selected"]} onClick={() => { updatePageInfo("contacts"); unFocus(); }}
							containerId="main-page" spy={true} smooth={true} duration={500} offset={-100}>
								Contacts
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className={[transitionStyles["interactive"], transitionStyles["interactive-rounded-square"]].join(' ')}>
				<button id={styles["toggle-show-links-button"]} className={showLinks? styles["showing"]: undefined} onClick={toggleShowLinks}>
					<img src={arrow} id={styles["arrow-img"]} className={theme === "dark"? styles["inverted"]: undefined} draggable="false" />
				</button>
			</div>
		</div>
	);
}

export default SlimLinks;