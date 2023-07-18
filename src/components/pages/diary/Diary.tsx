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

    const [date, setDate] = useState(createDate());
    const setDiaryDate = (dt: Moment) => {
        setDate(dt);
    }
    return (
        <div className="diary">
            <Sidebar entries={entries} setDiaryDate={setDiaryDate}/>
            <Editor entries={entries} dateSelected={date} enableSpellcheck hideTitles/>
        </div>
    );
};

export default Diary;
