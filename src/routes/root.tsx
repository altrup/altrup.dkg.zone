import { Outlet } from "react-router-dom";

import Header from "./header";

import styles from "./root.module.css";

function Root({ outletOverride }: { outletOverride?: JSX.Element}) {

	return (
		<div id={styles["root"]}>
			<Header />
			<div id={styles["main-page"]}>
				{ outletOverride?? <Outlet /> }
			</div>
		</div>
	);
}

export default Root;
