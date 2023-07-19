import React, {useState} from "react";

import {Calendar} from "./Calendar";
import {SearchBar} from "./SearchBar";
import {createDate, fromIndexDate, toIndexDate} from "../../../utils/dateFormat";
import {SearchResults} from "./SearchResults";
import {Moment} from "moment-timezone";
import {Entries} from "../../../types";

export interface StateProps {
    entries: Entries
}

export interface DispatchProps {
    setDiaryDate: (date: Moment) => void;
}

type Props = StateProps & DispatchProps;


export const Sidebar = (props: Props) => {
    const {setDiaryDate, entries} = props;
    const [date, setDate] = useState(createDate());
    // const [searchKey, setSearchKey] = useState("")
    const [SSD, setSSD] = useState(false);
    const [searchRes, setSearchRes] = useState<string[]>([]);
    const searchSD = () => {
        if (!SSD) {
            const res: string[] = [];
            const d = toIndexDate(date).slice(5);
            for (const entriesKey in entries) {
                console.log(entriesKey);
                if (entriesKey.slice(5) === d) {
                    res.push(entriesKey);
                }
            }
            console.log(res)
            setSearchRes(res);
        } else {
            setSearchRes([]);
        }
        setSSD(prevState => !prevState);
    }
    const setDD = (date: Moment) => {
        setDate(date);
        setDiaryDate(date);
    }

    const recordedDays: Date[] = [];
    for (const keys in entries) {
        if (entries[keys].text.length > 0 && keys !== toIndexDate(date)) {
            recordedDays.push(fromIndexDate(keys).toDate());
            console.log(1234);
        }
    }

    console.log(entries, 1234);
    return (
        <div className="sidebar">
            <SearchBar dateSelected={date} search={searchSD} setDateSelected={setDD}/>
            {!SSD ? <Calendar setDateSelected={setDD} dateSelected={date} recordedDays={recordedDays}/> :
                <SearchResults entries={entries} dateSelected={date} setDateSelected={setDD}
                               searchResults={searchRes}/>}
        </div>
    );
}



