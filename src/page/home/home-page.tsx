import { useMemo } from "react";
import { Element } from "react-scroll";

import styles from './home-page.module.css';
import transitionStyles from '../transitions.module.css';

function HomePage() {
	const interactiveStyle = useMemo(() => [styles["interactive"], transitionStyles["interactive"]].join(' '), []);

	return (
		<Element id={styles["home-page"]} name='home'>
			<div className={styles["text-div"]}>
				<div className={styles["paragraph"]}>
					<p className={interactiveStyle}>Hello! I'm Eric, a Mechatronics student at the University of Waterloo.</p>
				</div>
			</div>
		</Element>
	);
}

export default HomePage;
