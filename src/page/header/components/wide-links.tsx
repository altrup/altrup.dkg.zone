// component for links when we have a wide enough screen

import { useCallback, useMemo } from "react";
import { Link, scroller } from "react-scroll";

import styles from "./wide-links.module.css";
import transitionStyles from "../../transitions.module.css";

function WideLinks({ updatePageInfo }: { updatePageInfo: (pageName: string) => void }) {
	const onLinkClick = useCallback((name: string) => {
		updatePageInfo(name);

		scroller.scrollTo(name, {
			containerId: "main-page",
			smooth: true,
			duration: 500,
			offset: name == "home" ? 0 : 5, // Scroll extra to fix spy not correctly updating on mobile chrome
		});
	}, [updatePageInfo]);

	const transitionClass = useMemo(() => [transitionStyles["interactive"], transitionStyles["clickable"]].join(' '), [transitionStyles]);
	const roundedSquareTransitionClass = useMemo(() => [transitionClass, transitionStyles["rounded-square"]].join(' '), [transitionClass, transitionStyles]);
	return (
		<div id={styles["links"]}>
			<div id={styles["logo-parent-parent"]} className={roundedSquareTransitionClass}>
				<button id={styles["logo-parent"]} onClick={() => { onLinkClick("home"); }}>
					<Link href="/" to="home" id={styles["logo"]} activeClass={styles["selected"]} containerId="main-page" spy={true} tabIndex={-1}>
						<img src="/icon-small.png"></img>
						<h1>Altrup</h1>
					</Link>
				</button>
			</div>
			{
				__SECTIONS__.map(section => (
					<div className={transitionClass} key={section.name}>
						<button onClick={() => { onLinkClick(section.name); }}>
							<Link href={`/${section.name}`} to={section.name} activeClass={styles["selected"]} containerId="main-page" spy={true} tabIndex={-1}>
								{section.title}
							</Link>
						</button>
					</div>
				))
			}
			<div className={transitionClass}>
				<button onClick={() => { onLinkClick("contacts"); }}>
					<Link href="/contacts" to="contacts" activeClass={styles["selected"]} containerId="main-page" spy={true} tabIndex={-1}>
						Contacts
					</Link>
				</button>
			</div>
		</div>
	);
}

export default WideLinks;