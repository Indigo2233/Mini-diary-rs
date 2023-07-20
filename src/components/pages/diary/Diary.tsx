import React, {useState} from 'react'

import {Editor} from "../../elements/editor/Editor";
import {Moment} from "moment-timezone";
import {Sidebar} from "../../elements/sidebar/Sidebar";
import {createDate} from "../../../utils/dateFormat";
import {Entries} from "../../../types";

export interface Props {
    passwd: string
    entries: Entries;
}

export const Diary = (props: Props) => {
    const {passwd, entries} = props;

    const [date, setDate] = useState(createDate());
    const setDiaryDate = (dt: Moment) => {
        setDate(dt);
    }
    return (
        <div className="diary">
            <Sidebar entries={entries} setDiaryDate={setDiaryDate}/>
            <Editor entries={entries} dateSelected={date} enableSpellcheck hideTitles passwd={passwd}/>
        </div>
    );
};

export default Diary;
