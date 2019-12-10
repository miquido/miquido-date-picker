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
  isVisible?: boolean
}

class InputComponent extends React.Component<IInputComponent, {}> {
  _input: any
  constructor (props: any) {
    super(props)
    this._input = React.createRef()
  }

  componentDidUpdate (prevProps: any, prevState: any) {
    if (this.props.isVisible === true) {
      this._input.focus()
    } else {
      this._input.blur()
    }
  }

  render () {
    const {
      children, inputValue,
      inputClass,
      onClickHandler,
      onChangeHandler,
      disabled,
      placeholder,
      name
    } = this.props
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
          'data-test': 'picker-input',
          autoComplete: 'off',
          ref: (c: any) => {
            return (this._input = c)
          }
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
                     data-test='picker-input'
                     ref={(c: any) => (this._input = c)}
      />)
    }
  }
}

export default InputComponent
