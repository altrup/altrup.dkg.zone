import { CSSProperties, useCallback, useContext } from "react";

import { ImageInfo } from "./selected-image";
import { SelectedImageContext } from "../root";

import LazyLoad from "./lazy-load";
import ImagePlaceholder from "./image-placeholder";

import transitionStyles from "../transitions.module.css";
import styles from "./interactive-image.module.css";

function InteractiveImage({ image, scrollContainer, customClass, customStyle }: {
	image: ImageInfo, scrollContainer?: Element, customClass?: string, customStyle?: CSSProperties
}) {
	const { setShowImage, setSelectedImage } = useContext(SelectedImageContext);

	const onImageClick = useCallback((showImage: boolean) => {
		setShowImage(showImage);
	}, []);

	return (
		<div className={[styles["static-image-parent"], customClass].join(' ')} style={customStyle}>
			<div className={[styles["image-parent"], transitionStyles["interactive"], transitionStyles["clickable"], transitionStyles["rounded-square"]].join(' ')}>
				<button onClick={() => {setSelectedImage(image); onImageClick(true);}} onMouseOver={() => setSelectedImage(image)} onFocus={() => setSelectedImage(image)}>
					<LazyLoad placeholder={<ImagePlaceholder image={image} />} scrollContainers={[scrollContainer, "#main-page"]} offset={300}>
						<img className={styles["image"]} style={{width: image.aspectRatio * image.height + 'px'}}
							src={image.preview} alt={image.alt} />
					</LazyLoad>
				</button>
			</div>
		</div>
	);
}

export default InteractiveImage;