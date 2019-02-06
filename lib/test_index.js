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
import * as ReactDOM from 'react-dom';
import { cssRaw } from 'typestyle';
import MiquidoDatePicker from './MiquidoDatePicker/MiquidoDatePicker';
// import { tripGateTheme } from './themes/tripgate/tripgate_theme'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faArrowRight, faCaretDown } from '@fortawesome/free-solid-svg-icons';
// import {
//   IDefaultValue
// } from './MiquidoDatePicker/interfaces'
// import { ITheme } from './themes/theme.interface'
// import { pickingOptions, selectMethods } from './MiquidoDatePicker/enums'
library.add(faArrowLeft);
library.add(faArrowRight);
library.add(faCaretDown);
cssRaw("\n@import url('https://fonts.googleapis.com/css?family=Rubik:300,400,500,700');\n@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');\n\n.picker-enter {\n  opacity: 0.01;\n  transform: scale(0.9) translateY(50%);\n}\n.picker-enter-active {\n  opacity: 1;\n  transform: scale(1) translateY(0%);\n  transition: all 300ms ease-out;\n}\n.picker-exit {\n  opacity: 1;\n  transform: scale(1) translateY(0%);\n}\n.picker-exit-active {\n  opacity: 0.01;\n  transform: scale(0.9) translateY(50%);\n  transition: all 300ms ease-out;\n}\n");
var TestInjection = /** @class */ (function (_super) {
    __extends(TestInjection, _super);
    function TestInjection(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            date: new Date(2018, 11),
            start: new Date(2018, 11, 3),
            end: new Date(2018, 11, 3)
        };
        setTimeout(function () { return _this.setState({
            date: new Date(2018, 4),
            start: new Date(2018, 11, 4),
            end: new Date(2018, 11, 4)
        }); }, 1000);
        return _this;
    }
    TestInjection.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(MiquidoDatePicker, { defaultValue: {
                    // @ts-ignore
                    display: this.state.date,
                    // @ts-ignore
                    start: this.state.start,
                    // @ts-ignore
                    end: this.state.end
                }, type: 'single', inputClass: 'testingclass123' })));
    };
    return TestInjection;
}(React.Component));
export default ReactDOM.render(React.createElement(React.Fragment, null,
    React.createElement(MiquidoDatePicker, { restrictions: {
            start: {
                min: new Date(2018, 11, 4),
                max: new Date(2018, 11, 24)
            },
            end: {
                min: new Date(2018, 11, 3),
                max: new Date(2018, 11, 15)
            }
        }, defaultValue: {
            start: new Date(2018, 11, 5),
            end: new Date(2018, 11, 6),
            display: new Date(2018, 11)
        }, type: 'double', inputClass: 'testingclass123' }),
    React.createElement(TestInjection, null)), document.getElementById('root'));
//# sourceMappingURL=test_index.js.map