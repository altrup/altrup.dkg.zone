import {
	createRoutesFromElements,
	Route
} from 'react-router-dom';

import Root from './routes/root';
import ErrorPage from './routes/error-page';
import HomePage from './routes/home/home-page';
import ProjectsPage from './routes/projects/projects-page';
import AboutPage from './routes/about/about-page';

const routes = createRoutesFromElements(
	<Route
		path="/"
		element={<Root />}
		errorElement={<Root outletOverride={<ErrorPage />} />}
	>
		<Route
			index
			element={<HomePage />}
		/>
		<Route
			path="/projects"
			element={<ProjectsPage />}
		/>
		<Route
			path="/about"
			element={<AboutPage />}
		/>
	</Route>
);

export default routes;