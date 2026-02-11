// updates the current url and replaces history entries

const isClient = typeof window !== "undefined";

const setUrl = (url: string) => {
	if (!isClient) return;
	if (window.location.pathname === url) return;

	window.history.replaceState({}, "", url);
};

export default setUrl;
