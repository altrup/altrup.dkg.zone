"use client";

import styles from "./home-page.module.css";
import transitionStyles from "../transitions.module.css";

function HomePage() {
	return (
		<div id="home" className={styles["home-page"]}>
			<div className={styles["text-div"]}>
				<div className={styles["paragraph"]}>
					<p className={transitionStyles["interactive"]}>
						{
							"Hello! I'm Eric, a Mechatronics student at the University of Waterloo."
						}
					</p>
				</div>
			</div>
		</div>
	);
}

export default HomePage;
