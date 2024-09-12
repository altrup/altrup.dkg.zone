// manages and applies themes to mount element
// NOTE: this scripts runs BEFORE DOM loads

// static class, used to have private variables
class ThemeManager {
	// can be dark, light, or system, defaulting to system
	#themeSetting = localStorage.getItem('theme') ?? 'system';
	#systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches? 'dark': 'light';
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

	get theme() {
		if (this.#themeSetting === 'dark' || this.#themeSetting === 'light') return this.#themeSetting;
		else return this.#systemTheme;
	}
	
	constructor() {
		// initialize system theme listener
		const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
		mediaQueryList.onchange = () => {
			this.#systemTheme = mediaQueryList.matches? 'dark': 'light';
			this.#applyTheme();
		}
	}

	// updateTheme stores theme in localStorage, and applies new theme to mount element
	updateTheme(theme) { 
		this.#themeSetting = theme; 
		localStorage.setItem('theme', theme); 

		this.#applyTheme();
	}
	// helper function ran only from updateTheme
	#applyTheme() {
		// remove all current theme classes
		['light', 'dark'].forEach((theme) => this.#mountElement.classList.remove(theme));
		// add new theme class
		this.#mountElement.classList.add(this.theme);
		console.log(this.#mountElement);
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

	// Until DOM loads, set documentElement background color to match theme
	document.documentElement.style.backgroundColor = (themeManager.theme === 'light')? "#F5F6F4": "#030C11";
}