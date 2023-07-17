import React, {FunctionComponent, useState, useEffect} from 'react'

import {Editor} from "../../elements/editor/Editor";
import moment, {Moment} from "moment-timezone";
import {Sidebar} from "../../elements/sidebar/Sidebar";

export interface Props {
    password: string
    // entries: Entries;
}

export const Diary = (pros: Props) => {
    const [editorContent, setEditorContent] = useState(1);
    const handleChildState = (content: string) => {
        setEditorContent(content.length);
    }
    const date = moment("2023-07-10 11:00");
    return (
        <div className="diary">
            <Sidebar searchKey={""}/>
            <div>{editorContent}</div>
            <Editor dateSelected={date} enableSpellcheck hideTitles contentChange={handleChildState}/>
        </div>
    );
};

export default Diary;
