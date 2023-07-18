import React, {useEffect} from "react";
import {DateFormatter, DayPicker} from "react-day-picker";
import {format} from "date-fns";
import "react-day-picker/dist/style.css";
import "./styles.css"
import moment, {Moment} from "moment-timezone";

export interface StateProps {
    // allowFutureEntries: boolean;
    dateSelected: Moment;
    // entries: Entries;
    // firstDayOfWeek: Weekday | null;
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
export const Calendar = (props: Props) => {
    const today = new Date();
    const {setDateSelected} = props;
    const [selected, setSelected] = React.useState<Date | undefined>(today);

    useEffect(() => {
        setDateSelected(moment(selected));
    }, [selected])
    const footer = selected ? (
        <p>You selected {format(selected, 'PPP')}.</p>
    ) : (
        <p>Please pick a day.</p>
    );

    return (
        <DayPicker
            mode="single"
            required
            selected={selected}
            onSelect={setSelected}
            footer={footer}
            showOutsideDays fixedWeeks
            formatters={{formatCaption}}
        />
    );
}
