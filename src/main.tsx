import React from "react";
import ReactDOM from "react-dom/client";
import {App} from "./App";
// import "./style.css";
import "./assets/styles/styles.scss";

// import PasswordCreation from "./renderer/components/pages/start-page/password-creation/PasswordCreation";
import {invoke} from "@tauri-apps/api/tauri";
import PasswordCreation from "./components/pages/start-page/PasswordCreation";
import PasswordPrompt from "./components/pages/start-page/PasswordPrompt";
import Diary from "./components/pages/diary/Diary";
import Calendar from "./components/elements/sidebar/Calendar";
import {Sidebar} from "./components/elements/sidebar/Sidebar";

async function createEncryptedFile(password: string) {
    await invoke('create_encrypted_file', {password: password});
}

async function testFileExists() {
    const exist = await invoke('test_file_exists');
    console.log(exist);
}

async function checkPasswd(password: string) {
    const correct = await invoke('check_passwd', {password: password});
    console.log(correct);
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        {/*<PasswordCreation createEncryptedFile={createEncryptedFile} testFileExists={testFileExists}/>*/}
        {/*<PasswordPrompt  decryptErrorMsg={"Wrong password!"} decryptFile={checkPasswd} decryptStatus={"error"}/>*/}
        <Diary/>
        {/*<App/>*/}
    </React.StrictMode>
)
;
