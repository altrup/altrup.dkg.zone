import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import ThemeChanger from "./theme-changer";
import { ThemeContext } from "../root";

import githubIcon from '../../icons/github.svg';

import styles from "./header.module.css";

function Header() {
	// import context
	const {theme} = useContext(ThemeContext);

	const location = useLocation();

	return (
		<div id={styles["header"]}>
			<div id={styles["links"]}>
				<Link to="/" className={location.pathname == '/'? styles["selected"]: undefined}>Home</Link>
				<Link to="/projects" className={location.pathname == '/projects'? styles["selected"]: undefined}>Projects</Link>
				<Link to="/about" className={location.pathname == '/about'? styles['selected']: undefined}>About</Link>
			</div>
			<ThemeChanger />
			<div id={styles["socials"]}>
				<a href="https://github.com/EricL521" target="_blank">
					<img src={githubIcon} className={theme === 'dark'? styles['inverted']: undefined}></img>
				</a> 
			</div>
		</div>
	);
}

export default Header;
