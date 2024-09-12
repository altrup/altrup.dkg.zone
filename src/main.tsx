import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";

import './base.css';

import Root from './routes/root';
import ErrorPage from './error-page';
import Home from './routes/home';

const router = createBrowserRouter(
	createRoutesFromElements(
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
	)
);

createRoot(document.getElementById('mount')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
