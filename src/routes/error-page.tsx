import { useRouteError } from "react-router-dom";

import styles from "./error-page.module.css";

function ErrorPage() {
	const error: any = useRouteError();
	console.error(error);

	return (
		<div id={styles["error-page"]}>
			<h1>{`${error.status}${error.statusText? ` - ${error.statusText}`: ''}`}</h1>
			<p>{error.data}</p>
		</div>
	);
}

export default ErrorPage;