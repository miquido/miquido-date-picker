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
import * as React from 'react';
import { shallow } from 'enzyme';
import Day from './Day';
import { tripGateTheme } from '../../../themes/tripgate/tripgate_theme';
describe('Day', function () {
    var mockPropsAllTrue = {
        key: 'string',
        displayValue: 'display value',
        itemIndex: 12,
        selected: true,
        today: true,
        start: true,
        end: true,
        disabled: true,
        theme: tripGateTheme
    };
    var mockPropsAllFalse = {
        key: 'string',
        displayValue: 'display value',
        itemIndex: 12,
        selected: false,
        today: false,
        start: false,
        end: false,
        disabled: false,
        theme: tripGateTheme
    };
    var mockPropsSelected = {
        key: 'string',
        displayValue: 'display value',
        itemIndex: 12,
        selected: true,
        today: true,
        start: false,
        end: false,
        disabled: false,
        theme: tripGateTheme
    };
    var wrapper = shallow(React.createElement(Day, __assign({}, mockPropsAllTrue)));
    var wrapperFalse = shallow(React.createElement(Day, __assign({}, mockPropsAllFalse)));
    var wrapperSelected = shallow(React.createElement(Day, __assign({}, mockPropsSelected)));
    var component = wrapper.find('div');
    var componentFalse = wrapperFalse.find('div');
    var componentSelected = wrapperSelected.find('div');
    it('should render Day', function () {
        expect(component.exists()).toBe(true);
        expect(componentFalse.exists()).toBe(true);
    });
    it('should have base classname', function () {
        expect(component.hasClass(tripGateTheme.dayItem)).toBe(true);
    });
    it('should have classname for selected', function () {
        expect(componentSelected.hasClass(tripGateTheme.selected.day)).toBe(true);
        expect(componentFalse.hasClass(tripGateTheme.selected.day)).toBe(false);
    });
    it('should have classname for today', function () {
        expect(component.hasClass(tripGateTheme.status.today)).toBe(true);
        expect(componentFalse.hasClass(tripGateTheme.status.today)).toBe(false);
    });
    it('should have classname for selection end', function () {
        expect(component.hasClass(tripGateTheme.status.selectionEnd)).toBe(true);
        expect(componentFalse.hasClass(tripGateTheme.status.selectionEnd)).toBe(false);
    });
    it('should have classname for selection start', function () {
        expect(component.hasClass(tripGateTheme.status.selectionEnd)).toBe(true);
        expect(componentFalse.hasClass(tripGateTheme.status.selectionEnd)).toBe(false);
    });
    it('should have classname for disabled', function () {
        expect(component.hasClass(tripGateTheme.status.disabled)).toBe(true);
        expect(componentFalse.hasClass(tripGateTheme.status.disabled)).toBe(false);
    });
    it('should have content from props', function () {
        expect(component.text()).toEqual(mockPropsAllTrue.displayValue);
    });
});
//# sourceMappingURL=Day.test.js.map