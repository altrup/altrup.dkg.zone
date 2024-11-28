import { useRef } from "react";

import { ImageInfo } from "../../components/selected-image";

import InteractiveImage from "../../components/interactive-image";

import styles from "./image-scroller.module.css";

function ImageScroller({ height, images }: {height: number, images: (Omit<ImageInfo, "height"> & {customStyle?: string})[]}) {
	const imagesDiv = useRef(null);

	return (
		<div className={styles["images-div-parent"]}>
			<div ref={imagesDiv} className={styles["images-div"]}>
				{images.map((image, index) => (
					<InteractiveImage key={index} scrollContainer={imagesDiv.current?? undefined} customStyle={[index == 0? styles["first-image-margin"]: undefined, image.customStyle].join(' ')} image={{... image, height}}/>
				))}
			</div>
			<div className={styles["images-overlay-div"]} />
		</div>
	);
}

export default ImageScroller;