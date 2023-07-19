import React from "react";
import {DateFormatter, DayClickEventHandler, DayPicker} from "react-day-picker";
import {format} from "date-fns";
import "react-day-picker/dist/style.css";
import "./styles.css"
import moment, {Moment} from "moment-timezone";
import {MAX_DATE} from "../../../constants";

export interface StateProps {
    dateSelected: Moment;
    recordedDays: Date[];
}

export interface DispatchProps {
    setDateSelected: (date: Moment) => void;
}

type Props = StateProps & DispatchProps;
const seasonEmoji: Record<string, string> = {
    winter: '⛄️',
    spring: '🌸',
    summer: '🌻',
    autumn: '🍂'
};

const getSeason = (month: Date): string => {
    const monthNumber = month.getMonth();
    if (monthNumber >= 0 && monthNumber < 3) return 'winter';
    if (monthNumber >= 3 && monthNumber < 6) return 'spring';
    if (monthNumber >= 6 && monthNumber < 9) return 'summer';
    else return 'autumn';
};
const formatCaption: DateFormatter = (month, options) => {
    const season = getSeason(month);
    return (
        <>
      <span role="img" aria-label={season}>
        {seasonEmoji[season]}
      </span>{' '}
            {format(month, 'LLLL', {locale: options?.locale})}
        </>
    );
};

const bookedStyle = { color: '#006abb', fontWeight: "bold"};
const selectedStyle = {color: '#F3F3F3', backgroundColor: '#006abb'};
export const Calendar = (props: Props) => {
    const today = new Date();
    const tomorrow = new Date(today.setDate(today.getDate() + 1));
    const {setDateSelected, recordedDays} = props;
    const selected = props.dateSelected.toDate();
    const disabledDays = [
        {from: tomorrow, to: MAX_DATE.toDate()}
    ];

    return (
        <DayPicker
            mode="single"
            required
            selected={selected}
            onSelect={s =>  setDateSelected(moment(s))}
            modifiers={{ booked: recordedDays }}
            modifiersStyles={{ booked: bookedStyle, selected:  selectedStyle}}
            showOutsideDays fixedWeeks
            formatters={{formatCaption}}
            disabled={disabledDays}
        />
    );
}
