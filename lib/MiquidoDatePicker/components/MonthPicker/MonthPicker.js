import * as React from 'react';
import Month from '../Month/Month';
import { pickerDate } from './MonthPicker.classname';
import { checkIfMonthIsAllowedToBeSelected, getClassFor } from '../../functions';
var PickMonth = function (props) {
    var monthsGrid = props.months.map(function (month, index) {
        var isAllowed = checkIfMonthIsAllowedToBeSelected(month.itemIndex, props.displayedYear, props.restrictions);
        return React.createElement(Month, { key: index, itemIndex: month.itemIndex, displayValue: month.name, selected: month.selected, eventsHandlers: month.eventsHandlers, theme: props.theme, allowed: !!isAllowed });
    });
    return (React.createElement("div", { className: getClassFor({ key: 'monthPicker', theme: props.theme, defaultClass: pickerDate }) }, monthsGrid));
};
export default PickMonth;
//# sourceMappingURL=MonthPicker.js.map