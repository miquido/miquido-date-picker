var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
import HeaderMenu from './HeaderMenu/HeaderMenu';
import YearPicker from './YearPicker/YearPicker';
import MonthPicker from './MonthPicker/MonthPicker';
import DaysHeader from './DaysHeader/DaysHeader';
import PickDay from './DayPicker/DayPicker';
import FooterMenu from './FooterMenu/FooterMenu';
import { pickingOptions } from './enums';
import { monthNames, yearsDisplayedPerScreen, animationDuration } from './consts';
import { assembleDate, assembleDateForEndOnly, assembleDateForStartOnly, assembleMultiSelectDate, charWasDeleted, checkVisibleCalendarForSelection, disableDay, enableDay, generateCalendar, getClassFor, getFirstMondayIndex, getLastDayOfAMonth, isNumeric, isValidDate, replaceCharInText, selectDate, setRawStyles, unselectDate } from './functions';
import { picker, pickerWrapper } from './MiquidoDatePicker.classname';
import { defaultTheme } from '../themes/default/default_theme';
import { CSSTransition } from 'react-transition-group';
var MiquidoDatePicker = /** @class */ (function (_super) {
    __extends(MiquidoDatePicker, _super);
    function MiquidoDatePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.now = new Date();
        _this.currentMonth = _this.now.getMonth();
        _this.theme = {};
        _this.inputClass = '';
        _this.userSavedDate = false;
        /**
         * Supports mouse over on days
         * if user selected start date also select days
         *
         * @param index index of a day
         */
        _this.mouseOverHandler = function (index) {
            if (!_this.props.singleSelection) {
                var start = _this.state.selectionStart;
                var end = _this.state.selectionEnd;
                if (start === undefined || end || end === 0)
                    return;
                var newSelection = _this.selectBetweenTwoDays(start, index + 1);
                _this.setState({
                    daysArray: newSelection, selectedDate: __assign({}, _this.state.selectedDate, { start: new Date(_this.state.displayedYear, _this.state.displayedMonthIndex, start), end: new Date(_this.state.displayedYear, _this.state.displayedMonthIndex, index + 1) })
                });
            }
        };
        /**
         * Supports click on days
         *
         * @param index index of a day
         */
        _this.clickHandler = function (index) {
            _this.setState({ userSelectedDaysBefore: true });
            if (_this.props.singleSelection) {
                _this.handleSingleSelection(index);
            }
            else {
                _this.handleMultiSelection(index);
            }
        };
        /**
         * Supports click outside picker
         */
        _this.clickOutsideHandler = function (e) {
            if (!_this.node.current || !_this.node.current.contains(e.target)) {
                _this.closePicker();
            }
        };
        /**
         * Supports mouse down on days
         *
         * @param index index of a day
         */
        _this.mouseDownHandler = function (index) {
            // window.document.addEventListener('mouseup', this._onMouseUp)
        };
        /**
         * Supports mouse up on days
         *
         * @param index index of a day
         */
        _this.mouseUpHandler = function (index) {
            // window.document.removeEventListener('mouseup', this._onMouseUp)
        };
        /**
         * Get array of month objects
         *
         * @return array of month objects
         */
        _this.getMonths = function () {
            return monthNames.map(function (monthName, index) {
                return {
                    name: monthName,
                    itemIndex: index,
                    selected: _this.state.displayedMonth === monthName,
                    eventsHandlers: _this.monthEventsHandlers,
                    theme: _this.theme
                };
            });
        };
        /**
         * Get array of year objects
         *
         * @return array of year objects
         */
        _this.getYears = function (firstYear) {
            var years = [];
            for (var i = 0; i < yearsDisplayedPerScreen; i++) {
                var year = firstYear + i;
                years.push({
                    name: year,
                    selected: _this.state.displayedYear === year,
                    eventsHandlers: _this.yearEventsHandlers,
                    itemIndex: i
                });
            }
            return years;
        };
        /**
         * Supports mouse up event
         * detects if mouse up was on picker or outside ( and close it if so )
         *
         * @param e event listener object
         */
        _this._onMouseUp = function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (!_this.node.current || !_this.node.current.contains(e.target)) {
                _this.closePicker();
            }
        };
        _this.eventsHandlers = {
            mouseUpHandler: _this.mouseUpHandler.bind(_this),
            mouseDownHandler: _this.mouseDownHandler.bind(_this),
            mouseOverHandler: _this.mouseOverHandler.bind(_this),
            clickHandler: _this.clickHandler.bind(_this)
        };
        _this.yearEventsHandlers = {
            clickHandler: _this.yearClickHandler.bind(_this)
        };
        _this.monthEventsHandlers = {
            clickHandler: _this.monthClickHandler.bind(_this)
        };
        _this.state = {
            isPickerVisible: false,
            currentlyPicking: pickingOptions.DAY,
            selectionStart: undefined,
            selectionEnd: undefined,
            selectMethod: undefined,
            daysArray: [],
            displayedMonth: _this.getMonthName(_this.getInitialMonth()),
            displayedMonthIndex: _this.getInitialMonth(),
            displayedYear: _this.getInitialYear(),
            defaultValue: props.defaultValue,
            inputValue: '',
            userSelectedDaysBefore: !!_this.props.defaultValue,
            yearsList: [],
            selectedDate: _this.getDefaultValue(),
            disabled: !!props.disabled
        };
        _this.theme = props.theme || defaultTheme;
        _this.node = React.createRef();
        _this.positionStyles = {};
        _this.monthsList = _this.getMonths();
        if (props.inputClass)
            _this.inputClass = props.inputClass;
        _this.switchToYearSelect = _this.switchToYearSelect.bind(_this);
        _this.switchToMonthSelect = _this.switchToMonthSelect.bind(_this);
        _this.nextMonth = _this.nextMonth.bind(_this);
        _this.prevMonth = _this.prevMonth.bind(_this);
        _this.showPicker = _this.props.children ? _this.showPicker.bind(_this, _this.props.children.props) : _this.showPicker.bind(_this);
        _this.handleChange = _this.props.children ? _this.handleChange.bind(_this, _this.props.children.props) : _this.handleChange.bind(_this);
        _this.clearSelection = _this.clearSelection.bind(_this);
        _this.saveSelection = _this.saveSelection.bind(_this);
        _this.closePicker = _this.closePicker.bind(_this);
        return _this;
    }
    MiquidoDatePicker.prototype.getDefaultValue = function () {
        var _a;
        var defaultValue = this.props.defaultValue;
        if (defaultValue && defaultValue.end && (defaultValue.start.getTime() > defaultValue.end.getTime())) {
            _a = [defaultValue.end, defaultValue.start], defaultValue.start = _a[0], defaultValue.end = _a[1];
        }
        return defaultValue || { start: null, end: null, display: this.now };
    };
    MiquidoDatePicker.prototype.getInitialMonth = function () {
        return (this.props.defaultValue && this.props.defaultValue.display.getMonth()) || this.currentMonth;
    };
    MiquidoDatePicker.prototype.getInitialYear = function () {
        return (this.props.defaultValue && this.props.defaultValue.display.getFullYear()) || this.now.getFullYear();
    };
    /**
     * Get month name from array
     *
     * @param index index of month from 0 to 11
     */
    MiquidoDatePicker.prototype.getMonthName = function (index) {
        if (!Number.isInteger(index)) {
            return monthNames[this.now.getMonth() + 1];
        }
        else {
            return monthNames[index];
        }
    };
    MiquidoDatePicker.prototype.componentWillMount = function () {
        setRawStyles();
        if (this.props.defaultValue) {
            this.currentMonth = this.props.defaultValue.display.getMonth();
            this.setState({
                inputValue: this.setDefaultDate(this.props.defaultValue),
                defaultValue: this.props.defaultValue
            });
        }
        if (this.props.restrictions) {
            if (this.state.defaultValue && (this.props.restrictions && this.props.restrictions.min && (this.props.restrictions.min > this.state.defaultValue.start))) {
                try {
                    throw new Error("Default date can't be lower than min allowed date");
                }
                catch (e) {
                    console.error(e);
                }
            }
        }
        if (this.state.defaultValue &&
            this.props.singleSelection &&
            (this.state.defaultValue.start.getTime() !== (this.state.defaultValue.end && this.state.defaultValue.end.getTime()))) {
            try {
                throw new Error("Start and End should be the same for single selection");
            }
            catch (e) {
                console.error(e);
            }
        }
        if (this.props.open) {
            this.showPicker();
        }
    };
    MiquidoDatePicker.prototype.componentWillUnmount = function () {
        document.removeEventListener('mousedown', this._onMouseUp, false);
    };
    MiquidoDatePicker.prototype.componentWillUpdate = function (newProps) {
        if (!Object.is(this.state.defaultValue, newProps.defaultValue)) {
            var newDefault = newProps.defaultValue;
            var newInputValue = this.setDefaultDate(newDefault) ? this.setDefaultDate(newDefault) : '';
            this.currentMonth = newDefault.display.getMonth();
            var newState = {
                defaultValue: newDefault, inputValue: newInputValue,
                selectionStart: newDefault.start.getDate(),
                selectedDate: __assign({}, this.state.selectedDate, { start: newDefault.start })
            };
            this.setState(newState);
            void this.init();
        }
        if (newProps.disabled !== undefined && this.state.disabled !== newProps.disabled) {
            this.setState({ disabled: newProps.disabled });
        }
        if (newProps.open && !this.state.isPickerVisible && !this.userSavedDate) {
            this.showPicker();
        }
    };
    MiquidoDatePicker.prototype.componentDidMount = function () {
        void this.init();
    };
    MiquidoDatePicker.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var defValue, selectedDate, display;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setCalendarPosition(this.node.current.getBoundingClientRect());
                        return [4 /*yield*/, this.initDaysCalendar(this.currentMonth, this.getInitialYear())];
                    case 1:
                        _a.sent();
                        if (this.props.restrictions) {
                            this.setState({
                                daysArray: this.setRestrictions(this.props.restrictions, this.state.daysArray)
                            });
                        }
                        if (this.state.defaultValue) {
                            defValue = { selectionStart: this.state.defaultValue.start.getDate() };
                            if (this.state.defaultValue.end) {
                                defValue['selectionEnd'] = this.state.defaultValue.end.getDate();
                            }
                            this.setState(defValue);
                        }
                        if (this.state.selectedDate && this.state.selectedDate.display) {
                            selectedDate = this.state.selectedDate;
                            display = selectedDate.display;
                            if ((selectedDate.start && selectedDate.start.getTime()) !== (selectedDate.end && selectedDate.end.getTime())) {
                                this.setMultiMonthSelection(display.getFullYear(), display.getMonth());
                            }
                            else {
                                this.setSingleMonthSelection();
                            }
                        }
                        this.setState({ yearsList: this.getYears(this.getInitialYear()) });
                        return [2 /*return*/];
                }
            });
        });
    };
    MiquidoDatePicker.prototype.setCalendarPosition = function (bcr) {
        this.positionStyles = {};
        if (bcr.x > (window.innerWidth / 2)) {
            this.positionStyles.right = 0;
        }
        else {
            this.positionStyles.left = 0;
        }
        if (bcr.y > (window.innerHeight / 2)) {
            this.positionStyles.bottom = bcr.height + 'px';
        }
        else {
            this.positionStyles.top = bcr.height + 'px';
        }
    };
    /**
     * Init calendar on given month and year
     *
     * @param month index of month from 0 to 11
     * @param year year number eg 2018
     */
    MiquidoDatePicker.prototype.initDaysCalendar = function (month, year) {
        return __awaiter(this, void 0, void 0, function () {
            var calendarInit;
            return __generator(this, function (_a) {
                calendarInit = generateCalendar(month, year);
                this.setState({ daysArray: calendarInit });
                return [2 /*return*/];
            });
        });
    };
    /**
     * Supports single day selection
     *
     * @param index index of a day
     */
    MiquidoDatePicker.prototype.handleSingleSelection = function (index) {
        var daysArray = this.state.daysArray;
        var newDaysObjArray = daysArray.slice();
        this.clearSelection();
        newDaysObjArray[index].start = true;
        this.setState({ selectionStart: index, selectionEnd: index, daysArray: newDaysObjArray });
        this.saveSelection(index);
    };
    /**
     * Supports range selection
     *
     * @param index index of a day
     */
    MiquidoDatePicker.prototype.handleMultiSelection = function (index) {
        var _a = this.state, daysArray = _a.daysArray, selectionStart = _a.selectionStart;
        if (this.isStartSelected()) {
            // start point is set
            if (this.isEndSelected()) {
                // whole range is selected - user want to select again
                this.clearSelection();
                this.setState({ selectionStart: index, selectionEnd: undefined });
            }
            else {
                var newSelection = this.selectBetweenTwoDays(selectionStart, index + 1);
                this.setState({
                    selectionStart: selectionStart, selectionEnd: index, daysArray: newSelection,
                    selectedDate: __assign({}, this.state.selectedDate, { end: new Date(this.state.displayedYear, this.state.displayedMonthIndex, index) })
                });
            }
        }
        else {
            // start point is NOT set
            this.clearSelection();
            var newDaysObjArray = daysArray.slice();
            newDaysObjArray[index].start = true;
            this.setState({ selectionStart: index, selectionEnd: undefined, daysArray: newDaysObjArray });
        }
    };
    /**
     * Set picking restrictions
     *
     */
    MiquidoDatePicker.prototype.setRestrictions = function (restrictions, daysArray) {
        var _this = this;
        var min = restrictions.min;
        var max = restrictions.max;
        return daysArray.map(function (day) {
            var selectedDate = new Date(_this.state.displayedYear, _this.state.displayedMonthIndex, day.itemIndex);
            if ((min && selectedDate < min) || (max && selectedDate > max)) {
                return disableDay(day);
            }
            else {
                return enableDay(day);
            }
        });
    };
    /**
     * Select between two given points
     *
     * @param start index of a day
     * @param end index of a day
     * @param containsStart optional boolean that determine if starting point should be selected
     * @param containsEnd optional boolean that determine if ending point should be selected
     */
    MiquidoDatePicker.prototype.selectBetweenTwoDays = function (start, end, containsStart, containsEnd) {
        if (containsStart === void 0) { containsStart = true; }
        if (containsEnd === void 0) { containsEnd = true; }
        var daysArray = this.state.daysArray;
        return daysArray.map(function (day) {
            if (day.displayValue === end && containsEnd) {
                day.end = true;
            }
            else if (day.displayValue === start && containsStart) {
                day.start = true;
            }
            else {
                day.start = false;
                day.end = false;
            }
            if (day.displayValue <= end && day.displayValue >= start) {
                return selectDate(day);
            }
            else if (day.displayValue >= end && day.displayValue < start) {
                return selectDate(day);
            }
            else {
                return unselectDate(day);
            }
        });
    };
    /**
     * Condition check if selection began
     *
     */
    MiquidoDatePicker.prototype.isStartSelected = function () {
        return this.state.selectionStart !== undefined;
    };
    /**
     * Condition check if selection end
     *
     */
    MiquidoDatePicker.prototype.isEndSelected = function () {
        return this.state.selectionEnd !== undefined;
    };
    /**
     * Clear selected days
     *
     */
    MiquidoDatePicker.prototype.clearSelection = function () {
        var days = this.state.daysArray.map(function (day) {
            day.selected = false;
            day.end = false;
            day.start = false;
            return day;
        });
        this.setState({ daysArray: days, selectionStart: undefined, selectionEnd: undefined });
    };
    /**
     * Save selection
     *
     */
    MiquidoDatePicker.prototype.saveSelection = function (singleIndex, shouldClosePicker) {
        if (shouldClosePicker === void 0) { shouldClosePicker = true; }
        var value = '';
        var valueObj = {};
        var start = this.state.selectionStart;
        var end = this.state.selectionEnd;
        var month = this.state.displayedMonthIndex;
        var year = this.state.displayedYear;
        if ((!singleIndex && singleIndex !== 0) || !Number.isInteger(singleIndex)) {
            if ((!start && start !== 0) || (!end && end !== 0))
                return;
            if (this.props.showOnlyEnd) {
                value = assembleDateForEndOnly(this.state.selectedDate.end);
            }
            else {
                value = assembleMultiSelectDate(this.state.selectedDate.start, this.state.selectedDate.end);
            }
            valueObj = {
                start: start + 1,
                end: end + 1,
                month: month,
                year: year,
                date: {
                    start: new Date(year, month, start + 1),
                    end: new Date(year, month, end + 1)
                },
                inputValue: value
            };
        }
        else {
            value = assembleDate(singleIndex + 1, singleIndex + 1, month, year);
            valueObj = {
                start: singleIndex + 1,
                end: singleIndex + 1,
                month: month + 1,
                year: year,
                date: new Date(year, month, singleIndex + 1),
                inputValue: value
            };
        }
        if (this.props.onSelect) {
            this.props.onSelect(valueObj);
        }
        else {
            console.log('picker value');
            this.setState({ inputValue: value });
        }
        if (shouldClosePicker) {
            this.closePicker();
        }
        this.userSavedDate = true;
    };
    /**
     * Supports input value change
     *
     * @param event event object
     */
    MiquidoDatePicker.prototype.handleChange = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var element, caret, typedDaysAbove30, typedValue, lastTypedCharacter, maxLength, newValue, patternDaysMonths, isCorrectDaysAndMonths, dateArray, newDay, newMonth, newYear, newDate, daysArray, newDaysObjArray;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        element = event.target;
                        caret = element.selectionStart;
                        typedDaysAbove30 = false;
                        window.requestAnimationFrame(function () {
                            element.selectionStart = caret;
                            element.selectionEnd = caret;
                        });
                        typedValue = element.value;
                        lastTypedCharacter = typedValue[typedValue.length - 1];
                        maxLength = this.props.singleSelection ? 10 : 30;
                        if (typedValue.length >= maxLength) {
                            if (typedValue[element.selectionEnd] !== '/') {
                                typedValue = replaceCharInText(element.selectionStart, this.state.inputValue, typedValue[element.selectionEnd - 1]);
                                if (element.selectionStart && parseInt(typedValue.substring(0, 2), 10) > 31) {
                                    typedValue = typedValue.substring(0, 1) + typedValue.substring(2, typedValue.length);
                                    typedDaysAbove30 = true;
                                }
                            }
                            else {
                                window.requestAnimationFrame(function () {
                                    element.selectionStart = caret + 1;
                                    element.selectionEnd = caret + 1;
                                });
                            }
                        }
                        newValue = '';
                        patternDaysMonths = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))$/;
                        isCorrectDaysAndMonths = patternDaysMonths.test(typedValue);
                        if ((typedValue.length === 2 && charWasDeleted(typedValue, this.state.inputValue)) || typedDaysAbove30) {
                            newValue = typedValue + "/";
                            window.requestAnimationFrame(function () {
                                element.selectionStart = caret + 1;
                                element.selectionEnd = caret + 1;
                            });
                        }
                        else if (typedValue.length === 5 && charWasDeleted(typedValue, this.state.inputValue) && isCorrectDaysAndMonths) {
                            newValue = typedValue + "/";
                            window.requestAnimationFrame(function () {
                                element.selectionStart = caret + 1;
                                element.selectionEnd = caret + 1;
                            });
                        }
                        else {
                            if ((!charWasDeleted(typedValue, this.state.inputValue)
                                && lastTypedCharacter !== '/')
                                && typedValue.length !== 0) {
                                if ((!isNumeric(lastTypedCharacter))) {
                                    event.preventDefault();
                                    return [2 /*return*/];
                                }
                            }
                            newValue = typedValue;
                        }
                        if (!this.props.singleSelection) return [3 /*break*/, 2];
                        dateArray = newValue.split('/');
                        newDay = parseInt(dateArray[0], 10) - 1;
                        newMonth = parseInt(dateArray[1], 10);
                        newYear = parseInt(dateArray[2], 10);
                        newDate = new Date(newYear, newMonth, newDay);
                        if (!(((newDay && newDay > 0) || newDay === 0) && newMonth && newYear && isValidDate(newValue.toString()))) return [3 /*break*/, 2];
                        daysArray = this.state.daysArray;
                        newDaysObjArray = daysArray.slice();
                        this.clearSelection();
                        return [4 /*yield*/, this.initDaysCalendar(newMonth - 1, newYear)];
                    case 1:
                        _a.sent();
                        this.setState({
                            selectionStart: newDay,
                            selectionEnd: newDay,
                            selectedDate: {
                                start: newDate,
                                end: newDate,
                                display: newDate
                            },
                            daysArray: newDaysObjArray,
                            displayedMonthIndex: newMonth - 1,
                            displayedMonth: this.getMonthName(newMonth - 1),
                            displayedYear: newYear
                        });
                        newDaysObjArray[newDay].start = true;
                        this.saveSelection(newDay, false);
                        this.setState({ yearsList: this.getYears(newYear) });
                        _a.label = 2;
                    case 2:
                        console.log('new val ', newValue);
                        if (typedValue.length !== maxLength || isValidDate(newValue.toString())) {
                            this.setState({ inputValue: newValue });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Supports click on years
     *
     * @param year year in number eg. 2018
     */
    MiquidoDatePicker.prototype.yearClickHandler = function (year) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({ displayedYear: year });
                        if (!!this.state.userSelectedDaysBefore) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initDaysCalendar(this.state.displayedMonthIndex, year)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.switchToMonthSelect();
                        this.updYearInInput(year);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Supports click on month
     *
     * @param index month index
     */
    MiquidoDatePicker.prototype.monthClickHandler = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({ displayedMonth: monthNames[index], displayedMonthIndex: index });
                        if (!!this.state.userSelectedDaysBefore) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initDaysCalendar(index, this.state.displayedYear)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.switchToDaySelect();
                        this.updMonthInInput(index);
                        return [2 /*return*/];
                }
            });
        });
    };
    MiquidoDatePicker.prototype.updYearInInput = function (newYear) {
        var oldInputValue = this.state.inputValue;
        if (oldInputValue) {
            var separator = oldInputValue.match(/\W/g);
            if (separator.length === 2) {
                this.setState({
                    inputValue: oldInputValue.substring(0, oldInputValue.lastIndexOf(separator[0]) + 1) + newYear.toString()
                });
            }
        }
        return oldInputValue;
    };
    MiquidoDatePicker.prototype.updMonthInInput = function (newMonth) {
        var oldInputValue = this.state.inputValue;
        if (oldInputValue) {
            var separator = oldInputValue.match(/\W/g);
            var firstSeparatorIndex = oldInputValue.indexOf(separator[0] + 1);
            var lastSepearatorIndex = oldInputValue.lastIndexOf(separator[0]) + 1;
            if (separator.length === 2) {
                var newMonthInDoubleDigitFormat = newMonth < 10 ? "0" + (newMonth + 1) : newMonth + 1;
                this.setState({
                    inputValue: oldInputValue.substring(0, firstSeparatorIndex)
                        + separator[0] + (newMonthInDoubleDigitFormat).toString() + separator[0] +
                        oldInputValue.substring(lastSepearatorIndex)
                });
            }
        }
        return oldInputValue;
    };
    /**
     * Display picker and bind mouse up event to window
     *
     */
    MiquidoDatePicker.prototype.showPicker = function () {
        this.setCalendarPosition(this.node.current.getBoundingClientRect());
        this.setState({ isPickerVisible: true });
        document.addEventListener('mousedown', this.clickOutsideHandler, false);
    };
    /**
     * Hide picker
     *
     */
    MiquidoDatePicker.prototype.closePicker = function () {
        this.setState({ isPickerVisible: false });
        document.removeEventListener('mousedown', this.clickOutsideHandler, false);
    };
    /**
     * Display years picker
     *
     */
    MiquidoDatePicker.prototype.switchToYearSelect = function () {
        this.setState({ currentlyPicking: pickingOptions.YEAR });
    };
    /**
     * Display months picker
     *
     */
    MiquidoDatePicker.prototype.switchToMonthSelect = function () {
        this.setState({ currentlyPicking: pickingOptions.MONTH });
    };
    /**
     * Display days picker ( default view )
     *
     */
    MiquidoDatePicker.prototype.switchToDaySelect = function () {
        this.setState({ currentlyPicking: pickingOptions.DAY });
    };
    MiquidoDatePicker.prototype.setMultiMonthSelection = function (year, month) {
        var selected = this.state.selectedDate;
        if (selected.start && selected.end) {
            var start = new Date(year, month, 1);
            var end = new Date(year, month + 1, 0);
            // month contains selection
            if (selected.start.getMonth() === start.getMonth()) {
                // first month of selection
                this.setState({
                    daysArray: this.selectBetweenTwoDays(selected.start.getDate(), end.getDate(), true, false)
                });
            }
            else if (selected.end.getMonth() === end.getMonth()) {
                // last month of selection
                this.setState({
                    daysArray: this.selectBetweenTwoDays(start.getDate() - 1, selected.end.getDate(), false, true)
                });
            }
            else if (selected.start <= start && selected.end >= end) {
                // month containing selection without first and last
                this.selectWholeMonth(year, month);
            }
        }
    };
    MiquidoDatePicker.prototype.setSingleMonthSelection = function () {
        var selected = this.state.selectedDate;
        if (selected.start && selected.end) {
            var daysArray = this.state.daysArray.slice();
            var selectedDay = selected.start.getDate();
            daysArray[selectedDay - 1].start = true;
            daysArray[selectedDay - 1].end = true;
            this.setState({ selectionStart: selectedDay, selectionEnd: selectedDay, daysArray: daysArray });
        }
    };
    MiquidoDatePicker.prototype.selectWholeMonth = function (year, month) {
        var start = new Date(year, month + 1, 1).getDate() - 1;
        var end = getLastDayOfAMonth(year, month);
        this.setState({
            daysArray: this.selectBetweenTwoDays(start, end, false, false)
        });
    };
    /**
     * Handle month change ( right arrow )
     *
     */
    MiquidoDatePicker.prototype.nextMonth = function () {
        return __awaiter(this, void 0, void 0, function () {
            var oldMonthIndex, newMonthIndex, oldYear, newYear, selectedDate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.state.currentlyPicking === pickingOptions.YEAR)) return [3 /*break*/, 1];
                        // user is picking year
                        this.setState({ yearsList: this.getYears(this.state.yearsList[0].name + yearsDisplayedPerScreen) });
                        return [3 /*break*/, 3];
                    case 1:
                        oldMonthIndex = this.state.displayedMonthIndex;
                        newMonthIndex = (oldMonthIndex + 1) % 12;
                        oldYear = this.state.displayedYear || this.now.getFullYear();
                        newYear = newMonthIndex === 0 ? oldYear + 1 : oldYear;
                        this.setState({
                            displayedMonthIndex: newMonthIndex,
                            displayedMonth: this.getMonthName(newMonthIndex),
                            displayedYear: newYear
                        });
                        return [4 /*yield*/, this.initDaysCalendar(newMonthIndex, newYear)];
                    case 2:
                        _a.sent();
                        selectedDate = this.state.selectedDate;
                        if (checkVisibleCalendarForSelection(selectedDate, newMonthIndex, newYear)) {
                            if ((selectedDate.start && selectedDate.start.getTime()) !== (selectedDate.end && selectedDate.end.getTime())) {
                                this.setMultiMonthSelection(newYear, newMonthIndex);
                            }
                            else {
                                this.setSingleMonthSelection();
                            }
                        }
                        if (this.props.restrictions) {
                            this.setState({
                                daysArray: this.setRestrictions(this.props.restrictions, this.state.daysArray)
                            });
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Handle month change ( left arrow )
     *
     */
    MiquidoDatePicker.prototype.prevMonth = function () {
        return __awaiter(this, void 0, void 0, function () {
            var oldMonthIndex, newMonthIndex, oldYear, newYear, selectedDate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.state.currentlyPicking === pickingOptions.YEAR)) return [3 /*break*/, 1];
                        // user is picking year
                        this.setState({ yearsList: this.getYears(this.state.yearsList[0].name - yearsDisplayedPerScreen) });
                        return [3 /*break*/, 3];
                    case 1:
                        oldMonthIndex = this.state.displayedMonthIndex;
                        newMonthIndex = (oldMonthIndex || 12) - 1;
                        oldYear = this.state.displayedYear || this.now.getFullYear();
                        newYear = newMonthIndex === 11 ? oldYear - 1 : oldYear;
                        this.setState({
                            displayedMonthIndex: newMonthIndex,
                            displayedMonth: this.getMonthName(newMonthIndex),
                            displayedYear: newYear
                        });
                        return [4 /*yield*/, this.initDaysCalendar(newMonthIndex, newYear)];
                    case 2:
                        _a.sent();
                        selectedDate = this.state.selectedDate;
                        if (checkVisibleCalendarForSelection(selectedDate, newMonthIndex, newYear)) {
                            if ((selectedDate.start && selectedDate.start.getTime()) !== (selectedDate.end && selectedDate.end.getTime())) {
                                this.setMultiMonthSelection(newYear, newMonthIndex);
                            }
                            else {
                                this.setSingleMonthSelection();
                            }
                        }
                        if (this.props.restrictions) {
                            this.setState({
                                daysArray: this.setRestrictions(this.props.restrictions, this.state.daysArray)
                            });
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MiquidoDatePicker.prototype.setDefaultDate = function (defaultValue) {
        if (!defaultValue)
            return;
        if (defaultValue.end) {
            if (defaultValue.start.getTime() !== defaultValue.end.getTime()) {
                return assembleMultiSelectDate(defaultValue.start, defaultValue.end);
            }
            if (this.props.showOnlyEnd === true)
                return assembleDateForEndOnly(defaultValue.end);
            return assembleDate(defaultValue.start.getDate(), defaultValue.end.getDate(), defaultValue.start.getMonth(), defaultValue.start.getFullYear());
        }
        if (this.props.showOnlyEnd !== true) {
            return assembleDateForStartOnly(defaultValue.start);
        }
        return '';
    };
    MiquidoDatePicker.prototype.render = function () {
        return (React.createElement("div", { className: getClassFor({ key: 'pickerWrapper', theme: this.theme, defaultClass: pickerWrapper }), ref: this.node },
            this.props.children && React.cloneElement(this.props.children, {
                defaultValue: this.state.inputValue || (this.state.defaultValue && this.setDefaultDate(this.state.defaultValue)) || '',
                value: this.state.inputValue,
                className: "miquido-date-picker__input " + this.inputClass,
                onClick: this.showPicker,
                onChange: this.handleChange,
                disabled: this.state.disabled,
                placeholder: this.props.placeholder || '',
                name: this.props.name || ''
            }),
            !this.props.children &&
                React.createElement("input", { type: 'text', value: this.state.inputValue, className: "miquido-date-picker__input " + this.inputClass, onClick: this.showPicker, onChange: this.handleChange, disabled: this.state.disabled, placeholder: this.props.placeholder || '', name: this.props.name || '' }),
            React.createElement(CSSTransition, { in: this.state.isPickerVisible, timeout: animationDuration, classNames: 'picker', unmountOnExit: true, onExited: this.closePicker },
                React.createElement("div", { className: getClassFor({ key: 'picker', theme: this.theme, defaultClass: picker }), style: this.positionStyles },
                    this.props.beforeHeader,
                    React.createElement(HeaderMenu, { displayYear: this.state.displayedYear, displayMonth: this.state.displayedMonth, switchToYearSelect: this.switchToYearSelect, switchToMonthSelect: this.switchToMonthSelect, nextMonth: this.nextMonth, prevMonth: this.prevMonth, theme: this.theme }),
                    React.createElement(CSSTransition, { in: this.state.currentlyPicking === pickingOptions.YEAR, timeout: animationDuration, classNames: 'picker', unmountOnExit: true, onExited: this.switchToMonthSelect },
                        React.createElement(YearPicker, { years: this.state.yearsList, theme: this.theme })),
                    React.createElement(CSSTransition, { in: this.state.currentlyPicking === pickingOptions.MONTH, timeout: animationDuration, classNames: 'picker', unmountOnExit: true },
                        React.createElement(MonthPicker, { months: this.monthsList, eventsHandlers: this.eventsHandlers, theme: this.theme })),
                    this.props.beforeDayNamesRow,
                    React.createElement(DaysHeader, { theme: this.theme }),
                    this.props.beforeBody,
                    React.createElement(PickDay, { pastDaysAmount: getFirstMondayIndex(this.state.displayedMonthIndex, this.state.displayedYear), days: this.state.daysArray, eventsHandlers: this.eventsHandlers, theme: this.theme, selectedYear: this.state.displayedYear, selectedMonthIndex: this.state.displayedMonthIndex }),
                    this.props.beforeFooter,
                    React.createElement(FooterMenu, { clear: this.clearSelection.bind(this), save: this.saveSelection.bind(this), theme: this.theme, noButtons: this.props.singleSelection }),
                    this.props.beforeEnd))));
    };
    return MiquidoDatePicker;
}(React.Component));
export default MiquidoDatePicker;
//# sourceMappingURL=MiquidoDatePicker.js.map