import * as React from 'react';
import { dayNames } from '../consts';
import { baseClass, itemClass } from './DaysHeader.classname';
import { getClassFor } from '../functions';
var DaysHeader = function (props) {
    var daysHeader = dayNames.map(function (day, index) {
        return React.createElement("div", { key: index, className: getClassFor({ key: 'daysHeaderItem', theme: props.theme, defaultClass: itemClass }) }, day);
    });
    return (React.createElement("div", { className: getClassFor({ key: 'daysHeaderWrapper', theme: props.theme, defaultClass: baseClass }) }, daysHeader));
};
export default DaysHeader;
//# sourceMappingURL=DaysHeader.js.map