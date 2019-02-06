import * as React from 'react';
var InputComponent = function (props) {
    var children = props.children, inputValue = props.inputValue, inputClass = props.inputClass, onClickHandler = props.onClickHandler, onChangeHandler = props.onChangeHandler, disabled = props.disabled, placeholder = props.placeholder, name = props.name;
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
            autoComplete: 'off'
        }));
    }
    else {
        return (React.createElement("input", { type: 'text', autoComplete: 'off', value: inputValue, className: "miquido-date-picker__input " + inputClass, onClick: onClickHandler, onChange: onChangeHandler, disabled: disabled, placeholder: placeholder, name: name }));
    }
};
export default InputComponent;
//# sourceMappingURL=InputComponent.js.map