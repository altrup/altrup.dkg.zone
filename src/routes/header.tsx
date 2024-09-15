import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import ThemeChanger from "./components/theme-changer";
import { ThemeContext } from "./root";

import lightGithubIcon from '../icons/light-theme/github.svg';
import darkGithubIcon from '../icons/dark-theme/github.svg';

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
				<Link to="/about" className={location.pathname == '/about'? 'selected': undefined}>About</Link>
			</div>
			<ThemeChanger />
			<div id={styles["socials"]}>
				<a href="https://github.com/EricL521" target="_blank">
					<img src={theme === 'light'? lightGithubIcon: darkGithubIcon}></img>
				</a> 
			</div>
		</div>
	);
}

export default Header;
