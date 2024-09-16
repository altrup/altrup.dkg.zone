// adapted from https://medium.com/@antonio.falcescu/animating-react-pages-with-react-router-dom-outlet-and-framer-motion-animatepresence-bd5438b3433b

import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import styles from './animated-outlet.module.css';

const AnimatedOutlet = ({outletOverride}: {outletOverride?: JSX.Element}) => {
	const location = useLocation();
	const defaultOutlet = useOutlet();
	const outlet = useMemo(() => outletOverride?? defaultOutlet, [outletOverride, defaultOutlet]);

	const [enter] = useState({opacity: 1, x: 0, y: 0});
	const [exit] = useState({opacity: 0, x: 0, y: 0});
	// initial starts as enter, but then changes to exit to animate new pages in
	const [initial, setInitial] = useState(enter);
	useEffect(() => setInitial(exit), []);

	return (
		<AnimatePresence mode="sync" initial={true}>
			<motion.div
				key={location.pathname}
				id={styles["animation-div"]}
				initial={initial}
				animate={enter}
				exit={exit}
				transition={{ duration: 0.5, type: "easeInOut" }}
				className="relative"
			>
				{outlet}
			</motion.div>
		</AnimatePresence>
	);
};

export default AnimatedOutlet;
