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
import YearPicker from './YearPicker';
import { tripGateTheme } from '../../../themes/tripgate/tripgate_theme';
describe('YearPicker', function () {
    var mock = {
        years: [],
        theme: tripGateTheme
    };
    var wrapper = shallow(React.createElement(YearPicker, __assign({}, mock)));
    var component = wrapper.find('div');
    it('should render YearPicker', function () {
        expect(component.exists()).toBe(true);
    });
});
//# sourceMappingURL=YearPicker.test.js.map