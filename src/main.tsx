import React from "react";
import ReactDOM from "react-dom/client";
import {App} from "./App";
import "./assets/styles/styles.scss";
import {invoke} from "@tauri-apps/api/tauri";
import {window} from "@tauri-apps/api"
import {TauriEvent} from "@tauri-apps/api/event"

window.getCurrent().listen(TauriEvent.WINDOW_CLOSE_REQUESTED, () => {

    invoke('greet').then(_ => {
    });

    const indexDate = document.getElementsByClassName("index-date");
    const diary = document.getElementsByClassName("mde-text");
    // @ts-ignore
    const date = indexDate.item(0).textContent;
    // @ts-ignore
    let content = diary.item(0).textContent;
    invoke('save_file', {index_date: date, content: content}).then(_ => {
    });

    window.getCurrent().close().then(_ => {
    });
}).then(r => {
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
)
;
