import React from "react";
import ReactDOM from "react-dom/client";
import {App} from "./App";
import "./assets/styles/styles.scss";
import {invoke} from "@tauri-apps/api/tauri";
import Diary from "./components/pages/diary/Diary";



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
)
;
