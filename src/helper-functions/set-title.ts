// Just sets the page title to inputted value

const isClient = typeof window !== 'undefined';

const setTitle = (title: string) => {
	if (!isClient) return;
	if (title) document.title = title;
}

export default setTitle;