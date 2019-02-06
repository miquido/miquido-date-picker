import * as React from 'react';
import { headerDisplayedIcon, headerDisplayedMonth, headerDisplayedYear, monthSelectPicker, nextMonth, prevMonth, wrapperClass } from './HeaderMenu.classname';
import { getClassFor } from '../../functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
var HeaderMenu = function (props) {
    return (React.createElement("div", { className: getClassFor({ key: 'headerMenu', theme: props.theme, defaultClass: wrapperClass }) },
        React.createElement("div", { className: getClassFor({ key: 'prevMonthBtn', theme: props.theme, defaultClass: prevMonth }), onClick: props.prevMonth },
            React.createElement(FontAwesomeIcon, { icon: 'arrow-left', size: 'sm' })),
        React.createElement("div", { className: getClassFor({ key: 'monthSelectBtn', theme: props.theme, defaultClass: monthSelectPicker }) },
            React.createElement("span", { onClick: props.switchToMonthSelect, className: getClassFor({ key: 'headerDisplayedMonth', theme: props.theme, defaultClass: headerDisplayedMonth }) }, props.displayMonth),
            React.createElement("span", { onClick: props.switchToYearSelect, className: getClassFor({ key: 'headerDisplayedYear', theme: props.theme, defaultClass: headerDisplayedYear }) },
                props.displayYear,
                React.createElement(FontAwesomeIcon, { className: getClassFor({ key: 'headerDisplayedIcon', theme: props.theme, defaultClass: headerDisplayedIcon }), icon: 'caret-down', size: 'sm' }))),
        React.createElement("div", { className: getClassFor({ key: 'nextMonthBtn', theme: props.theme, defaultClass: nextMonth }), onClick: props.nextMonth },
            React.createElement(FontAwesomeIcon, { icon: 'arrow-right', size: 'sm' }))));
};
export default HeaderMenu;
//# sourceMappingURL=HeaderMenu.js.map