import React from "react";
import ReactDOM from "react-dom/client";
import {App} from "./App";
import "./assets/styles/styles.scss";
import {invoke} from "@tauri-apps/api/tauri";
import Diary from "./components/pages/diary/Diary";

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
