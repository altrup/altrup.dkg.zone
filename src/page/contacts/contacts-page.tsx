import { useMemo } from "react";
import { Element } from "react-scroll";

import styles from "./contacts-page.module.css";
import transitionStyles from '../transitions.module.css';

function ContactsPage() {
	const interactiveClass = useMemo(() => [styles["interactive"], transitionStyles["interactive"]].join(' '), [transitionStyles]);
	const clickableInteractiveClass = useMemo(() => [interactiveClass, transitionStyles["clickable"]].join(' '), [interactiveClass, transitionStyles]);
	return (
		<Element id={styles["contacts-page"]} name='contacts'>
			<div className={interactiveClass}>
				<div id={styles["contacts-page-title"]}>
					<h1 className={interactiveClass}>Contacts</h1>
					<p className={interactiveClass}>and Links</p>
				</div>
				<div id={styles["contacts"]} className={interactiveClass}>
					<a href="mailto:altrup@dkg.zone" className={clickableInteractiveClass}>altrup@dkg.zone</a>
					<a href="mailto:eric.liu4@uwaterloo.ca" className={clickableInteractiveClass}>eric.liu4@uwaterloo.ca</a>
					<a href="https://www.linkedin.com/in/ericl521/" target="_blank" className={clickableInteractiveClass}>LinkedIn</a>
					<a href="https://github.com/EricL521" target="_blank" className={clickableInteractiveClass}>GitHub</a>
				</div>
			</div>
		</Element>
	);
}

export default ContactsPage;