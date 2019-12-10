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
import FooterMenu from './FooterMenu';
describe('FooterMenu', function () {
    var mock = {
        clear: jest.fn(function (x) { return undefined; }),
        save: jest.fn(function (x) { return undefined; })
    };
    var wrapper = shallow(React.createElement(FooterMenu, __assign({}, mock)));
    var component = wrapper.find('div');
    it('should render FooterMenu', function () {
        expect(component.exists()).toBe(true);
        expect(component.exists()).toBe(true);
    });
});
//# sourceMappingURL=FooterMenu.test.js.map