import { inView } from "motion/react";
import { useEffect, useMemo, useReducer } from "react";

export const useScrollSpy = (
	targets: {
		id: string;
		options: Parameters<typeof inView>[2];
	}[],
) => {
	const [activeIds, dispatch] = useReducer(
		(
			state: boolean[],
			action: { index: number; value: boolean },
		): boolean[] => {
			const next = new Array(...state);
			next[action.index] = action.value;
			return next;
		},
		new Array(targets.length).fill(false),
	);

	useEffect(() => {
		const cleanups = targets.map(({ id, options }, i) =>
			inView(
				`#${id}`,
				() => {
					// on enter
					dispatch({ index: i, value: true });

					return () => {
						// on exit
						dispatch({ index: i, value: false });
					};
				},
				options,
			),
		);

		return () => {
			cleanups.forEach((cleanup) => {
				cleanup();
			});
		};
	}, [targets]);

	const activeId = useMemo(
		() => targets[Math.max(0, activeIds.lastIndexOf(true))].id,
		[activeIds, targets],
	);
	return activeId;
};
