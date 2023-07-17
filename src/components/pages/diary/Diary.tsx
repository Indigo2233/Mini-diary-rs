import React, {FunctionComponent, useState, useEffect} from 'react'

import {Editor} from "../../elements/editor/Editor";
import moment, {Moment} from "moment-timezone";
import {Sidebar} from "../../elements/sidebar/Sidebar";
import {createDate, fromIndexDate} from "../../../utils/dateFormat";
import {Entries} from "../../../types";

export interface Props {
    password: string
    entries: Entries;
}

export const Diary = (props: Props) => {
    const {password, entries} = props;

    const [editorContent, setEditorContent] = useState(0);
    const [date, setDate] = useState(createDate());
    const handleChildState = (content: string) => {
        setEditorContent(content.length);
    }
    const setDiaryDate = (date: Moment) => {
        setDate(date);
    }
    return (
        <div className="diary">
            <Sidebar setDiaryDate={setDiaryDate}/>
            <div>{editorContent}</div>
            <Editor entries={entries} dateSelected={date} enableSpellcheck hideTitles contentChange={handleChildState}/>
        </div>
    );
};

export default Diary;
