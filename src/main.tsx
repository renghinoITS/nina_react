import "./assets/css/index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AccessPage from "./pages/AccessPage/AccessPage";
import HomePage from "./pages/HomePage/HomePage";
import { MQTTProvider } from "./contexts/MQTTContext";

const router = createBrowserRouter([
	{ path: "/", element: <AccessPage />, },
	{ path: "/home", element: <HomePage />, },
]);

createRoot(document.getElementById("main")!).render(
	<StrictMode>
		<MQTTProvider>
			<RouterProvider router={router}/>
		</MQTTProvider>
	</StrictMode>,
)
