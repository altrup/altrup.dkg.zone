import { useCallback, useEffect, useState } from 'react';

import darkMode from '../../icons/dark-mode.svg';
import lightMode from '../../icons/light-mode.svg';
import systemMode from '../../icons/system-mode.svg';

import styles from './theme-changer.module.css';

// Make typescript happy
declare const themeManager: EventTarget & {updateTheme: (theme: string) => void, themeSetting: string};

// NOTE: the logic for this component runs Client side only
function ThemeChanger() {
	const [isClient, _] = useState(typeof window !== 'undefined');

	// add listener to theme manager for theme changes and store theme
	const [themeSetting, updateThemeSetting] = useState('');
	useEffect(() => {
		if (!isClient) return;

		// initialize themeSetting
		updateThemeSetting(themeManager.themeSetting);

		const themeChangeListener = (e: any) => {
			updateThemeSetting(e.theme);
		}
		themeManager.addEventListener('themeChange', themeChangeListener);
		// remove event listener on component unmount
		return () => {
			themeManager.removeEventListener('themeChange', themeChangeListener);
		};
	}, []);

	const updateTheme = useCallback((theme: string) => {
		if (!isClient) return; // do nothing
		themeManager.updateTheme(theme);
	}, [isClient]);

	return (
		<div id={styles["theme-changer"]}>
			<button className={themeSetting === 'light'? styles['selected']: ''} onClick={() => updateTheme('light')}>
				<img src={lightMode}></img>
			</button>
			<button className={themeSetting === 'dark'? styles['selected']: ''} onClick={() => updateTheme('dark')}>
				<img src={darkMode}></img>
			</button>
			<button className={themeSetting === 'system'? styles['selected']: ''} onClick={() => updateTheme('system')}>
				<img src={systemMode}></img>
			</button>
		</div>
	)
}

export default ThemeChanger;