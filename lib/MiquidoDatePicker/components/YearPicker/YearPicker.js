import * as React from 'react';
import Year from '../Year/Year';
import { YearPickerWrapper } from './YearPicker.classname';
import { getClassFor } from '../../functions';
var YearPicker = function (props) {
    var years = props.years.map(function (year, index) {
        return (React.createElement(Year, { key: index, displayValue: year.name, selected: year.selected, itemIndex: year.itemIndex, eventsHandlers: year.eventsHandlers, theme: props.theme }));
    });
    return (React.createElement("div", { className: getClassFor({ key: 'yearPicker', theme: props.theme, defaultClass: YearPickerWrapper }) }, years));
};
export default YearPicker;
//# sourceMappingURL=YearPicker.js.map