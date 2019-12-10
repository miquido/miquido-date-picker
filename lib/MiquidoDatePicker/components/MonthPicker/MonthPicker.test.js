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
import MonthPicker from './MonthPicker';
import { tripGateTheme } from '../../../themes/tripgate/tripgate_theme';
describe('MonthPicker', function () {
    var mock = {
        months: [],
        theme: tripGateTheme,
        displayedYear: 2019
    };
    var wrapper = shallow(React.createElement(MonthPicker, __assign({}, mock)));
    var component = wrapper.find('div');
    it('should render MonthPicker', function () {
        expect(component.exists()).toBe(true);
        expect(component.exists()).toBe(true);
    });
});
//# sourceMappingURL=MonthPicker.test.js.map