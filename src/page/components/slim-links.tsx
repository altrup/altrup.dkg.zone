// component for links when we need to save some space
import { useContext, useReducer } from "react";

import { Button } from "react-scroll";

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
				<Button to="home" id={styles["logo"]} activeClass={styles["selected"]} onClick={() => { updatePageInfo("home"); unFocus(); }}
				containerId="main-page" spy={true} smooth={true} duration={500}>
					<img src="/icon.png"></img>
					<h1>Altrup</h1>
				</Button>
				<div id={styles["hidden-links"]} className={showLinks? styles["showing"]: undefined}>
					<Button to="projects" activeClass={styles["selected"]} onClick={() => { updatePageInfo("projects"); unFocus(); }}
					containerId="main-page" spy={true} smooth={true} duration={500}>
						Projects
					</Button>
					<Button to="contacts" activeClass={styles["selected"]} onClick={() => { updatePageInfo("contacts"); unFocus(); }}
					containerId="main-page" spy={true} smooth={true} offset={50}>
						Contacts
					</Button>
				</div>
			</div>

			<button id={styles["toggle-show-links-button"]} className={showLinks? styles["showing"]: undefined} onClick={toggleShowLinks}>
				<img src={arrow} id={styles["arrow-img"]} className={theme === "dark"? styles["inverted"]: undefined} draggable="false" />
			</button>
		</div>
	);
}

export default SlimLinks;