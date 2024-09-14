import { Link, useLocation } from "react-router-dom";

import ThemeChanger from "./components/theme-changer";

import styles from "./header.module.css";


function Header() {
	const location = useLocation();

	return (
		<div id={styles["header"]}>
			<div id={styles["links"]}>
				<Link to="/" className={location.pathname == '/'? styles["selected"]: undefined}>Home</Link>
				<Link to="/projects" className={location.pathname == '/projects'? styles["selected"]: undefined}>Projects</Link>
				<Link to="/about" className={location.pathname == '/about'? 'selected': undefined}>About</Link>
			</div>
			<ThemeChanger />
			<div id={styles["socials"]}>
				<a href="https://github.com/EricL521" target="_blank">Github</a> 
			</div>
		</div>
	);
}

export default Header;
