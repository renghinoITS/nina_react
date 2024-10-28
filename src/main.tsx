import "./assets/css/index.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import AccessPage from "./pages/AccessPage/AccessPage"
import NotificationTestPage from "./pages/NotificationTestPage/NotificationTestPage"

const router = createBrowserRouter([
	{ path: "/", element: <AccessPage />, },
	{ path: "/notificationtest", element: <NotificationTestPage /> },
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
)
