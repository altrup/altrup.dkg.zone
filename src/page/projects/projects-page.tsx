import { Element } from 'react-scroll';

import styles from './projects-page.module.css';

function ProjectsPage() {
	return (
		<Element id={styles["projects-page"]} name="projects">
			<h1>Projects</h1>
		</Element>
	);
}

export default ProjectsPage;