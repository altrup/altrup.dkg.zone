import { createContext, useEffect, useState } from "react";

import Header from "./components/header";

import styles from "./root.module.css";
import transitionStyles from "./transition.module.css";
import HomePage from "./home/home-page";
import ProjectsPage from "./projects/projects-page";
import ContactsPage from "./contacts/contacts-page";

// Make typescript happy
declare const themeManager: EventTarget & {updateTheme: (theme: string) => void, themeSetting: string, theme: string};

const ThemeContext = createContext({theme: '', themeSetting: ''});

function Root() {
	const [isClient, _] = useState(typeof window !== 'undefined');

	// Only start transitioning after initial hydration
	const [transitionClass, setTransitionClass] = useState(styles["notransition"]);
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

	return (
		<div id={styles["root"]} className={transitionClass}>
			<ThemeContext.Provider value={{theme, themeSetting}}>
				<Header />
				
				<div id='main-page' className={[styles["main-page"], transitionStyles["notransition"]].join(' ')}>
					<HomePage />
					<ProjectsPage />
					<ContactsPage />
				</div>
			</ThemeContext.Provider>
		</div>
	);
}

export default Root;
export { ThemeContext };