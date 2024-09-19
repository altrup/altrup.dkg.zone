import { Element } from "react-scroll";

import styles from './home-page.module.css';

function HomePage() {
	return (
		<Element id={styles["home-page"]} name='home'>
			<div className={styles["paragraph"]}>
				<h1>Hello, I'm Eric!</h1>
				<p>
					I'm currently a Mechatronics student at the University of Waterloo
				</p>
			</div>
		</Element>
	);
}

export default HomePage;
