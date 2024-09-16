import { useEffect } from "react";
import setTitle from "../../helper-functions/setTitle";


function ProjectsPage() {
	useEffect(() => setTitle('Projects - Altrup'));

	return (
		<div>
			<h1>Projects</h1>
		</div>
	);
}

export default ProjectsPage;