import { Link } from "react-router-dom";
import styles from "./header.module.css";

function Header() {
	return (
		<div id={styles["header"]}>
			<div id={styles["links"]}>
				<Link to="/">Home</Link>
				<Link to="/projects">Projects</Link>
				<Link to="/about">About</Link>
			</div>
			<div id={styles["socials"]}>
				<a href="https://github.com/EricL521" target="_blank">Github</a> 
			</div>
		</div>
	);
}

export default Header;
