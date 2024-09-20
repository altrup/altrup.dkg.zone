// component for links when we have a wide enough screen

import { Button } from "react-scroll";

import styles from "./wide-links.module.css";

import unFocus from "../../helper-functions/unFocus";

function WideLinks({updatePageInfo} : {updatePageInfo: (pageName: string) => void}) {
	return (
		<div id={styles["links"]}>
			<Button to="home" id={styles["logo"]} activeClass={styles["selected"]} onClick={() => { updatePageInfo("home"); unFocus(); }}
			containerId="main-page" spy={true} smooth={true} duration={500}>
				<img src="/icon.png"></img>
				<h1>Altrup</h1>
			</Button>
			<Button to="projects" activeClass={styles["selected"]} onClick={() => { updatePageInfo("projects"); unFocus(); }}
			containerId="main-page" spy={true} smooth={true} duration={500}>
				Projects
			</Button>
			<Button to="contacts" activeClass={styles["selected"]} onClick={() => { updatePageInfo("contacts"); unFocus(); }}
			containerId="main-page" spy={true} smooth={true} offset={50}>
				Contacts
			</Button>
		</div>
	);
}

export default WideLinks;