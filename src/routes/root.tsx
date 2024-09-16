import { createContext, useEffect, useMemo, useState } from "react";
import { Outlet, useMatches } from "react-router-dom";

import Header from "./components/header";

import styles from "./root.module.css";
import transitionStyles from "./transition.module.css";

// Make typescript happy
declare const themeManager: EventTarget & {updateTheme: (theme: string) => void, themeSetting: string, theme: string};

const ThemeContext = createContext({theme: '', themeSetting: ''});

function Root({ outletOverride }: { outletOverride?: JSX.Element}) {
	const [isClient, _] = useState(typeof window !== 'undefined');

	const matches = useMatches();
	const {handle, data}: {handle: any, data: any} = useMemo(() => matches[matches.length - 1], [matches[matches.length - 1]]);
	const title = useMemo(() => handle && handle.title && handle.title(data), [handle, data]);
	// use last match to get title
	useMemo(() => {
		if (!isClient) return;
		if (title) document.title = title;
	}, [isClient, title]);
	
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
				<div id={styles["main-page"]}>
					{ outletOverride?? <Outlet /> }
				</div>
			</ThemeContext.Provider>
		</div>
	);
}

export default Root;
export { ThemeContext };