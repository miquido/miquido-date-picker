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
export var unselectDate = function (day) { return (__assign({}, day, { selected: false })); };
export var disableDay = function (day) { return (__assign({}, day, { disabled: true })); };
export var enableDay = function (day) { return (__assign({}, day, { disabled: false })); };
export var getDaysInMonth = function (monthIndex, year) {
    return new Date(year, monthIndex + 1, 0).getDate();
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
            itemIndex: i,
            date: new Date(year, month, i + 1)
        };
        dayObj.today = (i + 1) === now.getDate() && year === now.getFullYear() && month === now.getMonth();
        daysArray.push(Object.assign({}, dayObj));
    }
    return daysArray;
};
export var getFirstMondayIndex = function (monthIndex, year) {
    var date = new Date();
    date.setFullYear(year);
    date.setMonth(monthIndex);
    date.setDate(1);
    while (date.getDay() !== 1) {
        date.setDate(date.getDate() + 1);
    }
    return date.getDate();
};
export var getDayOfTheWeek = function (monthIndex, year) {
    var date = new Date();
    date.setFullYear(year);
    date.setMonth(monthIndex);
    date.setDate(1);
    if (date.getDay() === 0) {
        return 6;
    }
    return date.getDay() - 1;
};
export var defaultClassNameShouldBeOverwritten = function (theme, key) {
    return Boolean(theme && theme.hasOwnProperty(key) && theme[key]);
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
// @TODO is this function need or incompleate?  should it be renamed to single selection ?
export var assembleDate = function (startDay, endDay, monthIndex, year) {
    var _a;
    if (!startDay)
        return '';
    if (endDay) {
        if (startDay > endDay)
            _a = [endDay, startDay], startDay = _a[0], endDay = _a[1];
        var monthNumberFromIndex = monthIndex + 1;
        if (startDay === endDay) {
            var precedeZeroDay = '';
            var precedeZeroMonth = '';
            if (startDay < 10) {
                precedeZeroDay = '0';
            }
            if (monthNumberFromIndex < 10) {
                precedeZeroMonth = '0';
            }
            return "" + precedeZeroDay + startDay + "/" + precedeZeroMonth + monthNumberFromIndex + "/" + year;
        }
    }
    return '';
};
// @TODO add reversing dates if end is before start
export var assembleMultiSelectDate = function (startDate, endDate) {
    var startDay = startDate.getDate();
    var startMonth = startDate.getMonth() + 1;
    var startYear = startDate.getFullYear();
    var endDay = endDate.getDate();
    var endMonth = endDate.getMonth() + 1;
    var endYear = endDate.getFullYear();
    var precedeZeroDayStart = startDay < 10 ? '0' : '';
    var precedeZeroMonthStart = startMonth < 10 ? '0' : '';
    var precedeZeroDayEnd = endDay < 10 ? '0' : '';
    var precedeZeroMonthEnd = endMonth < 10 ? '0' : '';
    return ("" + precedeZeroDayStart + startDay + "/" + precedeZeroMonthStart + startMonth + "/" + startYear + "-" + precedeZeroDayEnd + endDay + "/" + precedeZeroMonthEnd + endMonth + "/" + endYear);
};
export var assembleDateForStartOnly = function (startDate) {
    var startDay = startDate.getDate();
    var startMonth = startDate.getMonth() + 1;
    var startYear = startDate.getFullYear();
    var precedeZeroDay = startDay < 10 ? '0' : '';
    var precedeZeroMonth = startMonth < 10 ? '0' : '';
    return "" + precedeZeroDay + startDay + "/" + precedeZeroMonth + startMonth + "/" + startYear;
};
export var assembleDateForEndOnly = function (endDate) {
    var endDay = endDate.getDate();
    var endMonth = endDate.getMonth() + 1;
    var endYear = endDate.getFullYear();
    var precedeZeroDay = endDay < 10 ? '0' : '';
    var precedeZeroMonth = endMonth < 10 ? '0' : '';
    return "" + precedeZeroDay + endDay + "/" + precedeZeroMonth + endMonth + "/" + endYear;
};
export var setRawStyles = function () {
    return cssRaw("\n.picker-enter {\n  opacity: 0.01;\n  transform: scale(0.9) translateY(50%);\n}\n.picker-enter-active {\n  opacity: 1;\n  transform: scale(1) translateY(0%);\n  transition: all 300ms ease-out;\n}\n.picker-exit {\n  opacity: 1;\n  transform: scale(1) translateY(0%);\n}\n.picker-exit-active {\n  opacity: 0.01;\n  transform: scale(0.9) translateY(50%);\n  transition: all 300ms ease-out;\n}\n");
};
export var checkVisibleCalendarForSelection = function (selectionCheck, displayedMonthIndex, displayedYear) {
    var start = selectionCheck.start, end = selectionCheck.end;
    var displayedStart = new Date(displayedYear, displayedMonthIndex, 1);
    // +1 to get next month then get last day from previous by setting day to 0
    var displayedEnd = new Date(displayedYear, displayedMonthIndex + 1, 0);
    if (!start || !end)
        return false;
    return (start.getTime() >= displayedStart.getTime() && (end.getTime()) <= displayedEnd.getTime());
};
export var getLastDayOfAMonth = function (year, monthIndex) {
    return new Date(year, monthIndex + 1, 0).getDate();
};
// const getMonthsToSelect = (start: number, end: number) => {
//   if (start === end) return 1
//   if (start > end) {
//     // end is in next year
//     return 12 - start + end
//   }
//   return Math.abs(start - end)
// }
export var isNumeric = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
export var charWasDeleted = function (previousStr, currentStr) {
    return currentStr < previousStr;
};
export var isValidaDayFormat = function (testValue, daysInMonth, pattern) {
    if (pattern === void 0) { pattern = 'DD'; }
    if (testValue.toString().length !== pattern.length || testValue.toString().length === 0)
        return false;
    if (!isNumeric(testValue))
        return false;
    return !(parseInt(testValue, 10) > daysInMonth || parseInt(testValue, 10) < 1);
};
export var isValidMonthFormat = function (testValue, pattern) {
    if (pattern === void 0) { pattern = 'MM'; }
    if (testValue.toString().length !== pattern.length)
        return false;
    if (!isNumeric(testValue))
        return false;
    return !(parseInt(testValue, 10) > 12 || parseInt(testValue, 10) < 1);
};
export var isValidYearFormat = function (testValue, pattern) {
    if (pattern === void 0) { pattern = 'YYYY'; }
    if (testValue.toString().length !== pattern.length)
        return false;
    return isNumeric(testValue);
};
export var isValidDate = function (date, pattern) {
    if (pattern === void 0) { pattern = 'DD/MM/YYYY'; }
    var separator = pattern.match(/\W/);
    var patternParts = pattern.split(separator[0]);
    var dateParts = date.split(separator);
    var dayIndex = patternParts.indexOf('DD');
    var monthIndex = patternParts.indexOf('MM');
    var yearIndex = patternParts.indexOf('YYYY');
    return (isValidaDayFormat(dateParts[dayIndex], getDaysInMonth(dateParts[monthIndex], dateParts[yearIndex])) &&
        isValidMonthFormat(dateParts[monthIndex]) &&
        isValidYearFormat(dateParts[yearIndex]));
};
export var replaceCharInText = function (position, text, replaceChar) {
    if (isNumeric(position) && position <= text.length) {
        return text.substring(0, position - 1) + replaceChar + text.substring(position);
    }
    return text;
};
export var checkIfDayIsNotAllowedForSelection = function (restrictions, checkDate) {
    if (restrictions) {
        if (restrictions.min && checkDate.getTime() <= restrictions.min.getTime())
            return true;
        if (restrictions.max && checkDate.getTime() >= restrictions.max.getTime())
            return true;
    }
    return false;
};
export var objectEquals = function (x, y) {
    if (x === null || x === undefined || y === null || y === undefined) {
        return x === y;
    }
    // after this just checking type of one would be enough
    if (x.constructor !== y.constructor) {
        return false;
    }
    // if they are functions, they should exactly refer to same one (because of closures)
    if (x instanceof Function) {
        return x === y;
    }
    // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
    if (x instanceof RegExp) {
        return x === y;
    }
    if (x === y || x.valueOf() === y.valueOf()) {
        return true;
    }
    if (Array.isArray(x) && x.length !== y.length) {
        return false;
    }
    // if they are dates, they must had equal valueOf
    if (x instanceof Date) {
        return false;
    }
    // if they are strictly equal, they both need to be object at least
    if (!(x instanceof Object)) {
        return false;
    }
    if (!(y instanceof Object)) {
        return false;
    }
    // recursive object equality check
    var p = Object.keys(x);
    return Object.keys(y).every(function (i) {
        return p.indexOf(i) !== -1;
    }) &&
        p.every(function (i) {
            return objectEquals(x[i], y[i]);
        });
};
export var checkIfYearIsAllowedToBeSelected = function (year, restrictions) {
    if (!restrictions)
        return true;
    if (restrictions.min && restrictions.max) {
        return restrictions.min.getFullYear() <= year && restrictions.max.getFullYear() >= year;
    }
    if (restrictions.min) {
        return restrictions.min.getFullYear() <= year;
    }
    if (restrictions.max) {
        return restrictions.max.getFullYear() >= year;
    }
    return true;
};
export var checkIfMonthIsAllowedToBeSelected = function (monthIndex, displayedYear, restrictions) {
    if (!restrictions)
        return true;
    var testDate = new Date(displayedYear, monthIndex, 1, 0, 0, 0, 0);
    if (restrictions.min) {
        var minRestrictionWithoutDays = new Date(restrictions.min);
        minRestrictionWithoutDays.setDate(1);
        minRestrictionWithoutDays.setHours(0, 0, 0, 0);
        if (testDate.valueOf() < minRestrictionWithoutDays.valueOf())
            return false;
    }
    if (restrictions.max) {
        var maxRestrictionWithoutDays = new Date(restrictions.max);
        maxRestrictionWithoutDays.setDate(1);
        maxRestrictionWithoutDays.setHours(0, 0, 0, 0);
        if (testDate.valueOf() >= maxRestrictionWithoutDays.valueOf())
            return false;
    }
    return true;
};
//# sourceMappingURL=functions.js.map