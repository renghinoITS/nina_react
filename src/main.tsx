import "./assets/css/index.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import AccessPage from "./pages/AccessPage/AccessPage"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AccessPage/>
	</StrictMode>,
)
