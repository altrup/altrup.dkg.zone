// Contains information of page info
// ex. title, url, element

// get pageUrl from pageName
const pageUrl = new Map<string, string>([
	['home', '/'],
	...(__SECTIONS__.map<[string, string]>(section => [section.name, `/${section.name}`])),
	['contacts', '/contacts']
]);
// get pageTitle from pageName
const pageTitle = new Map([
	['home', 'Altrup'],
	...(__SECTIONS__.map<[string, string]>(section => [section.name, `Altrup - ${section.title}`])),
	['contacts', 'Altrup - Contacts']
]);
// pageName from pageUrl
const pageName = new Map(Array.from(pageUrl, a => [a[1], a[0]]));

const getPageUrl = (pageName: string) => pageUrl.get(pageName);
const getPageTitle = (pageName: string) => pageTitle.get(pageName);
const getPageName = (pageUrl: string) => pageName.get(pageUrl);

export { getPageUrl, getPageTitle, getPageName };