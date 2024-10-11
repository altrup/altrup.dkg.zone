import InteractiveImage from "./interactive-image";

import styles from "./image-scroller.module.css";

function ImageScroller({ height, images }: {height: number, images: {src: string, alt: string, customStyle?: string}[]}) {
	// const imagesDiv = useRef(null);

	return (
		<div className={styles["images-div-parent"]}>
			<div className={styles["images-div"]}>
				{images.map((image, index) => (
					<InteractiveImage key={index} customStyle={[index == 0? styles["first-image-margin"]: undefined, image.customStyle].join(' ')} image={{... image, height}}/>
				))}
			</div>
			<div className={styles["images-overlay-div"]} />
		</div>
	);
}

export default ImageScroller;