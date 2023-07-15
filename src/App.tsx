import React from 'react';
import "./App.css";
import "react-mde/lib/styles/css/react-mde-all.css";
import {format} from 'date-fns';
import {DayPicker} from 'react-day-picker';
import 'react-day-picker/dist/style.css';

type Props = {}

export const App = (props: Props) => {
    const [selected, setSelected] = React.useState<Date>();

    let footer = <p>Please pick a day.</p>;
    if (selected) {
        footer = <p>You picked {format(selected, 'PP')}.</p>;
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
// export default App;
