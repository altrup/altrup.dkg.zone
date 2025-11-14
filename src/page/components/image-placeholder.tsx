import { useMemo } from "react";

import { ImageInfo } from "./selected-image";

import styles from "./image-placeholder.module.css";

function ImagePlaceholder({ image, customWidthStyle, customFontText, customClass }: { 
	image: ImageInfo, customWidthStyle?: string, customFontText?: string, customClass?: string 
}) {
	const sizeStyle = useMemo(() => ({
		aspectRatio: image.aspectRatio,
		width: customWidthStyle ?? `${String(image.aspectRatio * image.height)}px`
	}), [image, customWidthStyle]);

	return (
		<div className={[styles["parent-div"], customClass].join(' ')} style={sizeStyle}>
			<div className={styles["scroll-div"]}>
				<p className={styles["image-alt"]}>{customFontText?? image.alt}</p>
			</div>
		</div>
	);
}

export default ImagePlaceholder;