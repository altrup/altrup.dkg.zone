import { useContext, useEffect, useRef, useState } from "react";

import { SelectedImageContext } from "../root";

import { isActiveElementSelectedWithTab } from "../../helper-functions/unFocus";

import LoadingIcon from "./loading-icon";

import transitionStyles from "../transitions.module.css";
import styles from "./selected-image.module.css";

type ImageInfo = {preview: string, full: string, alt: string, height: number};

function SelectedImage({ showImage, image }: { showImage: boolean, image?: ImageInfo }) {
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

	const [imageLoading, setImageLoading] = useState(false);
	const oldImage = useRef(image);
	useEffect(() => {
		if (oldImage.current?.full !== image?.full) {
			// new src detected
			setImageLoading(true);
		}

		oldImage.current = image;
	}, [image]);


	return (
		<div id={styles["selected-image-background"]} className={!showImage? styles["hidden"]: ""}
			onClick={() => setShowImage(false)}>
			<div id={styles["selected-image-content"]}>
				<div id={styles["selected-image-loading-position"]}>
					<p className={transitionStyles["interactive"]} id={styles["loading"]}>Loading image</p>

					<div id={styles["selected-image-parent"]} className={[imageLoading? styles["loading"]: undefined, transitionStyles["interactive"]].join(' ')}>
						<button ref={selectedImageButton}>
							<img id={styles["selected-image"]} src={image?.full} alt={image?.alt} 
								onLoad={() => setImageLoading(false)} onError={() => setImageLoading(false)} />
						</button>
					</div>
				</div>

				<p id={styles["selected-image-description"]} className={transitionStyles["interactive"]}>{image?.alt}</p>
			</div>
		</div>
	);
}

export default SelectedImage;
export type { ImageInfo };