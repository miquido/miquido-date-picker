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
import * as React from 'react';
import HeaderMenu from './HeaderMenu/HeaderMenu';
import YearPicker from './YearPicker/YearPicker';
import MonthPicker from './MonthPicker/MonthPicker';
import DaysHeader from './DaysHeader/DaysHeader';
import PickDay from './DayPicker/DayPicker';
import FooterMenu from './FooterMenu/FooterMenu';
import { pickingOptions } from './enums';
import { monthNames } from './consts';
import { asembleDate, generateCalendar, getClassFor, getFirstMondayIndex, selectDate, setRawStyles, unselectDate } from './functions';
import { pickerWrapper, picker } from './MiquidoDatePicker.classname';
import { defaultTheme } from '../themes/default/default_theme';
import { CSSTransition } from 'react-transition-group';
var MiquidoDatePicker = /** @class */ (function (_super) {
    __extends(MiquidoDatePicker, _super);
    function MiquidoDatePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.now = new Date();
        _this.currentMonth = _this.now.getMonth();
        _this.theme = {};
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
                var newSelection = _this.selectBetweenPoints(start, index);
                _this.setState({ daysArray: newSelection });
            }
        };
        /**
         * Supports click on days
         *
         * @param index index of a day
         */
        _this.clickHandler = function (index) {
            if (_this.props.singleSelection) {
                _this.handleSingleSelection(index);
            }
            else {
                _this.handleMultiSelection(index);
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
                    selected: _this.state.selectedMonth === monthName,
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
        _this.getYears = function () {
            var now = new Date();
            var currentYear = now.getFullYear();
            var years = [];
            for (var i = 0; i < 12; i++) {
                var year = currentYear + i;
                years.push({
                    name: year,
                    selected: _this.state.selectedYear === year,
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
                _this.setState({
                    isPickerVisible: false
                });
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
            selectedMonth: _this.getMonthName(_this.currentMonth),
            selectedMonthIndex: _this.currentMonth,
            selectedYear: _this.now.getFullYear(),
            inputVal: undefined
        };
        _this.theme = props.theme || defaultTheme;
        _this.node = React.createRef();
        _this.positionStyles = {};
        _this.monthsList = _this.getMonths();
        _this.yearsList = _this.getYears();
        return _this;
    }
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
        // document.addEventListener('mousedown', this._onMouseUp, false)
    };
    MiquidoDatePicker.prototype.componentWillUnmount = function () {
        document.removeEventListener('mousedown', this._onMouseUp, false);
    };
    MiquidoDatePicker.prototype.componentDidMount = function () {
        this.setCalendarPosition(this.node.current.getBoundingClientRect());
        this.initDaysCalendar(this.currentMonth, this.now.getFullYear());
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
        var calendarInit = generateCalendar(month, year);
        this.setState({ daysArray: calendarInit });
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
                var newSelection = this.selectBetweenPoints(selectionStart, index);
                this.setState({ selectionStart: selectionStart, selectionEnd: index, daysArray: newSelection });
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
     * Select between two given points
     *
     * @param start index of a day
     * @param end index of a day
     */
    MiquidoDatePicker.prototype.selectBetweenPoints = function (start, end) {
        var daysArray = this.state.daysArray;
        return daysArray.map(function (day) {
            if (day.itemIndex === end) {
                day.end = true;
            }
            else if (day.itemIndex === start) {
                day.start = true;
            }
            else {
                day.start = false;
                day.end = false;
            }
            if (day.itemIndex <= end && day.itemIndex >= start) {
                return selectDate(day);
            }
            else if (day.itemIndex >= end && day.itemIndex < start) {
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
    MiquidoDatePicker.prototype.saveSelection = function (singleIndex) {
        var days = this.state.daysArray;
        var value = '';
        var valueObj = {};
        var start = this.state.selectionStart;
        var end = this.state.selectionEnd;
        var month = this.state.selectedMonthIndex;
        var year = this.state.selectedYear;
        if ((!singleIndex && singleIndex !== 0) || !Number.isInteger(singleIndex)) {
            if ((!start && start !== 0) || (!end && end !== 0))
                return;
            value = asembleDate(start, end, month, year, days);
            valueObj = {
                start: start + 1,
                end: end + 1,
                month: month + 1,
                year: year
            };
        }
        else {
            value = asembleDate(singleIndex, singleIndex, month, year, days);
            valueObj = {
                start: singleIndex + 1,
                end: singleIndex + 1,
                month: month + 1,
                year: year
            };
        }
        this.setState({ inputVal: value });
        this.closePicker();
        if (this.props.selectCallback) {
            this.props.selectCallback(valueObj);
        }
    };
    /**
     * Supports input value change
     *
     * @param event event object
     */
    MiquidoDatePicker.prototype.handleChange = function (event) {
        this.setState({ inputVal: event.target.value });
    };
    /**
     * Supports click on years
     *
     * @param year year in number eg. 2018
     */
    MiquidoDatePicker.prototype.yearClickHandler = function (year) {
        this.setState({ selectedYear: year });
        this.initDaysCalendar(this.state.selectedMonthIndex, year);
        this.switchToMonthSelect();
    };
    /**
     * Supports click on month
     *
     * @param index month index
     */
    MiquidoDatePicker.prototype.monthClickHandler = function (index) {
        this.setState({ selectedMonth: monthNames[index], selectedMonthIndex: index });
        this.initDaysCalendar(index, this.state.selectedYear);
        this.switchToDaySelect();
    };
    /**
     * Display picker and bind mouse up event to window
     *
     */
    MiquidoDatePicker.prototype.showPicker = function () {
        this.setCalendarPosition(this.node.current.getBoundingClientRect());
        this.setState({ isPickerVisible: true });
        document.addEventListener('mousedown', this._onMouseUp, false);
    };
    /**
     * Hide picker
     *
     */
    MiquidoDatePicker.prototype.closePicker = function () {
        this.setState({ isPickerVisible: false });
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
    /**
     * Handle month change ( right arrow )
     *
     */
    MiquidoDatePicker.prototype.nextMonth = function () {
        var oldMonthIndex = this.state.selectedMonthIndex;
        var newMonthIndex = (oldMonthIndex + 1) % 12;
        var oldYear = this.state.selectedYear || this.now.getFullYear();
        var newYear = newMonthIndex === 0 ? oldYear + 1 : oldYear;
        this.setState({
            selectedMonthIndex: newMonthIndex,
            selectedMonth: this.getMonthName(newMonthIndex),
            selectedYear: newYear
        });
        this.initDaysCalendar(newMonthIndex, newYear);
    };
    /**
     * Handle month change ( left arrow )
     *
     */
    MiquidoDatePicker.prototype.prevMonth = function () {
        var oldMonthIndex = this.state.selectedMonthIndex;
        var newMonthIndex = (oldMonthIndex - 1) % 12 < 0 ? 11 : (oldMonthIndex - 1) % 12;
        var oldYear = this.state.selectedYear || this.now.getFullYear();
        var newYear = newMonthIndex === 11 ? oldYear - 1 : oldYear;
        this.setState({
            selectedMonthIndex: newMonthIndex,
            selectedMonth: this.getMonthName(newMonthIndex),
            selectedYear: newYear
        });
        this.initDaysCalendar(newMonthIndex, newYear);
    };
    MiquidoDatePicker.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: getClassFor({ key: 'pickerWrapper', theme: this.theme, defaultClass: pickerWrapper }), ref: this.node },
            React.cloneElement(this.props.children, {
                value: this.state.inputVal || '',
                onClick: this.showPicker.bind(this, this.props.children.props),
                onChange: this.handleChange.bind(this, this.props.children.props)
            }),
            React.createElement(CSSTransition, { in: this.state.isPickerVisible, timeout: 300, classNames: 'picker', unmountOnExit: true, onExited: function () {
                    _this.setState({
                        isPickerVisible: false
                    });
                } },
                React.createElement("div", { className: getClassFor({ key: 'picker', theme: this.theme, defaultClass: picker }), style: this.positionStyles },
                    React.createElement(HeaderMenu, { displayYear: this.state.selectedYear, displayMonth: this.state.selectedMonth, switchToYearSelect: this.switchToYearSelect.bind(this), switchToMonthSelect: this.switchToMonthSelect.bind(this), nextMonth: this.nextMonth.bind(this), prevMonth: this.prevMonth.bind(this), theme: this.theme }),
                    React.createElement(CSSTransition, { in: this.state.currentlyPicking === pickingOptions.YEAR, timeout: 300, classNames: 'picker', unmountOnExit: true, onExited: function () {
                            _this.setState({
                                currentlyPicking: pickingOptions.MONTH
                            });
                        } },
                        React.createElement(YearPicker, { years: this.yearsList, theme: this.theme })),
                    React.createElement(CSSTransition, { in: this.state.currentlyPicking === pickingOptions.MONTH, timeout: 300, classNames: 'picker', unmountOnExit: true },
                        React.createElement(MonthPicker, { months: this.monthsList, eventsHandlers: this.eventsHandlers, theme: this.theme })),
                    React.createElement(DaysHeader, { theme: this.theme }),
                    React.createElement(PickDay, { pastDaysAmount: getFirstMondayIndex(this.state.selectedMonthIndex, this.state.selectedYear), days: this.state.daysArray, eventsHandlers: this.eventsHandlers, theme: this.theme, selectedYear: this.state.selectedYear, selectedMonthIndex: this.state.selectedMonthIndex }),
                    React.createElement(FooterMenu, { clear: this.clearSelection.bind(this), save: this.saveSelection.bind(this), theme: this.theme, noButtons: this.props.singleSelection })))));
    };
    return MiquidoDatePicker;
}(React.Component));
export default MiquidoDatePicker;
//# sourceMappingURL=MiquidoDatePicker.js.map