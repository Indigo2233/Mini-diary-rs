import { Moment } from "moment-timezone";
import React, { PureComponent, ReactNode } from "react";

import { Entries } from "../../../types";
import { fromIndexDate, toDateString } from "../../../utils/dateFormat";
import Banner from "../general/Banner";

export interface StateProps {
    dateSelected: Moment;
    // entries: Entries;
    // searchResults: string[];
}

export interface DispatchProps {
    // setDateSelected: (date: Moment) => void;
}

type Props = StateProps & DispatchProps;


export const SearchResults = (props: Props) => {
    function generateSearchResults(props: Props):ReactNode[] {
        // const { dateSelected, entries, searchResults, setDateSelected } = props;
        return [];
        // return searchResults.reduce((r: ReactNode[], searchResult): ReactNode[] => {
        //     if (searchResult in entries) {
        //         // Create search result element if a corresponding diary entry exists
        //         // (When deleting a diary entry after a search, it is still part of the search results
        //         // until a new search is performed. That's why it needs to be filtered out here)
        //         const date = fromIndexDate(searchResult);
        //         const { title } = entries[searchResult];
        //         const isSelected = date.isSame(dateSelected, "day");
        //         r.push(
        //             <li key={searchResult} className="search-result">
        //                 <button
        //                     type="button"
        //                     className={`button ${isSelected ? "button-main" : ""}`}
        //                     onClick={(): void => setDateSelected(date)}
        //                 >
        //                     <p className="search-date text-faded">{toDateString(date)}</p>
        //                     <p className={`search-title ${!title ? "text-faded" : ""}`}>
        //                         {title || "no-title"}
        //                     </p>
        //                 </button>
        //             </li>,
        //         );
        //     }
        //     return r;
        // }, [])
    }

    const searchResultsEl = generateSearchResults(props);
    return (
        <ul className="search-results">
            {searchResultsEl.length === 0 ? (
                <Banner
                    bannerType="info"
                    message={"no-results"}
                    className="banner-no-results"
                />
            ) : (
                searchResultsEl
            )}
        </ul>
    );
}
