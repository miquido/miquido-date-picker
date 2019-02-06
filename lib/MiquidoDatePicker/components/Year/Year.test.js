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
import Year from './Year';
import { tripGateTheme } from '../../../themes/tripgate/tripgate_theme';
describe('Year', function () {
    var mock = {
        months: [],
        theme: tripGateTheme,
        displayValue: 24,
        eventsHandlers: {
            mouseUpHandler: jest.fn(function (x) { return undefined; }),
            mouseDownHandler: jest.fn(function (x) { return undefined; }),
            mouseOverHandler: jest.fn(function (x) { return undefined; }),
            clickHandler: jest.fn(function (x) { return undefined; })
        },
        itemIndex: 23
    };
    var wrapper = shallow(React.createElement(Year, __assign({}, mock)));
    var component = wrapper.find('div');
    it('should render Year', function () {
        expect(component.exists()).toBe(true);
    });
});
//# sourceMappingURL=Year.test.js.map