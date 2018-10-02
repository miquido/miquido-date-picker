import * as React from 'react';
import { monthSelectPicker, nextMonth, prevMonth, wrapperClass } from './HeaderMenu.classname';
import { getClassFor } from '../functions';
var HeaderMenu = function (props) {
    return (React.createElement("div", { className: getClassFor({ key: 'headerMenu', theme: props.theme, defaultClass: wrapperClass }) },
        React.createElement("div", { className: getClassFor({ key: 'prevMonthBtn', theme: props.theme, defaultClass: prevMonth }), onClick: props.prevMonth }, "\u00A0"),
        React.createElement("div", { className: getClassFor({ key: 'monthSelectBtn', theme: props.theme, defaultClass: monthSelectPicker }) },
            React.createElement("span", { onClick: props.switchToMonthSelect }, props.displayMonth),
            "\u00A0",
            React.createElement("span", { onClick: props.switchToYearSelect }, props.displayYear)),
        React.createElement("div", { className: getClassFor({ key: 'nextMonthBtn', theme: props.theme, defaultClass: nextMonth }), onClick: props.nextMonth }, "\u00A0")));
};
export default HeaderMenu;
//# sourceMappingURL=HeaderMenu.js.map