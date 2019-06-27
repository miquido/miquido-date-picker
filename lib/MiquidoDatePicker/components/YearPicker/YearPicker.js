import * as React from 'react';
import Year from '../Year/Year';
import { YearPickerWrapper } from './YearPicker.classname';
import { checkIfYearIsAllowedToBeSelected, getClassFor } from '../../functions';
var YearPicker = function (props) {
    var years = props.years.map(function (year, index) {
        var isAllowed = checkIfYearIsAllowedToBeSelected(year.name, props.restrictions);
        return (React.createElement(Year, { key: index, displayValue: "" + year.name, selected: year.selected, itemIndex: year.itemIndex, eventsHandlers: year.eventsHandlers, theme: props.theme, allowed: !!isAllowed }));
    });
    return (React.createElement("div", { className: getClassFor({ key: 'yearPicker', theme: props.theme, defaultClass: YearPickerWrapper }) }, years));
};
export default YearPicker;
//# sourceMappingURL=YearPicker.js.map