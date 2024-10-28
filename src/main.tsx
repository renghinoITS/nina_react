import "./assets/css/index.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import NotificationBox from "./components/HomePage/NotificationBox/NotificationBox"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<NotificationBox/>
	</StrictMode>,
)
