import React, {createContext, useEffect, useRef} from 'react';
import "./App.css";
import "react-mde/lib/styles/css/react-mde-all.css";
import 'react-day-picker/dist/style.css';
import Diary from "./components/pages/diary/Diary";
import PasswordPrompt from "./components/pages/start-page/PasswordPrompt";
import {invoke} from "@tauri-apps/api/tauri";
import {Entries} from "./types";

type Props = {}

const ThemeContext = createContext("light");

async function createEncryptedFile(password: string) {
    await invoke('create_encrypted_file', {password: password});
}

async function testFileExists() {
    const exist = await invoke('test_file_exists');
}

export const App = (_props: Props) => {
    const [password, setPassword] = React.useState("");
    const [correct, setCorrect] = React.useState(false);
    const [entries, setEntries] = React.useState<Entries>({});
    const checkPasswd = async (password: string) => {
        if (await invoke('check_passwd', {password: password})) {
            setPassword(password);
            setCorrect(true);

            const ets: [[string, [string, string]]] = await invoke('get_entries');
            let entries: Entries = {};
            for (let i = 0; i < ets.length; i++) {
                entries[ets[i][0]] = {
                    dateUpdated: ets[i][1][0],
                    text: ets[i][1][1]
                };
            }
            setEntries(entries);
        }
    }

    const theme = "light";
    const page = password !== "" ?
        <Diary password={password} entries={entries}/> :
        <PasswordPrompt decryptErrorMsg={"Wrong password!"} decryptFile={checkPasswd}
                        decryptStatus={correct ? "right" : "error"}/>;

    /*<PasswordCreation createEncryptedFile={createEncryptedFile} testFileExists={testFileExists}/>*/
    return (
        <ThemeContext.Provider value={theme}>
            {/* Everything below the "theme-*" div can be styled based on the theme */}
            <div className={`theme-${theme}`}>
                <div className="app">
                    {page}
                </div>
            </div>
        </ThemeContext.Provider>

    )
}
// export default App;
