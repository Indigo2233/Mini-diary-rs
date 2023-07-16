import "draft-js/dist/Draft.css";

import {Moment} from "moment-timezone";
import React, {useEffect, useState} from "react";

import {toIndexDate, toLocaleWeekday} from "../../../utils/dateFormat";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import "./styles.css"

const AUTOSAVE_INTERVAL = 500;

// Draft.js plugins
// const listPlugin = createListPlugin();
// const plugins = [listPlugin];

export interface StateProps {
    enableSpellcheck: boolean;
    hideTitles: boolean;
    dateSelected: Moment;
    // entries: Entries;
}

export interface DispatchProps {
    // updateEntry: (entryDate: IndexDate, title: string, text: string) => void;
}

type Props = StateProps & DispatchProps;

interface State {
    dateSelected: Moment;
}

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
});
export const Editor = (props: Props) => {
    const {dateSelected} = props;
    const [date, setDate] = useState(dateSelected);
    const [value, setValue] = useState("**Hello world!!!**");
    const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");
    useEffect(() => {
        console.log(value);
    }, [value]);
    const weekdayDate = toLocaleWeekday(date);
    return (
        <div className="editor">
            <div>{weekdayDate}</div>
            <ReactMde
                value={value}
                onChange={setValue}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={markdown =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
            />
            <div>{value}</div>
        </div>
    );
}