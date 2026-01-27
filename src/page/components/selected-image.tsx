import { useContext, useEffect, useMemo, useRef, useState } from "react";

import { SelectedImageContext } from "../root";

import { isActiveElementSelectedWithTab } from "../../helper-functions/unFocus";
import { ImageInfo } from "../../helper-functions/getSections";

import transitionStyles from "../transitions.module.css";
import styles from "./selected-image.module.css";
import ImagePlaceholder from "./image-placeholder";

function SelectedImage({
  showImage,
  image,
}: {
  showImage: boolean;
  image?: ImageInfo;
}) {
  const { setShowImage } = useContext(SelectedImageContext);
  const selectedImageButton = useRef<HTMLButtonElement>(null);
  // actual element in the page that was selected
  const oldActiveElement = useRef<Element>();

  // focus on the image when it's selected
  useEffect(() => {
    // for some reason doesn't work unless focus is delayed
    if (
      showImage &&
      isActiveElementSelectedWithTab() &&
      selectedImageButton.current instanceof HTMLElement
    ) {
      oldActiveElement.current = document.activeElement ?? undefined;
      setTimeout(() => selectedImageButton.current?.focus(), 50); // 200 is the time it takes to transition in
    }
    if (
      !showImage &&
      isActiveElementSelectedWithTab() &&
      document.activeElement === selectedImageButton.current
    ) {
      const tempOldActiveElement = oldActiveElement.current;
      oldActiveElement.current = undefined;
      if (tempOldActiveElement && tempOldActiveElement instanceof HTMLElement)
        setTimeout(() => {
          tempOldActiveElement.focus();
        }, 50); // 200 is the time it takes to transition in
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

  const [maxWidth, setMaxWidth] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  // add listener for window resize
  useEffect(() => {
    const resizeListener = () => {
      // maxWidth is 90vw and maxHeight is 80vh
      setMaxWidth(
        0.9 * (window.innerWidth || document.documentElement.clientWidth),
      );
      setMaxHeight(
        0.8 * (window.innerHeight || document.documentElement.clientHeight),
      );
    };
    // call once on load
    resizeListener();

    window.addEventListener("resize", resizeListener);
    // remove listener on unmount
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  const imageWidth = useMemo(() => {
    if (!image) return undefined;
    // calculate image width based on aspect ratio, maxWidth and maxHeight
    return Math.min(maxWidth, maxHeight * image.aspectRatio);
  }, [image, maxWidth, maxHeight]);
  const imageSizeStyle = useMemo(() => {
    if (!image) return undefined;

    return {
      aspectRatio: image.aspectRatio,
      width: `${String(imageWidth)}px`,
    };
  }, [image, imageWidth]);

  return (
    <div
      id={styles["selected-image-background"]}
      className={!showImage ? styles["hidden"] : ""}
      onClick={() => {
        setShowImage(false);
      }}
    >
      <figure id={styles["selected-image-content"]}>
        <div
          id={styles["selected-image-parent"]}
          className={transitionStyles["interactive"]}
        >
          <button ref={selectedImageButton}>
            <div id={styles["selected-image-loading-position"]}>
              {image ? (
                <ImagePlaceholder
                  image={image}
                  customClass={[
                    styles["placeholder"],
                    imageLoaded ? styles["hidden"] : undefined,
                  ].join(" ")}
                  customWidthStyle={`${String(imageWidth)}px`}
                  customFontText={"Loading ..."}
                />
              ) : undefined}
              <img
                id={styles["selected-image"]}
                className={!imageLoaded ? styles["loading"] : undefined}
                src={image?.full}
                style={imageSizeStyle}
                onLoad={() => {
                  setImageLoaded(true);
                }}
                onError={() => {
                  setImageLoaded(false);
                }}
              />
            </div>
          </button>
        </div>

        <figcaption
          id={styles["selected-image-description"]}
          className={transitionStyles["interactive"]}
        >
          {image?.alt}
        </figcaption>
      </figure>
    </div>
  );
}

export default SelectedImage;
export type { ImageInfo };
