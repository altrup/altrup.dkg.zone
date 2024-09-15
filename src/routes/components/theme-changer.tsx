import { useCallback, useContext, useEffect, useReducer, useState } from 'react';

import { ThemeContext } from '../root';

import lightDarkModeIcon from '../../icons/light-theme/dark-mode.svg';
import lightLightModeIcon from '../../icons/light-theme/light-mode.svg';
import lightSystemModeIcon from '../../icons/light-theme/system-mode.svg';
import darkDarkModeIcon from '../../icons/dark-theme/dark-mode.svg';
import darkLightModeIcon from '../../icons/dark-theme/light-mode.svg';
import darkSystemModeIcon from '../../icons/dark-theme/system-mode.svg';

import styles from './theme-changer.module.css';
import transitionStyles from '../transition.module.css';

// Make typescript happy
declare const themeManager: EventTarget & {updateTheme: (theme: string) => void, themeSetting: string, theme: string};

// NOTE: the logic for this component runs Client side only
function ThemeChanger() {
	const [isClient, _] = useState(typeof window !== 'undefined');

	// import context
	const {theme, themeSetting} = useContext(ThemeContext);

	const [hidden, setHidden] = useState(true);
	// after theme and settings update, make component visible
	useEffect(() => setHidden(false));

	// store order of buttons, too, to swap order when setting theme (feels more natural)
	const [order, dispatchOrder] = useReducer((state: string[], theme: string) => {
		return [theme].concat(state.filter(val => val !== theme));
	}, ['light', 'dark', 'system']);
	// initialize order
	useEffect(() => dispatchOrder(themeManager.themeSetting), []);

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
					<img src={theme === 'light'? lightLightModeIcon: darkLightModeIcon} draggable="false" alt='light-mode'></img>
				</button>
				<button id={styles['dark']} className={[themeSetting === 'dark'? styles["selected"]: undefined, styles["pos-" + (1 + order.indexOf('dark'))]].join(' ')}
				onClick={() => updateTheme('dark')}>
					<img src={theme === 'light'? lightDarkModeIcon: darkDarkModeIcon} draggable="false" alt='dark-mode'></img>
				</button>
				<button id={styles['system']} className={[themeSetting === 'system'? styles["selected"]: undefined, styles["pos-" + (1 + order.indexOf('system'))]].join(' ')}
				onClick={() => updateTheme('system')}>
					<img src={theme === 'light'? lightSystemModeIcon: darkSystemModeIcon} draggable="false" alt='system-mode'></img>
				</button>
			</div>
		</div>
	)
}

export default ThemeChanger;