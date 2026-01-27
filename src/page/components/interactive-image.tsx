import { CSSProperties, useCallback, useContext, useState } from "react";

import { ImageInfo } from "./selected-image";
import { SelectedImageContext, ThemeContext } from "../root";

import LazyLoad from "./lazy-load";
import ImagePlaceholder from "./image-placeholder";

import transitionStyles from "../transitions.module.css";
import styles from "./interactive-image.module.css";

function InteractiveImage({
  image,
  scrollContainer,
  customClass,
  customStyle,
}: {
  image: ImageInfo;
  scrollContainer?: Element;
  customClass?: string;
  customStyle?: CSSProperties;
}) {
  const { theme } = useContext(ThemeContext);
  const { setShowImage, setSelectedImage } = useContext(SelectedImageContext);

  const onImageClick = useCallback(
    (showImage: boolean) => {
      setShowImage(showImage);
    },
    [setShowImage],
  );

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
        <button
          onClick={() => {
            setSelectedImage(image);
            onImageClick(true);
          }}
        >
          <LazyLoad
            placeholder={<ImagePlaceholder image={image} />}
            scrollContainers={[scrollContainer, "#main-page"]}
            offset={300}
          >
            <div className={styles["image-loading-position"]}>
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
                }}
                className={[
                  styles["image"],
                  !imageLoaded ? styles["hidden"] : undefined,
                  image.dropShadowWithTheme &&
                  (image.dropShadowWithTheme === "both" ||
                    image.dropShadowWithTheme === theme)
                    ? styles["drop-shadow"]
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
