import * as React from 'react';
import Day from '../Day/Day';
import { pickerDate } from './DayPicker.classname';
import { checkIfDayIsNotAllowedForSelection, getClassFor, getDaysInMonth } from '../../functions';
var PickDay = function (props) {
    var pickedDate = props.selection || false;
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var previousMonthDays = [];
    var nextMonthDays = [];
    var daysInPrevMonth = props.selectedMonthIndex === 0 ?
        new Date(props.selectedYear - 1, 11, 0).getDate()
        :
            new Date(props.selectedYear, props.selectedMonthIndex, 0).getDate();
    for (var i = 0; i < props.pastDaysAmount; i++) {
        previousMonthDays.push(React.createElement(Day, { key: "previous-" + i, displayValue: (daysInPrevMonth - i).toString(), itemIndex: (i + 1) * -1, disabled: true, theme: props.theme }));
    }
    var numberOfDaysInMonth = getDaysInMonth(props.selectedMonthIndex, props.selectedYear);
    var currentMonthDays = Array.from(new Array(numberOfDaysInMonth), function (value, index) {
        var dayDate = new Date(props.selectedYear, props.selectedMonthIndex, index + 1);
        return React.createElement(Day, { key: "current-" + index, displayValue: (index + 1).toString(), selected: false, disabled: checkIfDayIsNotAllowedForSelection(props.restrictions, dayDate), start: Boolean(pickedDate && dayDate.getTime() === pickedDate.getTime()), end: Boolean(pickedDate && dayDate.getTime() === pickedDate.getTime()), today: Boolean(dayDate.getTime() === today.getTime()), eventsHandlers: props.eventsHandlers, itemIndex: index, theme: props.theme });
    });
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