import "./assets/css/index.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import HomePage from "./pages/HomePage/HomePage"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<HomePage/>
	</StrictMode>,
)
