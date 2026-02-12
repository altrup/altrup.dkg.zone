"use client";

import { createContext, useEffect, useMemo, useState } from "react";

import Header from "./header/header";

import styles from "./root.module.css";
import transitionStyles from "./transitions.module.css";

import HomePage from "./home/home-page";
import SectionPage from "./section/section-page";

import SelectedImage, { ImageInfo } from "./components/selected-image";

import unFocus from "../util/un-focus";
import type { Section } from "../types";
import { createPageInfo } from "../util/page-info";

// themeManager is a global class declared on load
declare const themeManager: EventTarget & {
	updateTheme: (theme: string) => void;
	themeSetting: string;
	theme: string;
};

const ThemeContext = createContext({ theme: "", themeSetting: "" });
const SelectedImageContext = createContext<{
	setSelectedImage: (image?: ImageInfo) => void;
	setShowImage: (show: boolean) => void;
}>({ setSelectedImage: () => {}, setShowImage: () => {} });
const SectionsContext = createContext<Section[]>([]);
const PageInfoContext = createContext<ReturnType<typeof createPageInfo>>({
	getPageUrl: () => undefined,
	getPageTitle: () => undefined,
	getPageName: () => undefined,
});

function Root({ sections }: { sections: Section[] }) {
	const [isClient] = useState(typeof window !== "undefined");

	const pageInfo = useMemo(() => createPageInfo(sections), [sections]);

	// Only start transitioning after initial hydration
	const [transitionClass, setTransitionClass] = useState(
		transitionStyles["notransition"],
	);
	const [hydrated, setHydrated] = useState(false);
	useEffect(() => {
		setHydrated(true);
	}, []);
	// using requestAnimationFrame runs right before the next redraw, which delays it long enough to prevent initial transitions
	useEffect(() => {
		if (hydrated)
			requestAnimationFrame(() => {
				setTransitionClass(transitionStyles["transition"]);
			});
	}, [hydrated]);

	// add listener to theme manager for theme changes and store theme
	const [themeSetting, setThemeSetting] = useState("");
	const [theme, setTheme] = useState("");
	useEffect(() => {
		if (!isClient) return;

		// initialize states
		setThemeSetting(themeManager.themeSetting);
		setTheme(themeManager.theme);

		// add listeners
		const themeSettingChangeListener = (e: { theme: string }) => {
			setThemeSetting(e.theme);
		};
		themeManager.addEventListener(
			"themeSettingChange",
			themeSettingChangeListener as unknown as EventListener,
		);

		const themeChangeListener = (e: { theme: string }) => {
			setTheme(e.theme);
		};
		themeManager.addEventListener(
			"themeChange",
			themeChangeListener as unknown as EventListener,
		);
		// remove event listeners on component unmount
		return () => {
			themeManager.removeEventListener(
				"themeSettingChange",
				themeSettingChangeListener as unknown as EventListener,
			);
			themeManager.removeEventListener(
				"themeChange",
				themeChangeListener as unknown as EventListener,
			);
		};
	}, [isClient]);

	const [selectedImage, setSelectedImage] = useState<ImageInfo | undefined>(
		undefined,
	);
	const [showImage, setShowImage] = useState<boolean>(false);

	return (
		<div
			id={styles["root"]}
			className={transitionClass}
			onClick={() => {
				unFocus();
			}}
		>
			<SectionsContext.Provider value={sections}>
				<PageInfoContext.Provider value={pageInfo}>
					<ThemeContext.Provider value={{ theme, themeSetting }}>
						<SelectedImageContext.Provider
							value={{ setSelectedImage, setShowImage }}
						>
							<Header />

							<div className={styles["main-page"]}>
								<HomePage />
								{sections.map((section) => (
									<SectionPage key={section.name} {...section} />
								))}
							</div>

							<SelectedImage showImage={showImage} image={selectedImage} />
						</SelectedImageContext.Provider>
					</ThemeContext.Provider>
				</PageInfoContext.Provider>
			</SectionsContext.Provider>
		</div>
	);
}

export default Root;
export { ThemeContext, SelectedImageContext, SectionsContext, PageInfoContext };
