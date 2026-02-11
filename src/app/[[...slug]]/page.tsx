import { getSections } from "../../util/get-sections";
import Root from "../../page/root";

export default async function Page() {
	const sections = await getSections();

	return <Root sections={sections} />;
}
