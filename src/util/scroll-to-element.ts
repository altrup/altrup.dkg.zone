import {
	animate,
	AnimationOptions,
	AnimationPlaybackControls,
} from "motion/react";

export type ScrollOptions = Omit<AnimationOptions, "duration"> & {
	maxSpeed: number;
	minDuration: number;
	maxDuration: number;
	offset: number;
};

export const defaultScrollOptions: ScrollOptions = {
	maxSpeed: 5000,
	minDuration: 0.5,
	maxDuration: 0.8,
	offset: 0,
	ease: "easeInOut",
};

let activeAnimation: AnimationPlaybackControls | null = null;
let cleanupListeners: (() => void) | null = null;

export const scrollToElement = (
	id: string,
	options: ScrollOptions = defaultScrollOptions,
) => {
	// Stop any previous animation
	if (activeAnimation) {
		activeAnimation.stop();
		activeAnimation = null;
	}

	// Remove previous listeners
	if (cleanupListeners) {
		cleanupListeners();
		cleanupListeners = null;
	}

	const element = document.getElementById(id);
	if (!element) return;

	const targetPosition =
		element.getBoundingClientRect().top + window.scrollY + options.offset;
	const distance = Math.abs(targetPosition - window.scrollY);
	const calculatedDuration = distance / options.maxSpeed;
	const duration = Math.max(
		options.minDuration,
		Math.min(options.maxDuration, calculatedDuration),
	);

	const stopAnimation = () => {
		if (activeAnimation) {
			activeAnimation.stop();
			activeAnimation = null;
		}
		if (cleanupListeners) {
			cleanupListeners();
			cleanupListeners = null;
		}
	};

	// Set up event listeners
	const events = ["wheel", "touchmove", "keydown"] as const;
	events.forEach((event) => {
		window.addEventListener(event, stopAnimation, { passive: true });
	});

	cleanupListeners = () => {
		events.forEach((event) => {
			window.removeEventListener(event, stopAnimation);
		});
	};

	activeAnimation = animate(window.scrollY, targetPosition, {
		...options,
		duration,
		onUpdate: (latest: number) => {
			window.scrollTo(0, latest);
		},
		onComplete: stopAnimation,
		onStop: stopAnimation,
	});
};
