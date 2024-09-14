import { useCallback, useEffect, useReducer, useState } from 'react';

import darkMode from '../../icons/dark-mode.svg';
import lightMode from '../../icons/light-mode.svg';
import systemMode from '../../icons/system-mode.svg';

import styles from './theme-changer.module.css';
import transitionStyles from '../transition.module.css';

// Make typescript happy
declare const themeManager: EventTarget & {updateTheme: (theme: string) => void, themeSetting: string, theme: string};

// NOTE: the logic for this component runs Client side only
function ThemeChanger() {
	const [isClient, _] = useState(typeof window !== 'undefined');

	// add listener to theme manager for theme changes and store theme
	const [themeSetting, setThemeSetting] = useState('');
	// const [theme, setTheme] = useState('');
	// store order of buttons, too, to swap order when setting theme (feels more natural)
	const [order, dispatchOrder] = useReducer((state: string[], theme: string) => {
		return [theme].concat(state.filter(val => val !== theme));
	}, ['light', 'dark', 'system']);
	useEffect(() => {
		if (!isClient) return;

		// initialize states
		setThemeSetting(themeManager.themeSetting);
		// setTheme(themeManager.theme);
		dispatchOrder(themeManager.themeSetting);

		// add listeners
		const themeSettingChangeListener = (e: any) => { setThemeSetting(e.theme); }
		themeManager.addEventListener('themeSettingChange', themeSettingChangeListener);

		// const themeChangeListener = (e: any) => { setTheme(e.theme); }
		// themeManager.addEventListener('themeChange', themeChangeListener);
		// remove event listeners on component unmount
		return () => {
			themeManager.removeEventListener('themeSettingChange', themeSettingChangeListener);
			// themeManager.removeEventListener('themeChange', themeChangeListener);
		};
	}, []);
	const [hidden, setHidden] = useState(true);
	// after theme and settings update, make component visible
	useEffect(() => setHidden(false));

	const updateTheme = useCallback((theme: string) => {
		if (!isClient) return; // do nothing
		themeManager.updateTheme(theme);
		dispatchOrder(theme);
	}, [isClient]);

	return (
		<div id={styles["theme-changer-wrapper"]} className={!themeSetting? transitionStyles["notransition"]: undefined}>
			<div id={styles["theme-changer"]} className={hidden? styles["hidden"]: undefined}>
				<button id={styles['light']} className={[themeSetting === 'light'? styles["selected"]: undefined, styles["pos-" + (1 + order.indexOf('light'))]].join(' ')} 
				onClick={() => updateTheme('light')}>
					<img src={lightMode} draggable="false"></img>
				</button>
				<button id={styles['dark']} className={[themeSetting === 'dark'? styles["selected"]: undefined, styles["pos-" + (1 + order.indexOf('dark'))]].join(' ')}
				onClick={() => updateTheme('dark')}>
					<img src={darkMode} draggable="false"></img>
				</button>
				<button id={styles['system']} className={[themeSetting === 'system'? styles["selected"]: undefined, styles["pos-" + (1 + order.indexOf('system'))]].join(' ')}
				onClick={() => updateTheme('system')}>
					<img src={systemMode} draggable="false"></img>
				</button>
			</div>
		</div>
	)
}

export default ThemeChanger;