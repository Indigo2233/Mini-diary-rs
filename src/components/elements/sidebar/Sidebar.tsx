import React, {PureComponent, ReactNode, useState} from "react";

import {Calendar} from "./Calendar";
import {SearchBar} from "./SearchBar";
import {createDate} from "../../../utils/dateFormat";
import {SearchResults} from "./SearchResults";
import moment, {Moment} from "moment-timezone";
// import SearchBarContainer from "../search-bar/SearchBarContainer";
// import SearchResultsContainer from "../search-results/SearchResultsContainer";


export interface StateProps {
    searchKey: string;
}

type Props = StateProps;


export const Sidebar = (props: Props) => {
    const [date, setDate] = useState(createDate());
    const [searchKey, setSearchKey] = useState("")
    const search = (key: string) => {
        setSearchKey(key);
    }
    const setDateSelected = (date: Moment) => {
        setDate(date);
    }

    return (
        <div className="sidebar">
            <SearchBar  dateSelected={date} search={search} setDateSelected={setDateSelected}/>
            {searchKey === "" ? <Calendar dateSelected={date} /> : <SearchResults  dateSelected={date}/>}
        </div>
    );
}