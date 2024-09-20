// component for links when we need to save some space
import { useContext, useReducer } from "react";

import { Link } from "react-scroll";

import styles from "./slim-links.module.css";

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
				<Link href="/" to="home" id={styles["logo"]} onClick={() => { updatePageInfo("home"); unFocus(); }}
				containerId="main-page" spy={true} smooth={true} duration={500}>
					<img src="/icon.png"></img>
				</Link>
				<div id={styles["hidden-links-parent"]}>
					<div id={styles["hidden-links"]} className={showLinks? styles["showing"]: undefined}>
						<Link href="/" to="home" activeClass={styles["selected"]} onClick={() => { updatePageInfo("home"); unFocus(); }}
						containerId="main-page" spy={true} smooth={true} duration={500}>
							Home
						</Link>
						<Link href="projects" to="projects" activeClass={styles["selected"]} onClick={() => { updatePageInfo("projects"); unFocus(); }}
						containerId="main-page" spy={true} smooth={true} duration={500}>
							Projects
						</Link>
						<Link href="contacts" to="contacts" activeClass={styles["selected"]} onClick={() => { updatePageInfo("contacts"); unFocus(); }}
						containerId="main-page" spy={true} smooth={true} duration={500}>
							Contacts
						</Link>
					</div>
				</div>
			</div>

			<button id={styles["toggle-show-links-button"]} className={showLinks? styles["showing"]: undefined} onClick={toggleShowLinks}>
				<img src={arrow} id={styles["arrow-img"]} className={theme === "dark"? styles["inverted"]: undefined} draggable="false" />
			</button>
		</div>
	);
}

export default SlimLinks;