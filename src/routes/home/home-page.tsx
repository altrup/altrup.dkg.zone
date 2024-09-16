import styles from './home-page.module.css';

function HomePage() {
	return (
		<div id={styles["home-page"]}>
			<div className={styles["paragraph"]}>
				<h1>Hello! You've made it to my website!</h1>
				<p>
					&#9;This website is all about me (Eric)! This page is temperary, but maybe take a look at the projects page until this one's done. 
					That's why I'm making this website ; ).
				</p>
			</div>
		</div>
	);
}

export default HomePage;
