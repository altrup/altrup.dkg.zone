// make typescript happy
declare const document: Document;

// unfocuses active element if it wasn't selected using tab key
export const unFocus = () => {
	if (typeof document === 'undefined') return; // do nothing

	// if element was not selected with tab key
	if (document.activeElement instanceof HTMLElement && !document.activeElement.matches("*:focus-visible"))
		document.activeElement.blur();
}