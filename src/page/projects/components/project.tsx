// Component for showing projects
import { useMemo } from "react";

import { ImageInfo } from "../../components/selected-image";

import InteractiveImage from "../../components/interactive-image";

import styles from "./project.module.css";
import transitionStyles from '../../transitions.module.css';

function Project({name, description, links, image}: {
	name: string, description: string, links?: {text: string, href: string}[], 
	image?: ImageInfo
}) {
	const clickableInteractiveClass = useMemo(() => [transitionStyles["interactive"], transitionStyles["clickable"], transitionStyles["rounded-square"]].join(' '), [transitionStyles]);
	return (
		<div className={styles["project"]}>
			<div className={[styles["project-child"], transitionStyles["interactive"]].join(' ')}>
				{image?
					<InteractiveImage image={image} customStyle={styles["custom-image-margin"]} />
				: undefined}
				<div className={styles["text"]}>
					<div className={styles["label"]}>
						<h3 className={[transitionStyles["interactive"], styles["title"]].join(' ')}>{name}</h3>
						{links?
							<div className={styles["links"]}>
								{links.map((link, index) => (
									<a key={index} className={clickableInteractiveClass} href={link.href} target="_blank">{link.text}</a>
								))}
							</div>
						: undefined}
					</div>
					<p className={[styles["description"], transitionStyles["interactive"]].join(' ')}>{description}</p>
				</div>
			</div>
		</div>
	)
}

export default Project;