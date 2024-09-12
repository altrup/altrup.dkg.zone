import { Outlet } from "react-router-dom";

import Header from "./header";

import styles from "./root.module.css";

function Root() {

	return (
		<div id={styles["root"]}>
			<Header />
			<div id={styles["main-page"]}>
				<Outlet />
			</div>
		</div>
	);
}

export default Root;
