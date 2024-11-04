import "./assets/css/index.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import AccessPage from "./pages/AccessPage/AccessPage"
import NotificationTestPage from "./pages/NotificationTestPage/NotificationTestPage"
import HomePage from "./pages/HomePage/HomePage"

const router = createBrowserRouter([
	{ path: "/", element: <AccessPage />, },
	{ path: "/home", element: <HomePage />, },
	{ path: "/notificationtest", element: <NotificationTestPage /> },
]);

createRoot(document.getElementById("main")!).render(
	<StrictMode>
		<HomePage/>
	</StrictMode>,
)
