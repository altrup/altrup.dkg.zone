// Contains information of page info
// ex. title, url, element

import type { Section } from "./get-sections";

export function createPageInfo(sections: Section[]) {
  // get pageUrl from pageName
  const pageUrlMap = new Map<string, string>([
    ["home", "/"],
    ...sections.map<[string, string]>((section) => [
      section.name,
      `/${section.name}`,
    ]),
    ["contacts", "/contacts"],
  ]);
  // get pageTitle from pageName
  const pageTitleMap = new Map([
    ["home", "Altrup"],
    ...sections.map<[string, string]>((section) => [
      section.name,
      `Altrup - ${section.title}`,
    ]),
    ["contacts", "Altrup - Contacts"],
  ]);
  // pageName from pageUrl
  const pageNameMap = new Map(Array.from(pageUrlMap, (a) => [a[1], a[0]]));

  return {
    getPageUrl: (pageName: string) => pageUrlMap.get(pageName),
    getPageTitle: (pageName: string) => pageTitleMap.get(pageName),
    getPageName: (pageUrl: string) => pageNameMap.get(pageUrl),
  };
}
