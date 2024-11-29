import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import isOnScreen from "../../helper-functions/is-on-screen";

// scrollContainers is an array of elements or query strings that represent elements
function LazyLoad({ children, placeholder, visibilityOverride, offset, scrollContainers }: 
{ children: ReactNode, placeholder: ReactNode, visibilityOverride?: boolean, offset?: number[] | number, scrollContainers?: (Element | string | undefined)[] }) {
	const [visible, setVisible] = useState(false);
	const element = useRef(null);

	// check if element is on screen on load
	useMemo(() => {
		if (element.current) setVisible(isOnScreen(element.current, offset));
	}, [element.current]);
	// add event listener to check if element is on screen
	useEffect(() => {
		if (!scrollContainers || visible || visibilityOverride) return;

		const onScreenListener = () => {
			if (element.current) setVisible(isOnScreen(element.current, offset));
		};
		// add event listener to scroll containers
		for (const scrollContainer of scrollContainers) {
			const scrollContainerElement = typeof scrollContainer === "string"? document.querySelector(scrollContainer): scrollContainer;
			if (scrollContainerElement) {
				scrollContainerElement.addEventListener("scroll", onScreenListener);
			}
		}
		// also run on resize
		window.addEventListener("resize", onScreenListener);

		// remove event listener
		return () => {
			for (const scrollContainer of scrollContainers) {
				const scrollContainerElement = typeof scrollContainer === "string"? document.querySelector(scrollContainer): scrollContainer;
				if (scrollContainerElement) {
					scrollContainerElement.removeEventListener("scroll", onScreenListener);
				}
			}
			window.removeEventListener("resize", onScreenListener);
		}
	}, [element.current, scrollContainers, visible, visibilityOverride]);

	return (
		<div ref={element}>
		{
			typeof visibilityOverride != "undefined"? 
				visibilityOverride? children: placeholder
			: visible? children: placeholder 
		}
		</div>
	);
}

export default LazyLoad;