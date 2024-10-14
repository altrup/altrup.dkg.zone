import { useContext, useEffect, useRef } from "react";

import { SelectedImageContext } from "../root";

import { isActiveElementSelectedWithTab } from "../../helper-functions/unFocus";

import transitionStyles from "../transitions.module.css";
import styles from "./selected-image.module.css";

type ImageInfo = {src: string, alt: string, height: number};

function SelectedImage({ showImage, image }: { showImage: boolean, image: ImageInfo | undefined }) {
	const {setShowImage} = useContext(SelectedImageContext);
	const selectedImageButton = useRef<HTMLButtonElement>(null);
	// actual element in the page that was selected
	const oldActiveElement = useRef<Element>();

	useEffect(() => {
		// for some reason doesn't work unless focus is delayed
		if (showImage && isActiveElementSelectedWithTab() && selectedImageButton.current instanceof HTMLElement) {
			oldActiveElement.current = document.activeElement?? undefined;
			setTimeout(() => selectedImageButton.current?.focus(), 50); // 200 is the time it takes to transition in
		}
		if (!showImage && isActiveElementSelectedWithTab() && document.activeElement === selectedImageButton.current) {
			const tempOldActiveElement = oldActiveElement.current;
			oldActiveElement.current = undefined;
			if (tempOldActiveElement && tempOldActiveElement instanceof HTMLElement) 
				setTimeout(() => tempOldActiveElement.focus(), 50); // 200 is the time it takes to transition in
		}
	}, [showImage]);

	return (
		<div id={styles["selected-image-background"]} className={!showImage? styles["hidden"]: ""}
			onClick={() => setShowImage(false)}>
			<div id={styles["selected-image-parent"]} className={transitionStyles["interactive"]}>
				<button ref={selectedImageButton}>
					<img id={styles["selected-image"]} src={image?.src} alt={image?.alt} />
				</button>
			</div>
		</div>
	);
}

export default SelectedImage;
export type { ImageInfo };