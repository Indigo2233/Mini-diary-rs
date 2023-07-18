import React, {PureComponent, ReactNode, useState} from "react";

import {Calendar} from "./Calendar";
import {SearchBar} from "./SearchBar";
import {createDate} from "../../../utils/dateFormat";
import {SearchResults} from "./SearchResults";
import moment, {Moment} from "moment-timezone";
// import SearchBarContainer from "../search-bar/SearchBarContainer";
// import SearchResultsContainer from "../search-results/SearchResultsContainer";


export interface StateProps {
}

export interface DispatchProps {
    setDiaryDate: (date: Moment) => void;
}
type Props = StateProps & DispatchProps;


export const Sidebar = (props: Props) => {
    const {setDiaryDate} = props;
    const [date, setDate] = useState(createDate());
    const [searchKey, setSearchKey] = useState("")
    const search = (key: string) => {
        setSearchKey(key);
    }
    const setDateSelected = (dt: Moment) => {
        setDate(dt);
    }
    return (
        <div className="sidebar">
            <SearchBar  dateSelected={date} search={search} setDateSelected={setDateSelected}/>
            {searchKey === "" ? <Calendar setDateSelected={setDiaryDate} dateSelected={date} /> : <SearchResults  dateSelected={date}/>}
        </div>
    );
}