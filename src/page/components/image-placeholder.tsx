import { useMemo } from "react";

import { ImageInfo } from "./selected-image";

import styles from "./image-placeholder.module.css";

function ImagePlaceholder({ image, customHeightStyle, customFontSize, customFontText }: { 
	image: ImageInfo, customHeightStyle?: string, customFontSize?: string, customFontText?: string 
}) {
	const sizeStyle = useMemo(() => ({
		aspectRatio: image.aspectRatio,
		height: customHeightStyle?? image.height + 'px'
	}), [image]);

	return (
		<div className={[styles["parent-div"]].join(' ')} style={sizeStyle}>
			<p className={styles["image-alt"]} style={{fontSize: customFontSize}}>{customFontText?? image.alt}</p>
		</div>
	);
}

export default ImagePlaceholder;