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
import HeaderMenu from './../components/HeaderMenu/HeaderMenu';
import YearPicker from './../components/YearPicker/YearPicker';
import MonthPicker from './../components/MonthPicker/MonthPicker';
import DaysHeader from './../components/DaysHeader/DaysHeader';
import PickDay from './../components/DayPicker/DayPicker';
import FooterMenu from './../components/FooterMenu/FooterMenu';
import { pickerPositions, pickingOptions } from '../enums';
import { monthNames, yearsDisplayedPerScreen, animationDuration } from '../consts';
import { assembleDate, assembleDateForEndOnly, assembleDateForStartOnly, assembleMultiSelectDate, getClassFor, getDayOfTheWeek, objectEquals, setRawStyles } from '../functions';
import { picker, pickerWrapper } from './../MiquidoDatePicker.classname';
import { defaultTheme } from '../../themes/default/default_theme';
import { CSSTransition } from 'react-transition-group';
import InputComponent from './../components/InputComponent/InputComponent';
import { isValidToSelect, newDateFromParsed, parseDate, setCorrectTypedValue } from '../inputFunctions';
var SingleSelection = /** @class */ (function (_super) {
    __extends(SingleSelection, _super);
    function SingleSelection(props) {
        var _this = _super.call(this, props) || this;
        _this.now = new Date();
        _this.currentMonth = _this.now.getMonth();
        _this.theme = {};
        _this.userSavedDate = false;
        /**
         * Supports click on days
         *
         * @param index index of a day
         */
        _this.clickHandler = function (index) {
            _this.setState({ userSelectedDaysBefore: true });
            _this.handleSingleSelection(index);
        };
        /**
         * Supports click outside picker
         */
        _this.clickOutsideHandler = function (e) {
            if (!_this.node.current || !_this.node.current.contains(e.target)) {
                _this.closePickerAndValidateDate();
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
                    selected: _this.getMonthName(_this.state.displayedMonthIndex) === monthName,
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
                if (year > 0) {
                    years.push({
                        name: year,
                        selected: _this.state.displayedYear === year,
                        eventsHandlers: _this.yearEventsHandlers,
                        itemIndex: i
                    });
                }
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
            clickHandler: _this.clickHandler.bind(_this)
        };
        _this.yearEventsHandlers = {
            clickHandler: _this.yearClickHandler.bind(_this)
        };
        _this.monthEventsHandlers = {
            clickHandler: _this.monthClickHandler.bind(_this)
        };
        _this.setPickerValueFromInput = function () {
            if (_this.state.defaultValue && typeof _this.state.inputValue === 'string' && _this.state.inputValue.length === 0) {
                return _this.state.inputValue;
            }
            return _this.state.inputValue || (_this.state.defaultValue && _this.setDefaultDate(_this.state.defaultValue)) || '';
        };
        _this.state = {
            isPickerVisible: false,
            currentlyPicking: pickingOptions.DAY,
            displayedMonthIndex: _this.getInitialMonth(),
            displayedYear: _this.getInitialYear(),
            inputValue: '',
            userSelectedDaysBefore: !!_this.props.defaultValue,
            yearsList: [],
            selectedDate: _this.getDefaultValue(),
            disabled: !!props.disabled,
            userForcedClose: false,
            inputClass: props.inputClass || '',
            lastValidSelectedDate: undefined
        };
        _this.theme = props.theme || defaultTheme;
        _this.node = React.createRef();
        _this.positionStyles = {};
        _this.monthsList = _this.getMonths(); // TODO move to components
        _this.switchToYearSelect = _this.switchToYearSelect.bind(_this);
        _this.switchToMonthSelect = _this.switchToMonthSelect.bind(_this);
        _this.nextButtonHandler = _this.nextButtonHandler.bind(_this);
        _this.prevButtonHandler = _this.prevButtonHandler.bind(_this);
        _this.showPicker = _this.props.children ? _this.showPicker.bind(_this, _this.props.children.props) : _this.showPicker.bind(_this);
        _this.handleChange = _this.props.children ? _this.handleChange.bind(_this, _this.props.children.props) : _this.handleChange.bind(_this);
        _this.saveSelection = _this.saveSelection.bind(_this);
        _this.closePicker = _this.closePicker.bind(_this);
        _this.onInputClickHandler = _this.onInputClickHandler.bind(_this);
        return _this;
    }
    SingleSelection.prototype.handleRejection = function (error) {
        console.trace('handle Rejection');
        console.error(error);
    };
    SingleSelection.prototype.getDefaultValue = function () {
        var _a;
        var defaultValue = this.props.defaultValue;
        if (defaultValue && defaultValue.end && (defaultValue.start && defaultValue.start.getTime() > defaultValue.end.getTime())) {
            _a = [defaultValue.end, defaultValue.start], defaultValue.start = _a[0], defaultValue.end = _a[1];
        }
        return defaultValue || { start: null, end: null, display: this.now };
    };
    SingleSelection.prototype.getInitialMonth = function () {
        if (!this.props.defaultValue)
            return this.currentMonth;
        return this.props.defaultValue.display.getMonth();
    };
    SingleSelection.prototype.getInitialYear = function () {
        return (this.props.defaultValue && this.props.defaultValue.display.getFullYear()) || this.now.getFullYear();
    };
    /**
     * Get month name from array
     *
     * @param index index of month from 0 to 11
     */
    SingleSelection.prototype.getMonthName = function (index) {
        if (!Number.isInteger(index)) {
            return monthNames[this.now.getMonth() + 1];
        }
        else {
            return monthNames[index];
        }
    };
    SingleSelection.prototype.componentWillMount = function () {
        setRawStyles();
        if (this.props.defaultValue) {
            this.currentMonth = this.props.defaultValue.display.getMonth();
            this.setState({
                inputValue: this.setDefaultDate(this.props.defaultValue),
                defaultValue: this.props.defaultValue
            });
        }
        if (this.props.restrictions) {
            if (this.state.defaultValue && this.state.defaultValue.start &&
                (this.props.restrictions && this.props.restrictions.min &&
                    (this.props.restrictions.min > this.state.defaultValue.start))) {
                try {
                    throw new Error("Default date can't be lower than min allowed date");
                }
                catch (e) {
                    this.handleRejection(e);
                }
            }
        }
        if (this.state.defaultValue &&
            (this.state.defaultValue.start && this.state.defaultValue.start.getTime() !== (this.state.defaultValue.end && this.state.defaultValue.end.getTime()))) {
            try {
                throw new Error("Start and End should be the same for single selection");
            }
            catch (e) {
                this.handleRejection(e);
            }
        }
    };
    SingleSelection.prototype.componentWillUnmount = function () {
        document.removeEventListener('mousedown', this._onMouseUp, false);
    };
    SingleSelection.prototype.componentDidUpdate = function (prevProps) {
        var oldDefault = prevProps.defaultValue;
        var newDefault = this.props.defaultValue;
        if (!objectEquals(oldDefault, newDefault)) {
            if (newDefault) {
                var newInputValue = this.setDefaultDate(newDefault) ? this.setDefaultDate(newDefault) : '';
                var newMonth = newDefault.display;
                var newDisplayMonthIndex = (Number.isInteger(newMonth.getMonth())) ? newMonth.getMonth() : this.now.getMonth();
                var updState = {
                    inputValue: newInputValue,
                    selectedDate: __assign({}, prevProps.defaultValue),
                    displayedMonthIndex: newDisplayMonthIndex,
                    displayedYear: newDefault.display.getFullYear() || this.now.getFullYear(),
                    inputClass: this.props.inputClass || ''
                };
                this.setState(updState);
                void this.init();
            }
        }
        if (prevProps.inputClass && this.props.inputClass !== prevProps.inputClass) {
            this.setState({
                inputClass: this.props.inputClass
            });
        }
    };
    SingleSelection.prototype.componentWillUpdate = function (newProps, newState) {
        if (newProps.disabled !== undefined && this.state.disabled !== newProps.disabled) {
            this.setState({ disabled: newProps.disabled });
        }
        if (newState.userForcedClose !== this.state.userForcedClose) {
            this.setState({ userForcedClose: newState.userForcedClose });
        }
        if (newProps.open === true && !this.state.isPickerVisible && !this.state.userForcedClose) {
            this.showPicker();
        }
        if (newProps.close === true && this.state.isPickerVisible) {
            this.closePicker();
        }
    };
    SingleSelection.prototype.componentDidMount = function () {
        void this.init().catch(this.handleRejection);
    };
    SingleSelection.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.node && this.node.current) {
                    this.setCalendarPosition(this.node.current.getBoundingClientRect());
                }
                if (this.props.defaultValue) {
                    this.setState({ selectedDate: this.splitDefaultValue(this.props.defaultValue) });
                }
                this.setState({ yearsList: this.getYears(this.getInitialYear()) });
                return [2 /*return*/];
            });
        });
    };
    SingleSelection.prototype.splitDefaultValue = function (val) {
        if (this.props.showOnlyStart)
            return __assign({}, val, { end: null });
        if (this.props.showOnlyEnd)
            return __assign({}, val, { start: null });
        return val;
    };
    SingleSelection.prototype.setCalendarPosition = function (bcr) {
        this.positionStyles = {};
        if (this.props.position) {
            var position = this.props.position;
            if (position === pickerPositions.TOP)
                this.positionStyles.bottom = bcr.height + 'px';
            if (position === pickerPositions.BOTTOM)
                this.positionStyles.top = bcr.height + 'px';
        }
        else if (bcr.y > (window.innerHeight / 2)) {
            this.positionStyles.bottom = bcr.height + 'px';
        }
        else {
            this.positionStyles.top = bcr.height + 'px';
        }
        if (this.props.positionHorizontal) {
            var positionHorizontal = this.props.positionHorizontal;
            if (positionHorizontal === pickerPositions.LEFT)
                this.positionStyles.left = 0;
            if (positionHorizontal === pickerPositions.RIGHT)
                this.positionStyles.right = 0;
        }
        else if (bcr.x > (window.innerWidth / 2)) {
            this.positionStyles.right = 0;
        }
        else {
            this.positionStyles.left = 0;
        }
    };
    /**
     * Supports single day selection
     *
     * @param index index of a day
     */
    SingleSelection.prototype.handleSingleSelection = function (index) {
        this.saveSelection(index);
    };
    /**
     * Condition check if selection began
     *
     */
    SingleSelection.prototype.isStartSelected = function () {
        return Boolean(this.state.defaultValue || this.state.userSelectedDaysBefore);
    };
    /**
     * Condition check if selection end
     *
     */
    SingleSelection.prototype.isEndSelected = function () {
        return this.state.selectedDate.end !== undefined && this.state.selectedDate.end !== null;
    };
    SingleSelection.prototype.handleError = function (newDateObject) {
        if (this.props.onError) {
            this.props.onError(this.inputValueObjToCallback(newDateObject));
        }
    };
    SingleSelection.prototype.inputValueObjToCallback = function (newDateObject) {
        return {
            date: newDateObject.date,
            end: newDateObject.day,
            inputValue: newDateObject.dateString,
            month: newDateObject.month,
            start: newDateObject.day,
            year: newDateObject.year
        };
    };
    SingleSelection.prototype.saveSelectionForTyping = function (newDateObject) {
        this.setState({
            selectedDate: {
                start: newDateObject.date,
                end: newDateObject.date,
                display: newDateObject.date
            },
            displayedMonthIndex: newDateObject.month - 1,
            displayedYear: newDateObject.year,
            yearsList: this.getYears(newDateObject.year),
            lastValidSelectedDate: newDateObject.date
        });
        if (this.props.onSelect) {
            this.props.onSelect(this.inputValueObjToCallback(newDateObject));
        }
    };
    /**
     * Save selection
     *
     */
    SingleSelection.prototype.saveSelection = function (singleIndex, shouldClosePicker) {
        if (shouldClosePicker === void 0) { shouldClosePicker = true; }
        var value = '';
        var valueObj = {};
        var start = this.state.selectedDate.start;
        var end = this.state.selectedDate.end;
        var month = this.state.displayedMonthIndex;
        var year = this.state.displayedYear;
        if ((!singleIndex && singleIndex !== 0) || !Number.isInteger(singleIndex)) {
            if ((!start && start !== 0) || (!end && end !== 0))
                return;
            if (this.props.showOnlyEnd) {
                value = assembleDateForEndOnly(end);
            }
            else {
                value = assembleMultiSelectDate(start, end);
            }
        }
        else {
            if (this.props.showOnlyStart) {
                value = assembleDateForStartOnly(new Date(year, month, singleIndex + 1));
            }
            else {
                value = assembleDate(singleIndex + 1, singleIndex + 1, month, year);
            }
            valueObj = {
                start: singleIndex + 1,
                end: singleIndex + 1,
                month: month + 1,
                year: year,
                date: new Date(year, month, singleIndex + 1),
                inputValue: value
            };
        }
        // TODO onSelect overrides setState inputValue
        if (this.props.onSelect) {
            this.props.onSelect(valueObj);
        }
        this.setState({
            inputValue: value,
            selectedDate: __assign({}, this.state.selectedDate, { start: new Date(year, month, singleIndex + 1), end: new Date(year, month, singleIndex + 1) })
        });
        if (shouldClosePicker) {
            this.closePicker();
        }
        this.setState({
            lastValidSelectedDate: new Date(year, month, singleIndex + 1)
        });
        this.userSavedDate = true;
    };
    /**
     * Supports input value change
     *
     * @param event event object
     */
    // TODO move to input component
    SingleSelection.prototype.handleChange = function (event) {
        var dYear = this.state.displayedYear;
        var dmonth = this.state.displayedMonthIndex;
        var element = event.target;
        var caret = element.selectionStart;
        var typedValue = element.value;
        var maxLength = 10;
        window.requestAnimationFrame(function () {
            element.selectionStart = caret;
            element.selectionEnd = caret;
        });
        typedValue = setCorrectTypedValue(typedValue, element.selectionEnd);
        var newValue = parseDate(typedValue);
        var newDateObject = newDateFromParsed(newValue);
        if (isValidToSelect(newDateObject, this.props.restrictions)) {
            this.saveSelectionForTyping(newDateObject);
        }
        else {
            this.handleError(newDateObject);
        }
        if (typedValue.length > maxLength) {
            this.setState({ inputValue: '' });
            this.setState({
                selectedDate: {
                    start: null,
                    end: null,
                    display: new Date(dYear, dmonth)
                }
            });
        }
        else {
            if (newValue.length === 0) {
                this.setState({
                    selectedDate: {
                        start: null,
                        end: null,
                        display: new Date(dYear, dmonth)
                    }
                });
            }
            this.setState({ inputValue: newValue });
            if (this.props.onInputChange) {
                this.props.onInputChange(newValue);
            }
        }
        if (newValue.length < maxLength) {
            window.requestAnimationFrame(function () {
                element.selectionStart = newValue.length;
                element.selectionEnd = newValue.length;
            });
        }
    };
    /**
     * Supports click on years
     *
     * @param year year in number eg. 2018
     */
    SingleSelection.prototype.yearClickHandler = function (year) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.setState({ displayedYear: year });
                this.switchToMonthSelect();
                this.updYearInInput(year);
                return [2 /*return*/];
            });
        });
    };
    /**
     * Supports click on month
     *
     * @param index month index
     */
    SingleSelection.prototype.monthClickHandler = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.setState({ displayedMonthIndex: index });
                this.switchToDaySelect();
                this.updMonthInInput(index);
                return [2 /*return*/];
            });
        });
    };
    SingleSelection.prototype.updYearInInput = function (newYear) {
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
    SingleSelection.prototype.updMonthInInput = function (newMonth) {
        var oldInputValue = this.state.inputValue;
        if (oldInputValue) {
            var separator = oldInputValue.match(/\W/g);
            var firstSeparatorIndex = oldInputValue.indexOf(separator[0]);
            var lastSepearatorIndex = oldInputValue.lastIndexOf(separator[0]) + 1;
            if (separator.length === 2) {
                var newMonthNumberFromIndex = newMonth + 1;
                var newMonthInDoubleDigitFormat = newMonthNumberFromIndex < 10 ? "0" + newMonthNumberFromIndex : newMonthNumberFromIndex;
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
     * Display years picker
     *
     */
    SingleSelection.prototype.switchToYearSelect = function () {
        this.setState({ currentlyPicking: pickingOptions.YEAR });
    };
    /**
     * Display months picker
     *
     */
    SingleSelection.prototype.switchToMonthSelect = function () {
        this.setState({ currentlyPicking: pickingOptions.MONTH });
    };
    /**
     * Display days picker ( default view )
     *
     */
    SingleSelection.prototype.switchToDaySelect = function () {
        this.setState({ currentlyPicking: pickingOptions.DAY });
    };
    /**
     * Handle month change ( right arrow )
     *
     */
    SingleSelection.prototype.nextButtonHandler = function () {
        return __awaiter(this, void 0, void 0, function () {
            var oldMonthIndex, newMonthIndex, oldYear, newYear;
            return __generator(this, function (_a) {
                if (this.state.currentlyPicking === pickingOptions.YEAR) {
                    // user is picking year
                    this.setState({ yearsList: this.getYears(this.state.yearsList[0].name + yearsDisplayedPerScreen) });
                }
                else {
                    oldMonthIndex = this.state.displayedMonthIndex;
                    newMonthIndex = (oldMonthIndex + 1) % 12;
                    oldYear = this.state.displayedYear || this.now.getFullYear();
                    newYear = newMonthIndex === 0 ? oldYear + 1 : oldYear;
                    this.setState({
                        displayedMonthIndex: newMonthIndex,
                        displayedYear: newYear
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Handle month change ( left arrow )
     *
     */
    SingleSelection.prototype.prevButtonHandler = function () {
        return __awaiter(this, void 0, void 0, function () {
            var oldYear, oldMonthIndex, newMonthIndex, newYear;
            return __generator(this, function (_a) {
                oldYear = this.state.displayedYear || this.now.getFullYear();
                if (this.state.currentlyPicking === pickingOptions.YEAR) {
                    // user is picking year
                    if (oldYear > yearsDisplayedPerScreen) {
                        this.setState({ yearsList: this.getYears(this.state.yearsList[0].name - yearsDisplayedPerScreen) });
                    }
                }
                else {
                    oldMonthIndex = this.state.displayedMonthIndex;
                    newMonthIndex = (oldMonthIndex || 12) - 1;
                    newYear = newMonthIndex === 11 ? oldYear - 1 : oldYear;
                    if (newYear < 0) {
                        newYear = 1;
                    }
                    this.setState({
                        displayedMonthIndex: newMonthIndex,
                        displayedYear: newYear
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    SingleSelection.prototype.setDefaultDate = function (defaultValue) {
        // TODO should set selected
        if (!defaultValue)
            return;
        if (this.props.showOnlyStart === true && defaultValue.start) {
            return assembleDateForStartOnly(defaultValue.start);
        }
        if (defaultValue.end) {
            if (this.props.showOnlyEnd === true) {
                return assembleDateForEndOnly(defaultValue.end);
            }
            if (defaultValue.start) {
                if (defaultValue.start.getTime() !== defaultValue.end.getTime()) {
                    return assembleMultiSelectDate(defaultValue.start, defaultValue.end);
                }
            }
            if (defaultValue.start) {
                return assembleDate(defaultValue.start.getDate(), defaultValue.end.getDate(), defaultValue.start.getMonth(), defaultValue.start.getFullYear());
            }
        }
        if (defaultValue.start) {
            return assembleDate(defaultValue.display.getDate(), undefined, defaultValue.display.getMonth(), defaultValue.display.getFullYear());
        }
        return '';
    };
    SingleSelection.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: getClassFor({ key: 'pickerWrapper', theme: this.theme, defaultClass: pickerWrapper }), ref: this.node },
            React.createElement(InputComponent, { children: this.props.children, inputValue: this.setPickerValueFromInput(), inputClass: "miquido-date-picker__input " + this.state.inputClass, onClickHandler: this.onInputClickHandler, onChangeHandler: this.handleChange, disabled: this.state.disabled, placeholder: this.props.placeholder || '', name: this.props.name || '', isVisible: this.state.isPickerVisible }),
            React.createElement(CSSTransition, { in: this.state.isPickerVisible, timeout: animationDuration, classNames: 'picker', unmountOnExit: true, onExited: this.closePicker, onEntered: function () {
                    if (_this.props.onOpen) {
                        _this.props.onOpen.call(_this, _this.node);
                    }
                } },
                React.createElement("div", { className: getClassFor({ key: 'picker', theme: this.theme, defaultClass: picker }), style: this.positionStyles },
                    this.props.beforeHeader,
                    React.createElement(HeaderMenu, { displayYear: this.state.displayedYear, displayMonth: monthNames[this.state.displayedMonthIndex], switchToYearSelect: this.switchToYearSelect, switchToMonthSelect: this.switchToMonthSelect, nextMonth: this.nextButtonHandler, prevMonth: this.prevButtonHandler, theme: this.theme, shoudlDisplayArrows: this.state.currentlyPicking !== pickingOptions.MONTH }),
                    React.createElement(CSSTransition, { in: this.state.currentlyPicking === pickingOptions.YEAR, timeout: animationDuration, classNames: 'picker', unmountOnExit: true, onExited: this.switchToMonthSelect },
                        React.createElement(YearPicker, { years: this.state.yearsList, theme: this.theme, restrictions: this.props.restrictions })),
                    React.createElement(CSSTransition, { in: this.state.currentlyPicking === pickingOptions.MONTH, timeout: animationDuration, classNames: 'picker', unmountOnExit: true },
                        React.createElement(MonthPicker, { months: this.monthsList, eventsHandlers: this.eventsHandlers, restrictions: this.props.restrictions, displayedYear: this.state.displayedYear, theme: this.theme })),
                    this.props.beforeDayNamesRow,
                    React.createElement(DaysHeader, { theme: this.theme }),
                    this.props.beforeBody,
                    React.createElement(PickDay, { pastDaysAmount: getDayOfTheWeek(this.state.displayedMonthIndex, this.state.displayedYear), eventsHandlers: this.eventsHandlers, theme: this.theme, selectedYear: this.state.displayedYear, selectedMonthIndex: this.state.displayedMonthIndex, selection: this.getSelectionForDays(), restrictions: this.props.restrictions }),
                    this.props.beforeFooter,
                    React.createElement(FooterMenu, { save: this.saveSelection.bind(this), theme: this.theme, noButtons: true }),
                    this.props.beforeEnd))));
    };
    SingleSelection.prototype.getSelectionForDays = function () {
        if (this.props.showOnlyEnd && this.state.selectedDate.end)
            return this.state.selectedDate.end;
        if (this.state.selectedDate.start)
            return this.state.selectedDate.start;
        return undefined;
    };
    SingleSelection.prototype.onInputClickHandler = function () {
        this.setState({ userForcedClose: false });
        if (this.props.onClick) {
            this.props.onClick();
        }
        else {
            this.showPicker();
        }
    };
    /**
     * Display picker and bind mouse up event to window
     *
     */
    SingleSelection.prototype.showPicker = function () {
        this.setCalendarPosition(this.node.current.getBoundingClientRect());
        this.setState({ isPickerVisible: true, userForcedClose: false });
        document.addEventListener('mousedown', this.clickOutsideHandler, false);
    };
    /**
     * Hide picker
     *
     */
    SingleSelection.prototype.closePicker = function () {
        this.setState({ isPickerVisible: false, userForcedClose: true });
        document.removeEventListener('mousedown', this.clickOutsideHandler, false);
        if (this.props.onClose) {
            this.props.onClose();
        }
    };
    SingleSelection.prototype.closePickerAndValidateDate = function () {
        if (this.state.lastValidSelectedDate && this.state.inputValue !== '' &&
            SingleSelection.isInputValueAndLastValidSelectionDifferent(this.state.inputValue, this.state.lastValidSelectedDate)) {
            this.setState({
                displayedMonthIndex: this.state.lastValidSelectedDate.getMonth(),
                displayedYear: this.state.lastValidSelectedDate.getFullYear()
            });
            this.saveSelection(this.state.lastValidSelectedDate.getDate() - 1, false);
        }
        this.closePicker();
    };
    SingleSelection.isInputValueAndLastValidSelectionDifferent = function (inputVal, lastSelection) {
        var dateFromInput = new Date(inputVal);
        return lastSelection.getTime() !== dateFromInput.getTime();
    };
    return SingleSelection;
}(React.Component));
export default SingleSelection;
//# sourceMappingURL=SingleSelection.js.map