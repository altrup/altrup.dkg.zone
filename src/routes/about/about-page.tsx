import { useEffect } from "react";

import setTitle from "../../helper-functions/setTitle";

function AboutPage() {
	useEffect(() => setTitle('About - Altrup'));
	
	return (
		<div>
			<h1>About</h1>
		</div>
	);
}

export default AboutPage;