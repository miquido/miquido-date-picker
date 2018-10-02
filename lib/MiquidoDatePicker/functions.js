var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { cssRaw } from 'typestyle';
export var selectDate = function (day) { return (__assign({}, day, { selected: true })); };
export var unselectDate = function (day) {
    var selectedObj = day;
    selectedObj.selected = false;
    return selectedObj;
};
export var getDaysInMonth = function (month, year) {
    return new Date(year, month + 1, 0).getDate();
};
export var generateCalendar = function (month, year) {
    var now = new Date();
    var daysInMonth = getDaysInMonth(month, year);
    var daysArray = [];
    for (var i = 0; i < daysInMonth; i++) {
        var dayObj = {
            displayValue: i + 1,
            selected: false,
            today: false,
            start: false,
            end: false,
            itemIndex: i
        };
        dayObj.today = (i + 1) === now.getDate() && year === now.getFullYear() && month === now.getMonth();
        daysArray.push(Object.assign({}, dayObj));
    }
    return daysArray;
};
export var getFirstMondayIndex = function (month, year) {
    return new Date(year, month, 0).getDay();
};
export var defaultClassNameShouldBeOverwritten = function (theme, key) {
    return theme && theme.hasOwnProperty(key) && theme[key];
};
export var getClassFor = function (args) {
    var key = args.key, theme = args.theme, defaultClass = args.defaultClass;
    if (theme && defaultClassNameShouldBeOverwritten(theme, key)) {
        return theme[key];
    }
    else {
        return defaultClass;
    }
};
export var getDisplayValue = function (days, index) {
    return days[index] && days[index].displayValue;
};
export var asembleDate = function (startDay, endDay, monthIndex, year, daysArray) {
    var _a;
    if (startDay > endDay)
        _a = [endDay, startDay], startDay = _a[0], endDay = _a[1];
    var monthNumberFromIndex = monthIndex + 1;
    if (startDay === endDay) {
        return year + "/" + monthNumberFromIndex + "/" + getDisplayValue(daysArray, startDay);
    }
    return getDisplayValue(daysArray, startDay) + " - " + getDisplayValue(daysArray, endDay)
        + ("/" + monthNumberFromIndex + "/" + year);
};
export var setRawStyles = function () {
    return cssRaw("\n.picker-enter {\n  opacity: 0.01;\n  transform: scale(0.9) translateY(50%);\n}\n.picker-enter-active {\n  opacity: 1;\n  transform: scale(1) translateY(0%);\n  transition: all 300ms ease-out;\n}\n.picker-exit {\n  opacity: 1;\n  transform: scale(1) translateY(0%);\n}\n.picker-exit-active {\n  opacity: 0.01;\n  transform: scale(0.9) translateY(50%);\n  transition: all 300ms ease-out;\n}\n");
};
//# sourceMappingURL=functions.js.map