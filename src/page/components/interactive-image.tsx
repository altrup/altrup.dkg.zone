"use client";

import {
	CSSProperties,
	useCallback,
	useContext,
	useMemo,
	useReducer,
	useState,
} from "react";

import { ImageInfo } from "./selected-image";
import { SelectedImageContext, ThemeContext } from "../root";

import LazyLoad from "./lazy-load";
import ImagePlaceholder from "./image-placeholder";

import transitionStyles from "../transitions.module.css";
import styles from "./interactive-image.module.css";

function InteractiveImage({
	image,
	customClass,
	customStyle,
}: {
	image: ImageInfo;
	customClass?: string;
	customStyle?: CSSProperties;
}) {
	const { theme } = useContext(ThemeContext);
	const { setShowImage, setSelectedImage } = useContext(SelectedImageContext);

	const [rotation, rotate] = useReducer((currentRotation) => {
		return currentRotation + 90;
	}, 0);
	const rotationStyle = useMemo(
		() => ({
			rotate: `${String(rotation)}deg`,
		}),
		[rotation],
	);

	const dropShadow = useMemo(
		() =>
			image.dropShadowWithTheme &&
			(image.dropShadowWithTheme === "both" ||
				image.dropShadowWithTheme === theme),
		[image, theme],
	);
	const invert = useMemo(
		() =>
			image.invertWithTheme &&
			(image.invertWithTheme === "both" || image.invertWithTheme === theme),
		[image, theme],
	);
	const imageStyle = useMemo(
		() => ({
			filter: `${dropShadow ? "drop-shadow(0 0 0.2em var(--color-1))" : ""} ${invert ? "invert(1)" : ""}`,
		}),
		[dropShadow, invert],
	);

	const onImageClick = useCallback(() => {
		if (image.onClick === "rotate") {
			rotate();
		} else {
			setSelectedImage(image);
			setShowImage(true);
		}
	}, [image, setSelectedImage, setShowImage]);

	const [imageLoaded, setImageLoaded] = useState(false);

	return (
		<div
			className={[styles["static-image-parent"], customClass].join(" ")}
			style={customStyle}
		>
			<div
				className={[
					styles["image-parent"],
					transitionStyles["interactive"],
					transitionStyles["clickable"],
					transitionStyles["rounded-square"],
				].join(" ")}
			>
				<button onClick={onImageClick}>
					<LazyLoad
						placeholder={<ImagePlaceholder image={image} />}
						margin={"300px"}
					>
						<div
							className={styles["image-loading-position"]}
							style={rotationStyle}
						>
							<ImagePlaceholder
								image={image}
								customClass={[
									styles["placeholder"],
									imageLoaded ? styles["hidden"] : undefined,
								].join(" ")}
							/>
							<img
								style={{
									width: String(image.aspectRatio * image.height) + "px",
									...imageStyle,
								}}
								className={[
									styles["image"],
									!imageLoaded ? styles["hidden"] : undefined,
									image.borderRadius === false
										? styles["no-border-radius"]
										: undefined,
								].join(" ")}
								src={image.preview}
								alt={image.alt}
								onLoad={() => {
									setImageLoaded(true);
								}}
								onError={() => {
									setImageLoaded(false);
								}}
							/>
						</div>
					</LazyLoad>
				</button>
			</div>
		</div>
	);
}

export default InteractiveImage;
