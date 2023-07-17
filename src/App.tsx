import React, {createContext, useRef} from 'react';
import "./App.css";
import "react-mde/lib/styles/css/react-mde-all.css";
import {format} from 'date-fns';
import 'react-day-picker/dist/style.css';
import Diary from "./components/pages/diary/Diary";
import PasswordPrompt from "./components/pages/start-page/PasswordPrompt";
import {invoke} from "@tauri-apps/api/tauri";

type Props = {}

const ThemeContext = createContext("light");

async function createEncryptedFile(password: string) {
    await invoke('create_encrypted_file', {password: password});
}

async function testFileExists() {
    const exist = await invoke('test_file_exists');
    console.log(exist);
}

export const App = (props: Props) => {
    const [selected, setSelected] = React.useState<Date>();
    const [password, setPassword] = React.useState("");
    const [correct, setCorrect] = React.useState(false);
    const checkPasswd = async (password: string) => {
        if (await invoke('check_passwd', {password: password})) {
            setPassword(password);
            setCorrect(true);
        }
    }

    let footer = <p>Please pick a day.</p>;
    if (selected) {
        footer = <p>You picked {format(selected, 'PP')}.</p>;
    }
    const theme = "light";
    console.log(correct);
    const page = password !== "1" ?
        <Diary password={password}/> :
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
