import fs from "fs/promises";
import path from "path";
import { Section } from "../types";

export const getSections = async () =>
	JSON.parse(
		await fs.readFile(path.join(process.cwd(), "data/sections.json"), "utf8"),
	) as Section[];
