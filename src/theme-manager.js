// manages and applies themes to mount element
// NOTE: this scripts runs BEFORE DOM loads

// Event that is emitted on theme changes and theme setting changes
// name is 'themeChange' for any theme change, or 'themeSettingChange' for setting changes
class ThemeChangeEvent extends Event {
	constructor(type, options, theme) {
		super(type, options);
		this.theme = theme;
	}
}
// class, used to have private variables
class ThemeManager extends EventTarget {
	// can be dark, light, or system, defaulting to system
	#themeSetting = localStorage.getItem('theme') ?? 'system';
	#systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches? 'dark': 'light';
	// current theme is what is currently applied to the mountElement
	#currentTheme;
	// mountElement is what the css is "mounted" onto
	#mountElement;
	// updates AND APPLIES THEME to mount element
	set mountElement(newElement) { 
		const oldElement = this.#mountElement;
		// set and apply new element
		this.#mountElement = newElement; 
		this.#applyTheme();
		// remove classes from old element
		['light', 'dark'].forEach((theme) => oldElement?.classList.remove(theme));
	}

	get themeSetting() { return this.#themeSetting; }
	get theme() {
		if (this.#themeSetting === 'dark' || this.#themeSetting === 'light') return this.#themeSetting;
		else return this.#systemTheme;
	}
	
	constructor() {
		super();

		// initialize system theme listener
		const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
		mediaQueryList.onchange = () => {
			this.#systemTheme = mediaQueryList.matches? 'dark': 'light';
			this.#applyTheme();
		}
	}

	
	// updateTheme stores theme in localStorage, and applies new theme to mount element
	updateTheme(theme) { 
		if (!(theme === 'light' || theme === 'dark' || theme === 'system')) return console.error("'" + theme + "' is not a valid theme");
		this.#themeSetting = theme; 
		localStorage.setItem('theme', theme); 

		this.#applyTheme();

		// call event listeners
		this.dispatchEvent(new ThemeChangeEvent('themeSettingChange', {}, theme));
	}
	// helper function ran only from updateTheme
	#applyTheme() {
		// only run if new theme is different from current theme
		if (this.theme === this.#currentTheme) return;
		this.#currentTheme = this.theme;

		// remove all current theme classes
		['light', 'dark'].forEach((theme) => this.#mountElement.classList.remove(theme));
		// add new theme class
		this.#mountElement.classList.add(this.theme);

		// call event listeners
		this.dispatchEvent(new ThemeChangeEvent('themeChange', {}, this.theme));
	}
}

// this variable is publicly available to all scripts on the page
const themeManager = new ThemeManager();
// if already loaded, mount element
if (document.body) themeManager.mountElement = document.getElementById('mount');
// otherwise apply to html element for now, and apply to mount later
else {
	// run on DOM load
	document.addEventListener('DOMContentLoaded', () => {
		// get mount element
		themeManager.mountElement = document.getElementById('mount');
	});

	// Until DOM loads, set documentElement background color to match theme, and hide content
	document.documentElement.style.backgroundColor = (themeManager.theme === 'light')? "#F5F6F4": "#030C11";
}