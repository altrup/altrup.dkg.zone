import { useMemo } from "react";

import { ImageInfo } from "./selected-image";

import styles from "./image-placeholder.module.css";

function ImagePlaceholder({ image, customHeightStyle, customFontText, customClass }: { 
	image: ImageInfo, customHeightStyle?: string, customFontText?: string, customClass?: string 
}) {
	const sizeStyle = useMemo(() => ({
		aspectRatio: image.aspectRatio,
		height: customHeightStyle?? image.height + 'px'
	}), [image]);

	return (
		<div className={[styles["parent-div"], customClass].join(' ')} style={sizeStyle}>
			<p className={styles["image-alt"]}>{customFontText?? image.alt}</p>
		</div>
	);
}

export default ImagePlaceholder;