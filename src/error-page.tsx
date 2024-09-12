import { useRouteError } from "react-router-dom";

import styles from "./error-page.module.css";

function ErrorPage() {
	const error: any = useRouteError();
	console.error(error);

	return (
		<div id={styles["error-page"]}>
			<h1>{`Error Code: ${error.status}`}</h1>
			<p>{`Error: ${error.statusText || error.message}`}</p>
		</div>
	);
}

export default ErrorPage;