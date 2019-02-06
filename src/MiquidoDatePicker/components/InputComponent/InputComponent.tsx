import * as React from 'react'

interface IInputComponent {
  children?: React.ReactElement<any>
  inputValue: string
  inputClass: string
  onClickHandler: (event: React.MouseEvent<HTMLInputElement>) => void
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  placeholder?: string
  name: string
}

const InputComponent = (props: IInputComponent) => {
  const {
    children, inputValue,
    inputClass,
    onClickHandler,
    onChangeHandler,
    disabled,
    placeholder,
    name
  } = props
  if (children) {
    return (React.cloneElement(
      children, {
        defaultValue: inputValue,
        value: inputValue,
        className: `miquido-date-picker__input ${inputClass}`,
        onClick: onClickHandler,
        onChange: onChangeHandler,
        disabled: disabled,
        placeholder: placeholder,
        name: name,
        autoComplete: 'off'
      }))
  } else {
    return (<input type='text'
                   autoComplete='off'
                   value={inputValue}
                   className={`miquido-date-picker__input ${inputClass}`}
                   onClick={onClickHandler}
                   onChange={onChangeHandler}
                   disabled={disabled}
                   placeholder={placeholder}
                   name={name}
    />)
  }
}

export default InputComponent
