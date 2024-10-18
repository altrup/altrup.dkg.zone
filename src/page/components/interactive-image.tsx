import { useCallback, useContext } from "react";
import LazyLoad from "../../helper-functions/lazy-load";

import { ImageInfo } from "./selected-image";
import { SelectedImageContext } from "../root";

import transitionStyles from "../transitions.module.css";
import styles from "./interactive-image.module.css";

function InteractiveImage({ image, customStyle }: { image: ImageInfo, customStyle?: string }) {
	const { setShowImage, setSelectedImage } = useContext(SelectedImageContext);

	const onImageClick = useCallback((showImage: boolean) => {
		setShowImage(showImage);
	}, []);

	return (
		<div className={[styles["image-parent"], transitionStyles["interactive"], transitionStyles["clickable"], transitionStyles["rounded-square"], customStyle].join(' ')}>
			<LazyLoad height={image.height} scrollContainer="#main-page" offset={300} once>
				<button onClick={() => {setSelectedImage(image); onImageClick(true);}} onMouseOver={() => setSelectedImage(image)} onFocus={() => setSelectedImage(image)}>
					<img className={styles["image"]} style={{maxHeight: image.height}}
						src={image.preview} alt={image.alt} />
				</button>
			</LazyLoad>
		</div>
	);
}

export default InteractiveImage;