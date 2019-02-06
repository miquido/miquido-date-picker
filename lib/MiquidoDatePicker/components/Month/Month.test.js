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
import Month from './Month';
import { tripGateTheme } from '../../../themes/tripgate/tripgate_theme';
describe('Month', function () {
    var mock = {
        displayValue: 'may',
        itemIndex: 4,
        theme: tripGateTheme
    };
    var wrapper = shallow(React.createElement(Month, __assign({}, mock)));
    var component = wrapper.find('div');
    it('should render Month', function () {
        expect(component.exists()).toBe(true);
        expect(component.exists()).toBe(true);
    });
});
//# sourceMappingURL=Month.test.js.map