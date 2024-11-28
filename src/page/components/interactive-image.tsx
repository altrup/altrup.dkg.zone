import { useCallback, useContext } from "react";

import { ImageInfo } from "./selected-image";
import { SelectedImageContext } from "../root";

import LazyLoad from "./lazy-load";
import InteractiveImagePlaceholder from "./interactive-image-placeholder";

import transitionStyles from "../transitions.module.css";
import styles from "./interactive-image.module.css";

function InteractiveImage({ image, scrollContainer, customStyle }: { image: ImageInfo, scrollContainer?: Element, customStyle?: string }) {
	const { setShowImage, setSelectedImage } = useContext(SelectedImageContext);

	const onImageClick = useCallback((showImage: boolean) => {
		setShowImage(showImage);
	}, []);

	return (
		<div className={[styles["image-parent"], transitionStyles["interactive"], transitionStyles["clickable"], transitionStyles["rounded-square"], customStyle].join(' ')}>
			<LazyLoad placeholder={<InteractiveImagePlaceholder image={image} />} scrollContainers={[scrollContainer, "#main-page"]} offset={300}>
				<button onClick={() => {setSelectedImage(image); onImageClick(true);}} onMouseOver={() => setSelectedImage(image)} onFocus={() => setSelectedImage(image)}>
					<img className={styles["image"]} style={{width: image.aspectRatio * image.height, height: image.height}}
						src={image.preview} alt={image.alt} />
				</button>
			</LazyLoad>
		</div>
	);
}

export default InteractiveImage;