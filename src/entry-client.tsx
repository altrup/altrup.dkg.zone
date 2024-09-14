import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
	createBrowserRouter,
	RouterProvider 
} from 'react-router-dom';

// apply onload.css
import './onload.css';
import './base.css';
import routes from './routes';

const router = createBrowserRouter(routes);
ReactDOM.hydrateRoot(
	document.getElementById('mount') as HTMLElement,
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);