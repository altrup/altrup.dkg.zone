import { useCallback, useContext, useMemo, useRef } from "react";

import { ImageInfo } from "../../components/selected-image";
import unFocus from "../../../helper-functions/unFocus";

import InteractiveImage from "../../components/interactive-image";

import styles from "./image-scroller.module.css";
import transitionStyles from "../../transitions.module.css";

import arrow from "/icons/arrow.svg";

import { ThemeContext } from "../../root";

type ImageList = {
	height: number,
	images: (Omit<ImageInfo, "height">)[]
};
const isImageList = (props: any): props is ImageList => {
	const imageScrollerProps = props as ImageList;
	return typeof imageScrollerProps.height === "number" && Array.isArray(imageScrollerProps.images) && imageScrollerProps.images.every(image => 
		typeof image.preview === "string" && typeof image.full === "string" && typeof image.alt === "string" && typeof image.aspectRatio === "number");
};

// Horizontal image scroller
function ImageScroller({ width, height, images, customStyle, arrowNavigation }: ImageList & {
	width?: number, customStyle?: CSSModuleClasses, arrowNavigation?: boolean
}) {
	// import context
	const {theme} = useContext(ThemeContext);
	
	// used in lazy load scroll detection
	const imagesDiv = useRef(null);

	const scrollIndex = useCallback((direction: number) => {
		unFocus();
		// scroll to the next image
		if (imagesDiv.current) {
			const imagesDivElement = imagesDiv.current as HTMLElement;
			imagesDivElement.scrollBy({left: direction * height, behavior: "smooth"});
			// trigger lazy load
			imagesDivElement.dispatchEvent(new Event("scroll"));
		}
	}, []);

	const widthStyle = useMemo(() => width? {width: width + 'px'}: undefined, [width]);
	const getClassStyle = useCallback((className: string) => {
		return (customStyle && customStyle[className])?? styles[className];
	}, [theme, customStyle]);

	const transitionClass = useMemo(() => [transitionStyles["interactive"], transitionStyles["clickable"]].join(' '), [transitionStyles]);
	const roundedSquareTransitionClass = useMemo(() => [transitionClass, transitionStyles["rounded-square"]].join(' '), [transitionClass, transitionStyles]);
	return (
		<div className={getClassStyle("images-div-parent")}>
			{arrowNavigation? 
				<div className={getClassStyle("arrow-navigation-div")}>
					<div className={roundedSquareTransitionClass}>
						<button className={[getClassStyle("arrow-img-button"), getClassStyle("left-button")].join(' ')} onClick={() => scrollIndex(-1)}>
							<img src={arrow} className={[getClassStyle("arrow-img"), theme === "dark"? getClassStyle("inverted"): undefined].join(' ')} draggable="false" />
						</button>
					</div>
					<div className={roundedSquareTransitionClass}>
						<button className={[getClassStyle("arrow-img-button"), getClassStyle("right-button")].join(' ')} onClick={() => scrollIndex(1)}>
							<img src={arrow} className={[getClassStyle("arrow-img"), theme === "dark"? getClassStyle("inverted"): undefined].join(' ')} draggable="false" />
						</button>
					</div>
				</div>
			: undefined}
			<div ref={imagesDiv} tabIndex={-1} className={getClassStyle("images-div")} style={widthStyle}>
				{images.map((image, index) => (
					<InteractiveImage key={index} scrollContainer={imagesDiv.current?? undefined} image={{... image, height}} 
						customClass={[index == 0? styles["first-image"]: index == images.length - 1? styles["last-image"]: undefined, getClassStyle("interactive-image")].join(' ')} />
				))}
			</div>
			<div className={getClassStyle("images-overlay-div")} />
		</div>
	);
}

export default ImageScroller;
export type { ImageList };
export { isImageList };