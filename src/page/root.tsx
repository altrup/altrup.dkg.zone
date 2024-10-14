import { createContext, useEffect, useRef, useState } from "react";

import Header from "./header/header";

import styles from "./root.module.css";
import transitionStyles from "./transitions.module.css";

import HomePage from "./home/home-page";
import ProjectsPage from "./projects/projects-page";
import ContactsPage from "./contacts/contacts-page";

import SelectedImage, { ImageInfo } from "./components/selected-image";

import unFocus from "../helper-functions/unFocus";

// themeManager is a global class declared on load
declare const themeManager: EventTarget & {updateTheme: (theme: string) => void, themeSetting: string, theme: string};

const ThemeContext = createContext({theme: '', themeSetting: ''});
const SelectedImageContext = createContext({setSelectedImage: (_?: ImageInfo) => {}, setShowImage: (_: boolean) => {}});

function Root() {
	const [isClient, _] = useState(typeof window !== 'undefined');

	// Only start transitioning after initial hydration
	const [transitionClass, setTransitionClass] = useState(transitionStyles["notransition"]);
	const [hydrated, setHydrated] = useState(false);
	useEffect(() => { setHydrated(true); }, []);
	// using requestAnimationFrame runs right before the next redraw, which delays it long enough to prevent initial transitions
	useEffect(() => { if (hydrated) requestAnimationFrame(() => setTransitionClass(transitionStyles["transition"])); }, [hydrated]);

	// add listener to theme manager for theme changes and store theme
	const [themeSetting, setThemeSetting] = useState('');
	const [theme, setTheme] = useState('');
	useEffect(() => {
		if (!isClient) return;

		// initialize states
		setThemeSetting(themeManager.themeSetting);
		setTheme(themeManager.theme);

		// add listeners
		const themeSettingChangeListener = (e: any) => { setThemeSetting(e.theme); }
		themeManager.addEventListener('themeSettingChange', themeSettingChangeListener);

		const themeChangeListener = (e: any) => { setTheme(e.theme); }
		themeManager.addEventListener('themeChange', themeChangeListener);
		// remove event listeners on component unmount
		return () => {
			themeManager.removeEventListener('themeSettingChange', themeSettingChangeListener);
			themeManager.removeEventListener('themeChange', themeChangeListener);
		};
	}, []);

	const [selectedImage, setSelectedImage] = useState<ImageInfo | undefined>(undefined);
	const [showImage, setShowImage] = useState<boolean>(false);

	const scrollContainer = useRef(null);

	return (
		<div id={styles["root"]} className={transitionClass} onClick={() => unFocus()}>
			<ThemeContext.Provider value={{theme, themeSetting}}>
				<SelectedImageContext.Provider value={{setSelectedImage, setShowImage}}>
					<Header />
					
					<div id='main-page' ref={scrollContainer} className={[styles["main-page"]].join(' ')}>
						<HomePage />
						<ProjectsPage />
						<ContactsPage />
					</div>


					<SelectedImage showImage={showImage} image={selectedImage} />
				</SelectedImageContext.Provider>
			</ThemeContext.Provider>
		</div>
	);
}

export default Root;
export { ThemeContext, SelectedImageContext};