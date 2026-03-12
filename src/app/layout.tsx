import type { Metadata } from "next";
import fs from "fs/promises";
import path from "path";

import "../base.css";
import styles from "../page/transitions.module.css";

export const metadata: Metadata = {
	title: "Altrup",
	description:
		"Mechatronics student at the University of Waterloo. View some projects and other things I've worked on.",
	icons: {
		icon: "/icon-small.png",
	},
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const inlineCSS = await fs.readFile(
		path.join(process.cwd(), "src/inline.css"),
		"utf-8",
	);
	const inlineJS = await fs.readFile(
		path.join(process.cwd(), "src/theme-manager.js"),
		"utf-8",
	);

	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<style dangerouslySetInnerHTML={{ __html: inlineCSS }} />
				<script dangerouslySetInnerHTML={{ __html: inlineJS }} />
				<meta name="color-scheme" content="dark light" />
			</head>
			<body className={styles["transition"]}>
				<div id="mount">
					{children}
				</div>
			</body>
		</html>
	);
}
