import * as React from 'react';
import Month from '../Month/Month';
import { pickerDate } from './MonthPicker.classname';
import { getClassFor } from '../functions';
var PickMonth = function (props) {
    var monthsGrid = props.months.map(function (month, index) { return (React.createElement(Month, { key: index, itemIndex: month.itemIndex, displayValue: month.name, selected: month.selected, eventsHandlers: month.eventsHandlers, theme: props.theme })); });
    return (React.createElement("div", { className: getClassFor({ key: 'monthPicker', theme: props.theme, defaultClass: pickerDate }) }, monthsGrid));
};
export default PickMonth;
//# sourceMappingURL=MonthPicker.js.map