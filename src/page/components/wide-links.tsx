// component for links when we have a wide enough screen

import { Link } from "react-scroll";

import styles from "./wide-links.module.css";
import transitionStyles from "../transitions.module.css";

import unFocus from "../../helper-functions/unFocus";

function WideLinks({updatePageInfo} : {updatePageInfo: (pageName: string) => void}) {
	return (
		<div id={styles["links"]}>
			<div id={styles["logo-parent"]} className={[transitionStyles["interactive"], transitionStyles["interactive-rounded-square"]].join(' ')}>
				<Link href="/" to="home" id={styles["logo"]} activeClass={styles["selected"]} onClick={() => { updatePageInfo("home"); unFocus(); }}
				containerId="main-page" spy={true} smooth={true} duration={500} offset={-100}>
					<img src="/icon.png"></img>
					<h1>Altrup</h1>
				</Link>
			</div>
			<div className={transitionStyles["interactive"]}>
				<Link href="/projects" to="projects" activeClass={styles["selected"]} onClick={() => { updatePageInfo("projects"); unFocus(); }}
				containerId="main-page" spy={true} smooth={true} duration={500} offset={-100}>
					Projects
				</Link>
			</div>
			<div className={transitionStyles["interactive"]}>
				<Link href="/contacts" to="contacts" activeClass={styles["selected"]} onClick={() => { updatePageInfo("contacts"); unFocus(); }}
				containerId="main-page" spy={true} smooth={true} duration={500} offset={-100}>
					Contacts
				</Link>
			</div>
		</div>
	);
}

export default WideLinks;