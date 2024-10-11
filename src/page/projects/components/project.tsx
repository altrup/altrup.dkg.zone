// Component for showing projects
import { useMemo } from "react";

import styles from "./project.module.css";
import transitionStyles from '../../transitions.module.css';

function Project({name, description, demoLink, codeLink, image}: {
	name: string, description: string, demoLink?: string, codeLink?: string, 
	image?: {
		src: string, height: number, alt?: string
	}
}) {
	const clickableInteractiveClass = useMemo(() => [transitionStyles["interactive"], transitionStyles["clickable"]].join(' '), [transitionStyles]);
	return (
		<div className={styles["project"]}>
			<div className={[styles["project-child"], transitionStyles["interactive"]].join(' ')}>
				{image?
					<img className={styles["image"]} alt={image.alt} src={image.src} height={image.height} />
				: undefined}
				<div className={styles["text"]}>
					<div className={styles["label"]}>
						<h3 className={[transitionStyles["interactive"], styles["title"]].join(' ')}>{name}</h3>
						<div className={styles["links"]}>
							{demoLink?
								<a className={clickableInteractiveClass} href={demoLink} target="_blank">Demo</a>
							: undefined}
							{codeLink?
								<a className={clickableInteractiveClass} href={codeLink} target="_blank">Code</a>
							: undefined}
						</div>
					</div>
					<p className={[styles["description"], transitionStyles["interactive"]].join(' ')}>{description}</p>
				</div>
			</div>
		</div>
	)
}

export default Project;