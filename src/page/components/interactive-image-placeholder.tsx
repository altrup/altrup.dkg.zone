import { useMemo } from "react";

import { ImageInfo } from "./selected-image";

import styles from "./interactive-image-placeholder.module.css";

function InteractiveImagePlaceholder({ image }: { image: ImageInfo })  {
	const sizeStyle = useMemo(() => ({
		width: image.aspectRatio * image.height,
		height: image.height
	}), [image]);

	return (
		<div className={styles["parent-div"]} style={sizeStyle}>
			<p className={styles["image-alt"]}>{image.alt}</p>
		</div>
	);
}

export default InteractiveImagePlaceholder;