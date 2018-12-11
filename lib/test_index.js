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
import * as ReactDOM from 'react-dom';
import { cssRaw } from 'typestyle';
import MiquidoDatePicker from './MiquidoDatePicker/MiquidoDatePicker';
import { tripGateTheme } from './themes/tripgate/tripgate_theme';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faArrowRight, faCaretDown } from '@fortawesome/free-solid-svg-icons';
// import { ITheme } from './themes/theme.interface'
// import { pickingOptions, selectMethods } from './MiquidoDatePicker/enums'
library.add(faArrowLeft);
library.add(faArrowRight);
library.add(faCaretDown);
cssRaw("\n@import url('https://fonts.googleapis.com/css?family=Rubik:300,400,500,700');\n@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');\n\n.picker-enter {\n  opacity: 0.01;\n  transform: scale(0.9) translateY(50%);\n}\n.picker-enter-active {\n  opacity: 1;\n  transform: scale(1) translateY(0%);\n  transition: all 300ms ease-out;\n}\n.picker-exit {\n  opacity: 1;\n  transform: scale(1) translateY(0%);\n}\n.picker-exit-active {\n  opacity: 0.01;\n  transform: scale(0.9) translateY(50%);\n  transition: all 300ms ease-out;\n}\n");
var DuoDate = /** @class */ (function (_super) {
    __extends(DuoDate, _super);
    function DuoDate(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            startDateObj: null
        };
        _this.handleSelect = _this.handleSelect.bind(_this);
        return _this;
    }
    DuoDate.prototype.handleSelect = function (value) {
        this.setState({
            startDateObj: {
                start: new Date(value.year, value.month - 1, value.start),
                display: new Date(value.year, value.month - 1, value.start)
            }
        });
    };
    DuoDate.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(MiquidoDatePicker, __assign({ onSelect: this.handleSelect, theme: tripGateTheme, singleSelection: true, placeholder: 'DD/MM/YYYY' }, (this.state.startDateObj ? { defaultValue: this.state.startDateObj } : undefined))),
            React.createElement(MiquidoDatePicker, __assign({ theme: tripGateTheme }, (this.state.startDateObj ? { defaultValue: this.state.startDateObj } : undefined), { disabled: !Boolean(this.state.startDateObj), placeholder: 'DD/MM/YYYY', showOnlyEnd: true }, (this.state.startDateObj ? { restrictions: { min: this.state.startDateObj.start } } : undefined), { open: Boolean(this.state.startDateObj) }))));
    };
    return DuoDate;
}(React.Component));
export default ReactDOM.render(React.createElement(React.Fragment, null,
    React.createElement(DuoDate, null)), document.getElementById('root'));
//# sourceMappingURL=test_index.js.map