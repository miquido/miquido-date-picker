import { defaultClassNameShouldBeOverwritten, disableDay, enableDay, generateCalendar, getDaysInMonth, getFirstMondayIndex, selectDate, unselectDate, getClassFor, getDisplayValue, assembleDate, assembleMultiSelectDate, assembleDateForStartOnly, assembleDateForEndOnly, setRawStyles, checkVisibleCalendarForSelection, getLastDayOfAMonth, isNumeric, charWasDeleted, isValidaDayFormat, isValidMonthFormat, isValidYearFormat, isValidDate, replaceCharInText } from './functions';
import { tripGateTheme } from '../themes/tripgate/tripgate_theme';
import { picker } from './MiquidoDatePicker.classname';
describe('functions', function () {
    var dayObjectMock = {
        displayValue: 2,
        selected: false,
        today: false,
        start: false,
        end: false,
        itemIndex: 1,
        date: new Date()
    };
    var dayObjectsArrayMock = [
        {
            displayValue: 1,
            selected: false,
            today: false,
            start: false,
            end: false,
            itemIndex: 0,
            date: new Date(2018, 11, 1)
        },
        {
            displayValue: 2,
            selected: false,
            today: false,
            start: false,
            end: false,
            itemIndex: 1,
            date: new Date(2018, 11, 2)
        },
        {
            displayValue: 3,
            selected: false,
            today: false,
            start: false,
            end: false,
            itemIndex: 2,
            date: new Date(2018, 11, 3)
        },
        {
            displayValue: 4,
            selected: false,
            today: false,
            start: false,
            end: false,
            itemIndex: 3,
            date: new Date(2018, 11, 4)
        },
        {
            displayValue: 5,
            selected: false,
            today: false,
            start: false,
            end: false,
            itemIndex: 4,
            date: new Date(2018, 11, 5)
        },
        {
            displayValue: 6,
            selected: false,
            today: false,
            start: false,
            end: false,
            itemIndex: 5,
            date: new Date(2018, 11, 6)
        },
        {
            displayValue: 7,
            selected: false,
            today: false,
            start: false,
            end: false,
            itemIndex: 6,
            date: new Date(2018, 11, 7)
        },
        {
            displayValue: 8,
            selected: false,
            today: false,
            start: false,
            end: false,
            itemIndex: 7,
            date: new Date(2018, 11, 8)
        },
        {
            displayValue: 9,
            selected: false,
            today: false,
            start: false,
            end: false,
            itemIndex: 8,
            date: new Date(2018, 11, 9)
        },
        {
            displayValue: 10,
            selected: false,
            today: false,
            start: false,
            end: false,
            itemIndex: 9,
            date: new Date(2018, 11, 10)
        },
        {
            displayValue: 11,
            selected: false,
            today: false,
            start: false,
            end: false,
            itemIndex: 10,
            date: new Date(2018, 11, 11)
        },
        {
            displayValue: 12,
            selected: false,
            today: false,
            start: false,
            end: false,
            itemIndex: 11,
            date: new Date(2018, 11, 12)
        },
        {
            displayValue: 13,
            selected: false,
            today: false,
            start: false,
            end: false,
            itemIndex: 12,
            date: new Date(2018, 11, 13)
        },
        {
            displayValue: 14,
            selected: false,
            today: false,
            start: false,
            end: false,
            itemIndex: 13,
            date: new Date(2018, 11, 14)
        },
        {
            displayValue: 15,
            selected: false,
            today: false,
            start: false,
            end: false,
            itemIndex: 14,
            date: new Date(2018, 11, 15)
        },
        {
            displayValue: 16,
            selected: false,
            today: false,
            start: false,
            end: false,
            itemIndex: 15,
            date: new Date(2018, 11, 16)
        },
        {
            displayValue: 17,
            selected: false,
            today: false,
            start: false,
            end: false,
            itemIndex: 16,
            date: new Date(2018, 11, 17)
        },
        {
            displayValue: 18,
            selected: false,
            today: false,
            start: false,
            end: false,
            itemIndex: 17,
            date: new Date(2018, 11, 18)
        },
        {
            displayValue: 19,
            selected: false,
            today: false,
            start: false,
            end: false,
            itemIndex: 18,
            date: new Date(2018, 11, 19)
        },
        {
            displayValue: 20,
            selected: false,
            today: false,
            start: false,
            end: false,
            itemIndex: 19,
            date: new Date(2018, 11, 20)
        },
        {
            displayValue: 21,
            selected: false,
            today: false,
            start: false,
            end: false,
            itemIndex: 20,
            date: new Date(2018, 11, 21)
        },
        {
            displayValue: 22,
            selected: false,
            today: false,
            start: false,
            end: false,
            itemIndex: 21,
            date: new Date(2018, 11, 22)
        },
        {
            displayValue: 23,
            selected: false,
            today: false,
            start: false,
            end: false,
            itemIndex: 22,
            date: new Date(2018, 11, 23)
        },
        {
            displayValue: 24,
            selected: false,
            today: false,
            start: false,
            end: false,
            itemIndex: 23,
            date: new Date(2018, 11, 24)
        },
        {
            displayValue: 25,
            selected: false,
            today: false,
            start: false,
            end: false,
            itemIndex: 24,
            date: new Date(2018, 11, 25)
        },
        {
            displayValue: 26,
            selected: false,
            today: false,
            start: false,
            end: false,
            itemIndex: 25,
            date: new Date(2018, 11, 26)
        },
        {
            displayValue: 27,
            selected: false,
            today: false,
            start: false,
            end: false,
            itemIndex: 26,
            date: new Date(2018, 11, 27)
        },
        {
            displayValue: 28,
            selected: false,
            today: false,
            start: false,
            end: false,
            itemIndex: 27,
            date: new Date(2018, 11, 28)
        },
        {
            displayValue: 29,
            selected: false,
            today: false,
            start: false,
            end: false,
            itemIndex: 28,
            date: new Date(2018, 11, 29)
        },
        {
            displayValue: 30,
            selected: false,
            today: false,
            start: false,
            end: false,
            itemIndex: 29,
            date: new Date(2018, 11, 30)
        },
        {
            displayValue: 31,
            selected: false,
            today: false,
            start: false,
            end: false,
            itemIndex: 30,
            date: new Date(2018, 11, 31)
        }
    ];
    // ------------- selectDate -------------
    it('selectDate should return day with selected: true', function () {
        expect(selectDate(dayObjectMock)).toHaveProperty('selected', true);
    });
    // ------------- unselectDate -------------
    it('unselectDate should return day with selected: false', function () {
        expect(unselectDate(dayObjectMock)).toHaveProperty('selected', false);
    });
    // ------------- disableDay -------------
    it('disableDay should return day with disabled: true', function () {
        expect(disableDay(dayObjectMock)).toHaveProperty('disabled', true);
    });
    // ------------- enableDay -------------
    it('enableDay should return day with disabled: false', function () {
        expect(enableDay(dayObjectMock)).toHaveProperty('disabled', false);
    });
    // ------------- getDaysInMonth -------------
    it('getDaysInMonth should return number of days in month', function () {
        expect(getDaysInMonth(11, 2018)).toEqual(31);
    });
    // ------------- generateCalendar -------------
    it('generateCalendar should return array of day objects', function () {
        expect(generateCalendar(11, 2018)).toBeInstanceOf(Array);
        expect(Object.keys(generateCalendar(11, 2018)[0]).sort()).toEqual(Object.keys(dayObjectMock).sort());
    });
    it('generateCalendar should return array with correct length', function () {
        expect(generateCalendar(11, 2018)).toHaveLength(31);
    });
    it('generateCalendar should mark today', function () {
        var now = new Date();
        var indexOfCurrentDay = now.getDate() - 1;
        expect(generateCalendar(now.getMonth(), now.getFullYear())[indexOfCurrentDay])
            .toHaveProperty('today', true);
    });
    // ------------- getFirstMondayIndex -------------
    it('getFirstMondayIndex should return index of first monday ( duh )', function () {
        var firstMondayIndex = 3; // first monday index for december 2018
        expect(getFirstMondayIndex(11, 2018)).toBe(firstMondayIndex);
    });
    // ------------- defaultClassNameShouldBeOverwritten -------------
    it('defaultClassNameShouldBeOverwritten check if class should be overwritten', function () {
        expect(defaultClassNameShouldBeOverwritten(tripGateTheme, 'picker')).toBe(true);
        expect(defaultClassNameShouldBeOverwritten(tripGateTheme, 'not_existing_key')).toBe(false);
        expect(defaultClassNameShouldBeOverwritten(undefined, 'picker')).toBe(false);
    });
    // ------------- getClassFor -------------
    it('getClassFor should return className from theme if provided', function () {
        var getClassObjectWithTheme = {
            key: 'picker',
            theme: tripGateTheme,
            defaultClass: picker
        };
        var expected = tripGateTheme['picker'];
        expect(getClassFor(getClassObjectWithTheme)).toEqual(expected);
    });
    it('getClassFor should return default className if there is no theme provided', function () {
        var getClassObjectNoTheme = {
            key: 'picker',
            defaultClass: picker
        };
        expect(getClassFor(getClassObjectNoTheme)).toEqual(picker);
    });
    // ------------- getDisplayValue -------------
    it('getDisplayValue should return display value', function () {
        expect(getDisplayValue(dayObjectsArrayMock, 0)).toEqual(1);
    });
    // ------------- assembleDate -------------
    it('assembleDate should return correct date', function () {
        expect(assembleDate(1, 1, 11, 2018)).toEqual('01/12/2018');
    });
    it('assembleDate should return empty string if there is no end date', function () {
        expect(assembleDate(1, undefined, 11, 2018)).toEqual('');
    });
    it('assembleDate should return correct date if end and start are reversed', function () {
        expect(assembleDate(2, 1, 11, 2018)).toEqual('');
    });
    it('assembleDate should return single date if start and end are equal', function () {
        expect(assembleDate(1, 1, 11, 2018)).toEqual('01/12/2018');
    });
    it('assembleDate should add zero if day is below 10', function () {
        expect(assembleDate(1, 1, 11, 2018)).toEqual('01/12/2018');
    });
    it('assembleDate should add zero if month is below 10', function () {
        expect(assembleDate(1, 1, 1, 2018)).toEqual('01/02/2018');
    });
    it('assembleDate should return month number not index', function () {
        var monthIndex = 0;
        expect(assembleDate(1, 1, monthIndex, 2018)).toEqual("01/0" + (monthIndex + 1) + "/2018");
    });
    // ------------- assembleMultiSelectDate -------------
    it('assembleMultiSelectDate return correct date', function () {
        expect(assembleMultiSelectDate(new Date(2018, 11, 0), new Date(2019, 0, 1)))
            .toEqual('30/11/2018-01/01/2019');
    });
    it('assembleMultiSelectDate should add 0 if start day is lower than 10', function () {
        expect(assembleMultiSelectDate(new Date(2018, 11, 1), new Date(2019, 0, 1)))
            .toEqual('01/12/2018-01/01/2019');
    });
    it('assembleMultiSelectDate should add 0 if start month is lower than 10', function () {
        expect(assembleMultiSelectDate(new Date(2018, 0, 1), new Date(2019, 0, 1)))
            .toEqual('01/01/2018-01/01/2019');
    });
    it('assembleMultiSelectDate should add 0 if end day is lower than 10', function () {
        expect(assembleMultiSelectDate(new Date(2018, 0, 1), new Date(2019, 0, 1)))
            .toEqual('01/01/2018-01/01/2019');
    });
    it('assembleMultiSelectDate should add 0 if end month is lower than 10', function () {
        expect(assembleMultiSelectDate(new Date(2018, 0, 1), new Date(2019, 0, 1)))
            .toEqual('01/01/2018-01/01/2019');
    });
    // ------------- assembleDateForStartOnly -------------
    it('assembleDateForStartOnly return correct start date', function () {
        expect(assembleDateForStartOnly(new Date(2018, 11, 0)))
            .toEqual('31/11/2018');
    });
    // ------------- assembleDateForEndOnly -------------
    it('assembleDateForEndOnly return correct end date', function () {
        expect(assembleDateForEndOnly(new Date(2018, 11, 0)))
            .toEqual('31/11/2018');
    });
    // ------------- setRawStyles -------------
    it('setRawStyles to set animation styles', function () {
        expect(setRawStyles).toBeDefined();
    });
    // ------------- checkVisibleCalendarForSelection -------------
    it('checkVisibleCalendarForSelection should return true if selection is in display range', function () {
        var selectedDate = {
            start: new Date(2018, 11, 1),
            end: new Date(2018, 11, 15),
            display: new Date(2018, 11)
        };
        expect(checkVisibleCalendarForSelection(selectedDate, 11, 2018))
            .toEqual(true);
    });
    it('checkVisibleCalendarForSelection should return false if selection is out of display range', function () {
        var selectedDate = {
            start: new Date(2018, 11, 1),
            end: new Date(2018, 11, 15),
            display: new Date(2018, 11)
        };
        expect(checkVisibleCalendarForSelection(selectedDate, 2, 2018))
            .toEqual(false);
    });
    // ------------- getLastDayOfAMonth -------------
    it('getLastDayOfAMonth should return index of last day of a month', function () {
        expect(getLastDayOfAMonth(2018, 11)).toEqual(31);
        expect(getLastDayOfAMonth(2018, 1)).toEqual(28);
    });
    // ------------- isNumeric -------------
    it('isNumeric should return true for valid number', function () {
        expect(isNumeric(2)).toEqual(true);
        expect(isNumeric(3.14)).toEqual(true);
        expect(isNumeric(11233423536456)).toEqual(true);
        expect(isNumeric(.23)).toEqual(true);
        expect(isNumeric('1.23')).toEqual(true);
    });
    it('isNumeric should return false for invalid number', function () {
        expect(isNumeric('a')).toEqual(false);
        expect(isNumeric(NaN)).toEqual(false);
        expect(isNumeric([])).toEqual(false);
        expect(isNumeric({})).toEqual(false);
    });
    // ------------- charWasDeleted -------------
    it('charWasDeleted should compare two strings length and return true if current is shorter', function () {
        expect(charWasDeleted('asd', 'as')).toEqual(true);
    });
    it('charWasDeleted should compare two strings length and return false if current is longer or equal', function () {
        expect(charWasDeleted('asd', 'asd')).toEqual(false);
        expect(charWasDeleted('asd', 'asdf')).toEqual(false);
    });
    // ------------- isValidaDayFormat -------------
    it('isValidaDayFormat should check format for number or string', function () {
        expect(isValidaDayFormat(23, 31)).toEqual(true);
        expect(isValidaDayFormat('23', 31)).toEqual(true);
    });
    it('isValidaDayFormat should return false for empty string', function () {
        expect(isValidaDayFormat('', 31)).toEqual(false);
    });
    it('isValidaDayFormat should return false for no number values', function () {
        expect(isValidaDayFormat('NAN', 31)).toEqual(false);
    });
    it('isValidaDayFormat should return false if value doesnt match pattern', function () {
        expect(isValidaDayFormat(1, 31)).toEqual(false);
    });
    it('isValidaDayFormat should return false if value extends days in month', function () {
        expect(isValidaDayFormat(50, 31)).toEqual(false);
    });
    // ------------- isValidMonthFormat -------------
    it('isValidMonthFormat should check format for number or string', function () {
        expect(isValidMonthFormat(10)).toEqual(true);
        expect(isValidMonthFormat('07')).toEqual(true);
    });
    it('isValidMonthFormat should return false for empty string', function () {
        expect(isValidMonthFormat('')).toEqual(false);
    });
    it('isValidMonthFormat should return false for no number values', function () {
        expect(isValidMonthFormat('NAN')).toEqual(false);
    });
    it('isValidMonthFormat should return false if value doesnt match pattern', function () {
        expect(isValidMonthFormat(1)).toEqual(false);
    });
    it('isValidMonthFormat should return false if value extends 12', function () {
        expect(isValidMonthFormat(50)).toEqual(false);
    });
    // ------------- isValidYearFormat -------------
    it('isValidYearFormat should check format for number or string', function () {
        expect(isValidYearFormat(2023)).toEqual(true);
        expect(isValidYearFormat('2099')).toEqual(true);
    });
    it('isValidYearFormat should return false for empty string', function () {
        expect(isValidYearFormat('')).toEqual(false);
    });
    it('isValidYearFormat should return false for no number values', function () {
        expect(isValidYearFormat('NAN')).toEqual(false);
    });
    it('isValidYearFormat should return false if value doesnt match pattern', function () {
        expect(isValidYearFormat(1)).toEqual(false);
    });
    // ------------- isValidDate -------------
    it('isValidDate should return true if value match pattern', function () {
        expect(isValidDate('11/11/2018')).toEqual(true);
    });
    it('isValidDate should return false if value doesnt match pattern', function () {
        expect(isValidDate('2018/11/11')).toEqual(false);
    });
    // ------------- replaceCharInText -------------
    it('replaceCharInText should replace char in text at given position', function () {
        expect(replaceCharInText(2, 'test to replace', 'a')).toEqual('tast to replace');
    });
    it('replaceCharInText should return orginal text if position is not valid', function () {
        expect(replaceCharInText(NaN, 'test to replace', 'a')).toEqual('test to replace');
    });
    it('replaceCharInText should return orginal text if position is bigger than text length', function () {
        expect(replaceCharInText(2000, 'test to replace', 'a')).toEqual('test to replace');
    });
});
//# sourceMappingURL=functions.test.js.map