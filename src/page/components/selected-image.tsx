import { useContext, useEffect, useMemo, useRef, useState } from "react";

import { SelectedImageContext } from "../root";

import { isActiveElementSelectedWithTab } from "../../helper-functions/unFocus";

import transitionStyles from "../transitions.module.css";
import styles from "./selected-image.module.css";
import ImagePlaceholder from "./image-placeholder";

type ImageInfo = {preview: string, full: string, alt: string, aspectRatio: number, height: number};

function SelectedImage({ showImage, image }: { showImage: boolean, image?: ImageInfo }) {
	const {setShowImage} = useContext(SelectedImageContext);
	const selectedImageButton = useRef<HTMLButtonElement>(null);
	// actual element in the page that was selected
	const oldActiveElement = useRef<Element>();

	// focus on the image when it's selected
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

	const [imageLoaded, setImageLoaded] = useState(false);
	const oldImage = useRef(image);
	useEffect(() => {
		if (oldImage.current?.full !== image?.full) {
			// new src detected
			setImageLoaded(false);
		}

		oldImage.current = image;
	}, [image]);

	const imageSizeStyle = useMemo(() => {
		if (!image) return undefined;
		// calculate image size based on aspect ratio and max-width of 90vw and max-height of 80vh
		const maxWidth = 0.90 * (window.innerWidth || document.documentElement.clientWidth);
		const maxHeight = 0.80 * (window.innerHeight || document.documentElement.clientHeight);
		const height = Math.min(maxHeight, maxWidth / image.aspectRatio);
		return {
			aspectRatio: image.aspectRatio,
			height: height + 'px'
		};
	}, [image]);

	return (
		<div id={styles["selected-image-background"]} className={!showImage? styles["hidden"]: ""}
			onClick={() => setShowImage(false)}>
			<div id={styles["selected-image-content"]}>
				<div id={styles["selected-image-parent"]} className={transitionStyles["interactive"]}>
					<button ref={selectedImageButton}>
						<div id={styles["selected-image-loading-position"]}>
							{image?
								<ImagePlaceholder image={image} customClass={[styles["placeholder"], imageLoaded? styles["hidden"]: undefined].join(' ')} 
									customHeightStyle={imageSizeStyle?.height} customFontText={"Loading ..."} />
							: undefined}
							<img id={styles["selected-image"]} className={!imageLoaded? styles["loading"]: undefined} src={image?.full} alt={image?.alt} style={imageSizeStyle}
								onLoad={() => setImageLoaded(true)} onError={() => setImageLoaded(false)} />
						</div>
					</button>
				</div>

				<p id={styles["selected-image-description"]} className={transitionStyles["interactive"]}>{image?.alt}</p>
			</div>
		</div>
	);
}

export default SelectedImage;
export type { ImageInfo };