import * as React from 'react';
import { shallow } from 'enzyme';
import SingleSelection from './SingleSelection';
describe('MiquidoDatePicker', function () {
    var defaultValueMock = {
        start: new Date(2018, 11, 5),
        end: new Date(2018, 11, 5),
        display: new Date(2018, 11)
    };
    var wrapper = shallow(React.createElement(SingleSelection, null));
    var wrapperWithDefaultValue = shallow(React.createElement(SingleSelection, { defaultValue: defaultValueMock }));
    var instance = wrapper.instance();
    var instanceWithDefaultValue = wrapperWithDefaultValue.instance();
    beforeEach(function () {
        // @ts-ignore
        instance.initDaysCalendar(11, 2018);
        // @ts-ignore
        instanceWithDefaultValue.initDaysCalendar(11, 2018);
    });
    // it('should initCalendar', () => {
    //   // @ts-ignore
    //   const newDaysArray = wrapper.state().daysArray
    //   expect(newDaysArray).toHaveLength(31)
    //
    // })
    it('should allow picking days as default', function () {
        // @ts-ignore
        expect(wrapper.state().currentlyPicking).toBe('day');
    });
    it('switchToYearSelect should change to year selection', function () {
        // @ts-ignore
        instance.switchToYearSelect();
        // @ts-ignore
        expect(wrapper.state().currentlyPicking).toBe('year');
    });
    it('switchToMonthSelect should change to month', function () {
        // @ts-ignore
        instance.switchToMonthSelect();
        // @ts-ignore
        expect(wrapper.state().currentlyPicking).toBe('month');
    });
    it('getDefaultValue should get default date for no default props', function () {
        // @ts-ignore
        expect(instance.getDefaultValue()).toHaveProperty('display', instance.now);
        // @ts-ignore
        expect(instance.getDefaultValue()).toHaveProperty('start', null);
        // @ts-ignore
        expect(instance.getDefaultValue()).toHaveProperty('end', null);
    });
    it('getDefaultValue should get default date for default props', function () {
        // @ts-ignore
        expect(instanceWithDefaultValue.getDefaultValue()).toHaveProperty('display', defaultValueMock.display);
        // @ts-ignore
        expect(instanceWithDefaultValue.getDefaultValue()).toHaveProperty('start', defaultValueMock.start);
        // @ts-ignore
        expect(instanceWithDefaultValue.getDefaultValue()).toHaveProperty('end', defaultValueMock.end);
    });
    it('handleSingleSelection should select single day', function () {
        var expected = new Date(2018, 11, 7).getTime();
        // @ts-ignore
        instanceWithDefaultValue.handleSingleSelection(6);
        // @ts-ignore
        expect(wrapperWithDefaultValue.state().selectedDate.start.getTime()).toBe(expected);
        // @ts-ignore
        expect(wrapperWithDefaultValue.state().selectedDate.end.getTime()).toBe(expected);
        // @ts-ignore
        // expect(wrapperWithDefaultValue.state().daysArray[index].start).toBe(true)
    });
    it('isStartSelected should return true if start is selected', function () {
        // @ts-ignore
        instanceWithDefaultValue.handleSingleSelection(8);
        // @ts-ignore
        expect(instanceWithDefaultValue.isStartSelected()).toBe(true);
    });
    it('isEndSelected should return true if end is selected', function () {
        // @ts-ignore
        instanceWithDefaultValue.handleSingleSelection(9);
        // @ts-ignore
        expect(instanceWithDefaultValue.isEndSelected()).toBe(true);
    });
    it('clearSelection should clear selectionStart and selectionEnd', function () {
        // @ts-ignore
        instanceWithDefaultValue.clearSelection();
        // @ts-ignore
        expect(wrapperWithDefaultValue.state().selectionStart).toBeUndefined();
        // @ts-ignore
        expect(wrapperWithDefaultValue.state().selectionEnd).toBeUndefined();
    });
    it('updYearInInput should update year in input', function () {
        // @ts-ignore
        var oldInputValue = wrapperWithDefaultValue.state().inputValue;
        var expected = oldInputValue.split('/').slice(0, 2).concat([2023]).join('/');
        // @ts-ignore
        instanceWithDefaultValue.updYearInInput(2023);
        // @ts-ignore
        expect(wrapperWithDefaultValue.state().inputValue).toBe(expected);
    });
    it('updMonthInInput should update month in input', function () {
        // @ts-ignore
        var oldInputValue = wrapperWithDefaultValue.state().inputValue;
        var expected = oldInputValue.split('/');
        expected[1] = 11;
        expected = expected.join('/');
        // @ts-ignore
        instanceWithDefaultValue.updMonthInInput(10);
        // @ts-ignore
        expect(wrapperWithDefaultValue.state().inputValue).toBe(expected);
    });
    it('handleRejection is defined', function () {
        // @ts-ignore
        expect(instanceWithDefaultValue.handleRejection).toBeDefined();
    });
    it('setCalendarPosition should set position styles', function () {
        // @ts-ignore
        instanceWithDefaultValue.setCalendarPosition({
            left: 20, top: 20, right: 20, bottom: 20, width: 200, height: 200
        });
        // @ts-ignore
        expect(instanceWithDefaultValue.positionStyles).toEqual({ left: 0, top: '200px' });
    });
    // it('setRestrictions should defined', () => {
    //   let restrictionMin = new Date(defaultValueMock.display)
    //   restrictionMin.setDate(2)
    //   let restrictionMax = new Date(defaultValueMock.display)
    //   restrictionMax.setDate(28)
    //   // @ts-ignore
    //   const expected = instanceWithDefaultValue.setRestrictions({
    //     min: restrictionMin,
    //     max: restrictionMax
    //   },
    //     // @ts-ignore
    //     wrapperWithDefaultValue.state().daysArray)
    //   // @ts-ignore
    //   expect(expected.some(e => e.disabled === true)).toBe(true)
    //   // @ts-ignore
    //   expect(expected.some(e => e.disabled === false)).toBe(true)
    //
    // })
    // selectWholeMonth (year: number, month: number) {
    //   const start = new Date(year, month + 1, 1).getDate() - 1
    //   const end = getLastDayOfAMonth(year, month)
    //   this.setState({
    //     daysArray: this.selectBetweenTwoDays(start, end,
    //       false,
    //       false)
    //   })
    // }
    //
    // /**
    //  * Handle month change ( right arrow )
    //  *
    //  */
    // async nextButtonHandler () {
    //
    //   if (this.state.currentlyPicking === pickingOptions.YEAR) {
    //     // user is picking year
    //     this.setState({ yearsList: this.getYears(this.state.yearsList[0].name + yearsDisplayedPerScreen) })
    //   } else {
    //     // user is picking month
    //     const oldMonthIndex = this.state.displayedMonthIndex
    //     const newMonthIndex = (oldMonthIndex + 1) % 12
    //
    //     const oldYear = this.state.displayedYear || this.now.getFullYear()
    //     const newYear = newMonthIndex === 0 ? oldYear + 1 : oldYear
    //     this.setState({
    //       displayedMonthIndex: newMonthIndex,
    //       displayedMonth: this.getMonthName(newMonthIndex),
    //       displayedYear: newYear
    //     })
    //     await this.initDaysCalendar(newMonthIndex, newYear)
    //
    //     const selectedDate = this.state.selectedDate
    //
    //     if (checkVisibleCalendarForSelection(selectedDate, newMonthIndex, newYear)) {
    //
    //       if ((selectedDate.start && selectedDate.start.getTime()) !== (selectedDate.end && selectedDate.end.getTime())) {
    //         this.setMultiMonthSelection(newYear, newMonthIndex)
    //       } else {
    //         this.setSingleMonthSelection()
    //       }
    //     }
    //     if (this.props.restrictions) {
    //       this.setState({
    //         daysArray: this.setRestrictions(this.props.restrictions, this.state.daysArray)
    //       })
    //     }
    //   }
    // }
});
//# sourceMappingURL=SingleSelection.test.js.map