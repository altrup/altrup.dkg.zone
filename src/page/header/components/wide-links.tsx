// component for links when we have a wide enough screen

import { useCallback, useMemo } from "react";
import { Link } from "react-scroll";

import styles from "./wide-links.module.css";
import transitionStyles from "../../transitions.module.css";
import unFocus from "../../../helper-functions/unFocus";

function WideLinks({ updatePageInfo }: { updatePageInfo: (pageName: string) => void }) {
	const onLinkClick = useCallback((name: string) => {
		updatePageInfo(name);

		// react-scroll stops propagation
		unFocus();
	}, [updatePageInfo]);

	const transitionClass = useMemo(() => [transitionStyles["interactive"], transitionStyles["clickable"]].join(' '), []);
	const roundedSquareTransitionClass = useMemo(() => [transitionClass, transitionStyles["rounded-square"]].join(' '), [transitionClass]);
	return (
		<div id={styles["links"]}>
			<div id={styles["logo-parent"]} className={roundedSquareTransitionClass}>
				<Link id={styles["logo"]} activeClass={styles["selected"]} smooth duration={500} offset={0} spy={true}
					containerId="main-page" onClick={() => { onLinkClick("home"); }} href="/" to="home">
					<img src="/icon-small.png"></img>
					<h1>Altrup</h1>
				</Link>
			</div>
			{
				__SECTIONS__.map(section => (
					<div className={transitionClass} key={section.name}>
						<Link activeClass={styles["selected"]} smooth duration={500} offset={section.name == "home" ? 0 : 5} spy={true}
							containerId="main-page" onClick={() => { onLinkClick(section.name); }} href={`/${section.name}`} to={section.name}>
							{section.title}
						</Link>
					</div>
				))
			}
			<div className={transitionClass}>
				<Link activeClass={styles["selected"]} smooth duration={500} offset={5} spy={true}
					containerId="main-page" onClick={() => { onLinkClick("contacts"); }} href="/contacts" to="contacts">
					Contacts
				</Link>
			</div>
		</div>
	);
}

export default WideLinks;