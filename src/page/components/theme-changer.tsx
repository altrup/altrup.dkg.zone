import { useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';

import unFocus from '../../helper-functions/unFocus';

import { ThemeContext } from '../root';

import darkModeIcon from '../../icons/dark-mode.svg';
import lightModeIcon from '../../icons/light-mode.svg';
import systemModeIcon from '../../icons/system-mode.svg';

import styles from './theme-changer.module.css';
import transitionStyles from '../transitions.module.css';

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
	// cssOrder is one frame behind order, to make animations work properly
	const [cssOrder, setCssOrder] = useState(['light', 'dark', 'system']);
	useEffect(() => { requestAnimationFrame(() => setCssOrder(order)); }, [order])
	// initialize order
	useEffect(() => dispatchOrder(themeManager.themeSetting), []);

	const getButtonIcon = useCallback((buttonTheme: string) => {
		if (buttonTheme === 'light') return lightModeIcon;
		if (buttonTheme === 'dark') return darkModeIcon;
		if (buttonTheme === 'system') return systemModeIcon;
	}, []);

	// store the nextTheme we switch to when html order updates
	const [nextTheme, setNextTheme] = useState(theme);
	const updateTheme = useCallback((theme: string) => {
		if (!isClient) return; // do nothing
		dispatchOrder(theme);
		setNextTheme(theme);

		unFocus(); // unFocus is clicked with mouse
	}, [isClient]);
	// only update theme after we've reordered elements
	useEffect(() => { if (nextTheme) requestAnimationFrame(() => requestAnimationFrame(() => themeManager.updateTheme(nextTheme))) }, [nextTheme]);

	const transitionClass = useMemo(() => [transitionStyles["interactive"], transitionStyles["clickable"], transitionStyles["rounded-square"]].join(' '), [transitionStyles]);
	return (
		<div id={styles["theme-changer-wrapper"]}>
			<div id={styles["theme-changer"]} className={hidden? styles["hidden"]: undefined}>
				{
					order.map((buttonTheme, index) => (
						<button key={buttonTheme} id={buttonTheme} style={{zIndex: order.length - index}} onClick={() => updateTheme(buttonTheme)}
						className={[themeSetting === buttonTheme? styles["selected"]: undefined, styles["pos-" + (1 + cssOrder.indexOf(buttonTheme))], transitionClass].join(' ')}>
							<img key={buttonTheme} src={getButtonIcon(buttonTheme)} className={theme === 'dark'? styles['inverted']: undefined} draggable="false" alt={`${buttonTheme} mode`} />
						</button>
					))
				}
			</div>
		</div>
	)
}

export default ThemeChanger;