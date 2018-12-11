import * as React from 'react';
import Day from '../Day/Day';
import { pickerDate } from './DayPicker.classname';
import { getClassFor } from '../functions';
var PickDay = function (props) {
    var previousMonthDays = [];
    var nextMonthDays = [];
    var daysInPrevMonth = props.selectedMonthIndex === 0 ?
        new Date(props.selectedYear - 1, 11, 0).getDate()
        :
            new Date(props.selectedYear, props.selectedMonthIndex, 0).getDate();
    for (var i = 0; i < props.pastDaysAmount; i++) {
        previousMonthDays.push(React.createElement(Day, { key: "previous-" + i, displayValue: (daysInPrevMonth - i).toString(), itemIndex: (i + 1) * -1, disabled: true, theme: props.theme }));
    }
    var currentMonthDays = props.days.map(function (value, index) { return (React.createElement(Day, { key: "current-" + index, displayValue: value.displayValue, selected: value.selected, disabled: value.disabled, start: value.start, end: value.end, today: value.today, eventsHandlers: props.eventsHandlers, itemIndex: index, theme: props.theme })); });
    if ((previousMonthDays.length + currentMonthDays.length) % 7 !== 0) {
        var i = 0;
        while ((previousMonthDays.length + currentMonthDays.length + nextMonthDays.length) % 7 !== 0) {
            i++;
            nextMonthDays.push(React.createElement(Day, { key: "next-" + i, displayValue: i.toString(), itemIndex: i * -1, disabled: true, theme: props.theme }));
        }
    }
    var daysGrid = previousMonthDays.reverse().concat(currentMonthDays, nextMonthDays);
    return (React.createElement("div", { className: getClassFor({ key: 'dayPicker', theme: props.theme, defaultClass: pickerDate }) }, daysGrid));
};
export default PickDay;
//# sourceMappingURL=DayPicker.js.map