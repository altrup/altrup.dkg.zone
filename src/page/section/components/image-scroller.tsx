import { useCallback, useContext, useMemo, useState } from "react";

import unFocus from "../../../helper-functions/unFocus";
import { ImageList } from "../../../helper-functions/getSections";

import InteractiveImage from "../../components/interactive-image";

import styles from "./image-scroller.module.css";
import transitionStyles from "../../transitions.module.css";

import arrow from "/icons/arrow.svg";

import { ThemeContext } from "../../root";

// Horizontal image scroller
function ImageScroller({ width, height, images, customStyle, arrowNavigation, centerFirstImage }: ImageList & {
	width?: number, customStyle?: CSSModuleClasses, arrowNavigation?: boolean
}) {
	// import context
	const { theme } = useContext(ThemeContext);

	// used in lazy load scroll detection
	const [imagesDiv, setImagesDiv] = useState<HTMLDivElement | null>(null);

	const scrollIndex = useCallback((direction: number) => {
		unFocus();
		// scroll to the next image
		if (imagesDiv) {
			const imagesDivElement = imagesDiv as HTMLElement;
			imagesDivElement.scrollBy({ left: direction * height, behavior: "smooth" });
			// trigger lazy load
			imagesDivElement.dispatchEvent(new Event("scroll"));
		}
	}, [height, imagesDiv]);

	const widthStyle = useMemo(() => width ? { width: `${String(width)}px` } : undefined, [width]);
	const getClassStyle = useCallback((className: string) => {
		return (customStyle && customStyle[className]) ?? styles[className];
	}, [customStyle]);

	const transitionClass = useMemo(() => [transitionStyles["interactive"], transitionStyles["clickable"]].join(' '), []);
	const roundedSquareTransitionClass = useMemo(() => [transitionClass, transitionStyles["rounded-square"]].join(' '), [transitionClass]);
	return (
		<div className={getClassStyle("images-div-parent")}>
			{arrowNavigation ?
				<div className={getClassStyle("arrow-navigation-div")}>
					<div className={roundedSquareTransitionClass}>
						<button className={[getClassStyle("arrow-img-button"), getClassStyle("left-button")].join(' ')} onClick={() => { scrollIndex(-1); }}>
							<img src={arrow} className={[getClassStyle("arrow-img"), theme === "dark" ? getClassStyle("inverted") : undefined].join(' ')} draggable="false" />
						</button>
					</div>
					<div className={roundedSquareTransitionClass}>
						<button className={[getClassStyle("arrow-img-button"), getClassStyle("right-button")].join(' ')} onClick={() => { scrollIndex(1); }}>
							<img src={arrow} className={[getClassStyle("arrow-img"), theme === "dark" ? getClassStyle("inverted") : undefined].join(' ')} draggable="false" />
						</button>
					</div>
				</div>
				: undefined}
			<div ref={setImagesDiv} tabIndex={-1} className={getClassStyle("images-div")} style={widthStyle}>
				{images.map((image, index) => (
					<InteractiveImage key={index} scrollContainer={imagesDiv ?? undefined} image={{ ...image, height }} customStyle={index == 0 && centerFirstImage && width ? {
						marginLeft: String(width - (image.aspectRatio * height)) + "px",
					} : undefined}
						customClass={[index == 0 ? styles["first-image"] : index == images.length - 1 ? styles["last-image"] : undefined, getClassStyle("interactive-image")].join(' ')} />
				))}
			</div>
			<div className={getClassStyle("images-overlay-div")} />
		</div>
	);
}

export default ImageScroller;