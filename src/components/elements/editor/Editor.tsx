import "draft-js/dist/Draft.css";

import {Moment} from "moment-timezone";
import React, {useEffect, useState} from "react";

import {fromIndexDate, toIndexDate, toLocaleWeekday} from "../../../utils/dateFormat";
import ReactMde from "react-mde";
// @ts-ignore
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import "./styles.css"
import {Entries} from "../../../types";

const AUTOSAVE_INTERVAL = 500;

// Draft.js plugins
// const listPlugin = createListPlugin();
// const plugins = [listPlugin];

export interface StateProps {
    enableSpellcheck: boolean;
    hideTitles: boolean;
    dateSelected: Moment;
    entries: Entries;
}

export interface DispatchProps {
    // updateEntry: (entryDate: IndexDate, title: string, text: string) => void;
    contentChange: (content: string) => void;
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
    const {dateSelected, entries, contentChange} = props;
    const et = entries[toIndexDate(dateSelected)];
    const [date, setDate] = useState(dateSelected);
    const [value, setValue] = useState(et ? et.text : "");
    const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "s" && (event.ctrlKey || event.metaKey)) {
            // do some saving
            // props.handleSave && props.handleSave(value);
            event.preventDefault();

            // remove test log when api called
            console.log("should save code");
        }
    };
    useEffect(() => {
        const et = entries[toIndexDate(dateSelected)];
        setValue(et ? et.text : "");
    }, [props.dateSelected]);

    useEffect(() => {
        contentChange(value);
    }, [value]);

    const weekdayDate = toLocaleWeekday(date);
    return (
        <div className="editor" onKeyDown={handleKeyDown}>
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