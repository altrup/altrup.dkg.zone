import { Element } from 'react-scroll';

import styles from './projects-page.module.css';
import transitionStyles from '../transitions.module.css';

import Project from './components/project';
import ImageScroller, { isImageList } from './components/image-scroller';

import projects from "./projects";

function ProjectsPage() {
	return (
		<Element id={styles["projects-page"]} name="projects">
			<div id={styles["projects-page-child"]} className={transitionStyles["interactive"]}>
				<h1 id={styles["projects-label"]} className={transitionStyles["interactive"]}>Projects</h1>
				<p id={styles["projects-description"]} className={transitionStyles["interactive"]}>Some projects and things I'm interested in</p>

				{
					projects.map((section, index) => (
						<div key={index} className={[styles["project-type-div"], transitionStyles["interactive"]].join(' ')}>
							<h2 className={[styles["project-type-label"], transitionStyles["interactive"]].join(' ')}>{section.title}</h2>
							{"description" in section && section.description?
								<p className={[styles["project-type-description"], transitionStyles["interactive"]].join(' ')}>{section.description}</p>
							: undefined}
							{"projects" in section && Object.prototype.toString.call(section.projects) === '[object Array]' && section.projects.length > 0?
								<div className={styles["projects-div"]}>
								{
									section.projects.map((project, index) => (
											<Project key={index} name={project.name} description={project.description} 
												imageScroller={"imageScroller" in project && isImageList(project.imageScroller)? project.imageScroller: undefined}
												image={"image" in project? project.image: undefined} 
												links={"links" in project? project.links: undefined} />
									))
								}
								</div>
							: undefined}
							{"imageScroller" in section && isImageList(section.imageScroller)?
								<ImageScroller height={section.imageScroller.height} images={section.imageScroller.images} arrowNavigation />
							: undefined}
						</div>
					))
				}
			</div>
		</Element>
	);
}

export default ProjectsPage;