import React, { PureComponent, ReactNode } from "react";

import {Calendar} from "./Calendar";
import {SearchBar} from "./SearchBar";
import {createDate} from "../../../utils/dateFormat";
import {SearchResults} from "./SearchResults";
// import SearchBarContainer from "../search-bar/SearchBarContainer";
// import SearchResultsContainer from "../search-results/SearchResultsContainer";


export interface StateProps {
    searchKey: string;
}

type Props = StateProps;

export const Sidebar = (props: Props) => {
    const { searchKey } = props;
    const date = createDate();
    return (
        <div className="sidebar">
            <SearchBar  dateSelected={date} search={null} searchKey={searchKey} setDateSelected={null}/>
            {searchKey === "" ? <Calendar /> : <SearchResults  dateSelected={date}/>}
        </div>
    );
}