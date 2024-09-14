import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./header";

import styles from "./root.module.css";
import transitionStyles from "./transition.module.css";

function Root({ outletOverride }: { outletOverride?: JSX.Element}) {
	const [transitionClass, setTransitionClass] = useState(styles[""]);
	useEffect(() => {
		setTransitionClass(transitionStyles["transition"]);
	});

	return (
		<div id={styles["root"]} className={transitionClass}>
			<Header />
			<div id={styles["main-page"]}>
				{ outletOverride?? <Outlet /> }
			</div>
		</div>
	);
}

export default Root;