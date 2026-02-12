"use client";

import { useInView, UseInViewOptions } from "motion/react";
import { ReactNode, useRef } from "react";

function LazyLoad({
	children,
	placeholder,
	visibilityOverride,
	margin,
}: {
	children: ReactNode;
	placeholder: ReactNode;
	visibilityOverride?: boolean;
	margin?: UseInViewOptions["margin"];
}) {
	const lazyLoadDiv = useRef(null);
	const visible = useInView(lazyLoadDiv, {
		margin,
		once: true,
	});

	return (
		<div ref={lazyLoadDiv} className="lazy-load-div">
			{typeof visibilityOverride != "undefined"
				? visibilityOverride
					? children
					: placeholder
				: visible
					? children
					: placeholder}
		</div>
	);
}

export default LazyLoad;
