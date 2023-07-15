import React from "react";
import {DayPicker} from "react-day-picker";
import "react-day-picker/dist/style.css";

export interface StateProps {
    // allowFutureEntries: boolean;
    // dateSelected: Moment;
    // entries: Entries;
    // firstDayOfWeek: Weekday | null;
}

export interface DispatchProps {
    // setDateSelected: (date: Moment) => void;
}

type Props = StateProps & DispatchProps;

export const Calendar = (props: Props) => {
    const [selected, setSelected] = React.useState<Date>();

    let footer = <p>Please pick a day.</p>;
    if (selected) {
        footer = <p>You picked.</p>;
    }
    return (
        <DayPicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
            footer={footer}
        />
    );
}
