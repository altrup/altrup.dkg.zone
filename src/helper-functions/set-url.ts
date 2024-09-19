// updates the current url and replaces history entries

const isClient = typeof window !== 'undefined';

const setUrl = (url: string) => {
	if (!isClient) return;
	window.history.replaceState('test', '', url);
}

export default setUrl;