// Component for showing projects
import { useMemo } from "react";

import styles from "./project.module.css";
import transitionStyles from '../../transitions.module.css';

function Project({name, description, demoLink, codeLink}: {name: string, description: string, demoLink?: string, codeLink: string}) {
	const clickableInteractiveClass = useMemo(() => [transitionStyles["interactive"], transitionStyles["clickable"]].join(' '), [transitionStyles]);
	return (
		<div className={styles["project"]}>
			<div className={transitionStyles["interactive"]}>
				<div className={styles["label"]}>
					<h2 className={[transitionStyles["interactive"], styles["title"]].join(' ')}>{name}</h2>
					<div className={styles["links"]}>
						{demoLink?
							<a className={clickableInteractiveClass} href={demoLink} target="_blank">Demo</a>
						: undefined}
						<a className={clickableInteractiveClass} href={codeLink} target="_blank">Code</a>
					</div>
				</div>
				<p className={[styles["description"], transitionStyles["interactive"]].join(' ')}>{description}</p>
			</div>
		</div>
	)
}

export default Project;