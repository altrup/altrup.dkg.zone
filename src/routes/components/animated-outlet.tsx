// adapted from https://medium.com/@antonio.falcescu/animating-react-pages-with-react-router-dom-outlet-and-framer-motion-animatepresence-bd5438b3433b

import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";

import styles from './animated-outlet.module.css';

const AnimatedOutlet = ({outletOverride}: {outletOverride?: JSX.Element}) => {
	const location = useLocation();
	const defaultOutlet = useOutlet();
	const outlet = useMemo(() => outletOverride?? defaultOutlet, [outletOverride, defaultOutlet]);

	const transition = {type: "spring", duration: 0.75, bounce: 0.4};
	const enter = {x: 0, y: "0"};
	const exit = {x: 0, y: "-100%"};
	const initial = exit;

	return (
		<AnimatePresence mode="sync" initial={false}>
			<motion.div
				key={location.pathname}
				id={styles["animation-div"]}
				initial={initial}
				animate={enter}
				exit={exit}
				transition={transition}
			>
				{outlet}
			</motion.div>
		</AnimatePresence>
	);
};

export default AnimatedOutlet;
