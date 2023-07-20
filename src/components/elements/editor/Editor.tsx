import "draft-js/dist/Draft.css";

import {Moment} from "moment-timezone";
import React, {useEffect, useState} from "react";

import {createDate, toDateString, toIndexDate, toLocaleWeekday} from "../../../utils/dateFormat";
import ReactMde from "react-mde";
// @ts-ignore
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import "./styles.css"
import {Entries} from "../../../types";
import {invoke} from "@tauri-apps/api/tauri";


export interface StateProps {
    enableSpellcheck: boolean;
    hideTitles: boolean;
    dateSelected: Moment;
    entries: Entries;
    passwd: string;
}

export interface DispatchProps {
    // updateEntry: (entryDate: IndexDate, title: string, text: string) => void;
    // contentChange: (content: string) => void;
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

const saveEntry = async (entries: Entries, idxDate: string, passwd: string) => {
    await invoke('save_file', {index_date: idxDate, content: entries[idxDate]['text'], passwd: passwd})
}

export const Editor = (props: Props) => {
    const {dateSelected, entries, passwd} = props;
    const et = entries[toIndexDate(dateSelected)];
    const today = toDateString(createDate());
    const [date, setDate] = useState(dateSelected);
    const [value, setValue] = useState(et ? et.text : "");
    const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "s" && (event.ctrlKey || event.metaKey)) {
            // do some saving
            if (entries.hasOwnProperty(toIndexDate(date))) {
                saveEntry(entries, toIndexDate(date), passwd).then(_ => {
                },);
            }
            event.preventDefault();
            // remove test log when api called
            console.log("should save code");
        }
    };

    useEffect(() => {
        if (entries.hasOwnProperty(toIndexDate(date))) {
            saveEntry(entries, toIndexDate(date), passwd).then(_ => {
            });
        }
        const et = entries[toIndexDate(dateSelected)];
        setValue(et ? et.text : "");
        setDate(dateSelected);
    }, [props.dateSelected]);

    const edited = (val: string) => {
        setValue(val);
        const idxDate = toIndexDate(date);
        entries[idxDate] = {
            dateUpdated: today,
            text: val
        };
    }
    const weekdayDate = toLocaleWeekday(date);
    return (
        <div className="editor" onKeyDown={handleKeyDown}>
            <div>{weekdayDate}</div>
            <div hidden className="index-date">{toIndexDate(date)}</div>
            <ReactMde
                value={value}
                onChange={edited}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={markdown =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
            />
        </div>
    );
}