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
var InputComponent = /** @class */ (function (_super) {
    __extends(InputComponent, _super);
    function InputComponent(props) {
        var _this = _super.call(this, props) || this;
        _this._input = React.createRef();
        return _this;
    }
    InputComponent.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.props.isVisible === true) {
            this._input.focus();
        }
        else {
            this._input.blur();
        }
    };
    InputComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props, children = _a.children, inputValue = _a.inputValue, inputClass = _a.inputClass, onClickHandler = _a.onClickHandler, onChangeHandler = _a.onChangeHandler, disabled = _a.disabled, placeholder = _a.placeholder, name = _a.name;
        if (children) {
            return (React.cloneElement(children, {
                defaultValue: inputValue,
                value: inputValue,
                className: "miquido-date-picker__input " + inputClass,
                onClick: onClickHandler,
                onChange: onChangeHandler,
                disabled: disabled,
                placeholder: placeholder,
                name: name,
                'data-test': 'picker-input',
                autoComplete: 'off',
                ref: function (c) {
                    return (_this._input = c);
                }
            }));
        }
        else {
            return (React.createElement("input", { type: 'text', autoComplete: 'off', value: inputValue, className: "miquido-date-picker__input " + inputClass, onClick: onClickHandler, onChange: onChangeHandler, disabled: disabled, placeholder: placeholder, name: name, "data-test": 'picker-input', ref: function (c) { return (_this._input = c); } }));
        }
    };
    return InputComponent;
}(React.Component));
export default InputComponent;
//# sourceMappingURL=InputComponent.js.map