import React, {FunctionComponent, useState, useEffect} from 'react'

import {Editor} from "../../elements/editor/Editor";
import moment from "moment-timezone";
import {Sidebar} from "../../elements/sidebar/Sidebar";

const Diary: FunctionComponent<{}> = (): JSX.Element => (
    <div className="diary">
        <Sidebar searchKey={""}/>
        <Editor dateSelected={moment("2019-01-30 11:00")} enableSpellcheck hideTitles/>
    </div>
);

export default Diary;
