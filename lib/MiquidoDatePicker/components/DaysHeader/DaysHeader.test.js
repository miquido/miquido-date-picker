import * as React from 'react';
import { shallow } from 'enzyme';
import DaysHeader from './DaysHeader';
describe('DaysHeader', function () {
    var wrapper = shallow(React.createElement(DaysHeader, null));
    var component = wrapper.find('div');
    it('should render DaysHeader', function () {
        expect(component.exists()).toBe(true);
        expect(component.exists()).toBe(true);
    });
});
//# sourceMappingURL=DaysHeader.test.js.map