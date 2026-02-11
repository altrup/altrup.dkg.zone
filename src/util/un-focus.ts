// make typescript happy
declare const document: Document;

const isActiveElementSelectedWithTab = () => {
	if (typeof document === "undefined") return; // do nothing

	return (
		document.activeElement instanceof HTMLElement &&
		document.activeElement.matches("*:focus-visible")
	);
};

// unfocuses active element if it wasn't selected using tab key
const unFocus = () => {
	if (typeof document === "undefined") return; // do nothing

	// if element was not selected with tab key
	if (
		document.activeElement instanceof HTMLElement &&
		!isActiveElementSelectedWithTab()
	)
		document.activeElement.blur();
};

export default unFocus;
export { isActiveElementSelectedWithTab };
