import {
	createRoutesFromElements,
	Route
} from 'react-router-dom';

import Root from './routes/root';
import ErrorPage from './error-page';
import Home from './routes/home';

const routes = createRoutesFromElements(
	<Route
		path="/"
		element={<Root />}
		errorElement={<ErrorPage />}
	>
		<Route
			index
			element={<Home />}
		/>
	</Route>
);

export default routes;