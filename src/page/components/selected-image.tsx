import { useContext } from "react";

import { SelectedImageContext } from "../root";

import transitionStyles from "../transitions.module.css";
import styles from "./selected-image.module.css";

type ImageInfo = {src: string, alt: string, height: number};

function SelectedImage({ showImage, image }: { showImage: boolean, image: ImageInfo | undefined }) {
	const {setShowImage} = useContext(SelectedImageContext);

	return (
		<div id={styles["selected-image-background"]} className={!showImage? styles["hidden"]: ""}
			onClick={() => setShowImage(false)}>
			<div id={styles["selected-image-parent"]} className={transitionStyles["interactive"]}>
				<img id={styles["selected-image"]} src={image?.src} alt={image?.alt} />
			</div>
		</div>
	);
}

export default SelectedImage;
export type { ImageInfo };