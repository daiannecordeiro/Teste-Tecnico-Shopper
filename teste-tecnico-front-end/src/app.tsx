import { FC } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import './app.styles.css';
import { Panel } from './pages/panel';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route index path="/" element={<Panel />} />
		</Route>
	)
);

export const App: FC = () => <RouterProvider router={router} />;
