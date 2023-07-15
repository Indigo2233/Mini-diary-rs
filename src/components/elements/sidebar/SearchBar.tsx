import {XCircle} from "react-feather";
import {Moment} from "moment-timezone";
import React, {ChangeEvent, PureComponent, ReactNode} from "react";


import {createDate} from "../../../utils/dateFormat";
import {iconProps} from "../../../utils/icons";
import {SkipForward} from "react-feather";

export interface StateProps {
    dateSelected: Moment;
    searchKey: string;
}

export interface DispatchProps {
    search: (searchKey: string) => void;
    setDateSelected: (date: Moment) => void;
}

type Props = StateProps & DispatchProps;

interface State {
    newSearchKey: string;
}

export const SearchBar = (props: Props) => {
    var newSearchKey = props.searchKey;
    const {dateSelected} = props;
    const today = createDate();
    const isToday = dateSelected.isSame(today, "day");

    // @ts-ignore
    return (
        <div className="view-selector">
            <div className="search-input-wrapper">
                <input
                    type="search"
                    className="search-input"
                    placeholder={"search…"}
                    spellCheck={false}
                    value={newSearchKey}
                    // onChange={this.onChange}
                />
                {newSearchKey !== "" && (
                    <span className="search-input-clear">
							<button
                                type="button"
                                className="button button-invisible"
                                // onClick={this.clearSearchKey}
                            >
								<XCircle {...iconProps} title={"clear"}/>
							</button>
						</span>
                )}
            </div>
            <button
                type="button"
                className="button button-invisible button-today"
                disabled={isToday}
                // onClick={onTodaySelection}
            >
                <SkipForward {...iconProps} title={"today"}/>
            </button>
        </div>
    );
}

