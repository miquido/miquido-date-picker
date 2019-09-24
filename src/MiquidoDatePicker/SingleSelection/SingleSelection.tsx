import * as React from 'react'
import HeaderMenu from './../components/HeaderMenu/HeaderMenu'
import YearPicker from './../components/YearPicker/YearPicker'
import MonthPicker from './../components/MonthPicker/MonthPicker'
import DaysHeader from './../components/DaysHeader/DaysHeader'
import PickDay from './../components/DayPicker/DayPicker'
import FooterMenu from './../components/FooterMenu/FooterMenu'
import {
  IDefaultValue,
  IMonthObject,
  IYearObject,
  Props,
  SingleSelectionState
} from '../interfaces'
import { pickerPositions, pickingOptions } from '../enums'
import { monthNames, yearsDisplayedPerScreen, animationDuration } from '../consts'
import {
  assembleDate, assembleDateForEndOnly,
  assembleDateForStartOnly,
  assembleMultiSelectDate,
  getClassFor, getDayOfTheWeek, objectEquals,
  setRawStyles
} from '../functions'
import { picker, pickerWrapper } from './../MiquidoDatePicker.classname'
import { defaultTheme } from '../../themes/default/default_theme'
import { CSSTransition } from 'react-transition-group'
import InputComponent from './../components/InputComponent/InputComponent'
import { isValidToSelect, newDateFromParsed, parseDate, setCorrectTypedValue } from '../inputFunctions'

class SingleSelection extends React.Component<Props, SingleSelectionState> {
  now = new Date()
  currentMonth = this.now.getMonth()
  theme = {}
  monthsList: IMonthObject[]
  userSavedDate = false
  private node: any
  private positionStyles: any

  constructor (props: Props) {
    super(props)

    this.state = {
      isPickerVisible: false,
      currentlyPicking: pickingOptions.DAY,
      displayedMonthIndex: this.getInitialMonth(),
      displayedYear: this.getInitialYear(),
      inputValue: '',
      userSelectedDaysBefore: !!this.props.defaultValue,
      yearsList: [], // TODO remove
      selectedDate: this.getDefaultValue(),
      disabled: !!props.disabled,
      userForcedClose: false,
      inputClass: props.inputClass || ''
    }
    this.theme = props.theme || defaultTheme
    this.node = React.createRef()
    this.positionStyles = {}
    this.monthsList = this.getMonths() // TODO move to components

    this.switchToYearSelect = this.switchToYearSelect.bind(this)
    this.switchToMonthSelect = this.switchToMonthSelect.bind(this)
    this.nextButtonHandler = this.nextButtonHandler.bind(this)
    this.prevButtonHandler = this.prevButtonHandler.bind(this)
    this.showPicker = this.props.children ? this.showPicker.bind(this, this.props.children.props) : this.showPicker.bind(this)
    this.handleChange = this.props.children ? this.handleChange.bind(this, this.props.children.props) : this.handleChange.bind(this)
    this.saveSelection = this.saveSelection.bind(this)
    this.closePicker = this.closePicker.bind(this)
    this.onInputClickHandler = this.onInputClickHandler.bind(this)
  }

  handleRejection (error: Error) {
    console.trace('handle Rejection')
    console.error(error)
  }

  /**
   * Supports click on days
   *
   * @param index index of a day
   */
  clickHandler = (index: number) => {
    this.setState({ userSelectedDaysBefore: true })
    this.handleSingleSelection(index)
  }
  /**
   * Supports click outside picker
   */
  clickOutsideHandler: EventListenerOrEventListenerObject = (e) => {
    if (!this.node.current || !this.node.current.contains(e.target)) {
      this.closePicker()
    }
  }
  /**
   * Supports mouse down on days
   *
   * @param index index of a day
   */
  mouseDownHandler = (index: number) => {
    // window.document.addEventListener('mouseup', this._onMouseUp)
  }
  /**
   * Supports mouse up on days
   *
   * @param index index of a day
   */
  mouseUpHandler = (index: number) => {
    // window.document.removeEventListener('mouseup', this._onMouseUp)
  }
  /**
   * Get array of month objects
   *
   * @return array of month objects
   */
  getMonths = (): IMonthObject[] => {
    return monthNames.map((monthName: string, index: number): IMonthObject => {
      return {
        name: monthName,
        itemIndex: index,
        selected: this.getMonthName(this.state.displayedMonthIndex) === monthName,
        eventsHandlers: this.monthEventsHandlers,
        theme: this.theme
      }
    })
  }
  /**
   * Get array of year objects
   *
   * @return array of year objects
   */
  getYears = (firstYear: number): IYearObject[] => {
    const years = []

    for (let i = 0; i < yearsDisplayedPerScreen; i++) {
      const year = firstYear + i
      if (year > 0) {
        years.push({
          name: year,
          selected: this.state.displayedYear === year,
          eventsHandlers: this.yearEventsHandlers,
          itemIndex: i
        })
      }
    }

    return years
  }
  /**
   * Supports mouse up event
   * detects if mouse up was on picker or outside ( and close it if so )
   *
   * @param e event listener object
   */
  _onMouseUp: EventListenerOrEventListenerObject = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!this.node.current || !this.node.current.contains(e.target)) {
      this.closePicker()
    }

  }

  getDefaultValue () {
    const defaultValue = this.props.defaultValue
    if (defaultValue && defaultValue.end && (defaultValue.start && defaultValue.start.getTime() > defaultValue.end.getTime())) {
      [defaultValue.start, defaultValue.end] = [defaultValue.end, defaultValue.start]
    }
    return defaultValue || { start: null, end: null, display: this.now }
  }

  getInitialMonth () {
    if (!this.props.defaultValue) return this.currentMonth
    return this.props.defaultValue.display.getMonth()
  }

  getInitialYear () {
    return (this.props.defaultValue && this.props.defaultValue.display.getFullYear()) || this.now.getFullYear()
  }

  /**
   * Get month name from array
   *
   * @param index index of month from 0 to 11
   */
  getMonthName (index: number) {
    if (!Number.isInteger(index)) {
      return monthNames[this.now.getMonth() + 1]
    } else {
      return monthNames[index]
    }
  }

  componentWillMount () {
    setRawStyles()
    if (this.props.defaultValue) {
      this.currentMonth = this.props.defaultValue.display.getMonth()
      this.setState({
        inputValue: this.setDefaultDate(this.props.defaultValue),
        defaultValue: this.props.defaultValue
      })
    }
    if (this.props.restrictions) {
      if (this.state.defaultValue && this.state.defaultValue.start &&
        (this.props.restrictions && this.props.restrictions.min &&
          (this.props.restrictions.min > this.state.defaultValue.start))) {
        try {
          throw new Error(`Default date can't be lower than min allowed date`)
        } catch (e) {
          this.handleRejection(e)
        }
      }
    }
    if (this.state.defaultValue &&
      (this.state.defaultValue.start && this.state.defaultValue.start.getTime() !== (this.state.defaultValue.end && this.state.defaultValue.end.getTime()))) {
      try {
        throw new Error(`Start and End should be the same for single selection`)
      } catch (e) {
        this.handleRejection(e)
      }
    }
  }

  componentWillUnmount () {
    document.removeEventListener('mousedown', this._onMouseUp, false)
  }

  componentDidUpdate (prevProps: any) {
    const oldDefault = prevProps.defaultValue
    const newDefault = this.props.defaultValue

    if (!objectEquals(oldDefault, newDefault)) {
      if (newDefault) {
        const newInputValue = this.setDefaultDate(newDefault) ? this.setDefaultDate(newDefault) : ''
        const newMonth = newDefault.display
        const newDisplayMonthIndex = (Number.isInteger(newMonth.getMonth())) ? newMonth.getMonth() : this.now.getMonth()
        const updState = {
          inputValue: newInputValue,
          selectedDate: {
            ...prevProps.defaultValue
          },
          displayedMonthIndex: newDisplayMonthIndex,
          displayedYear: newDefault.display.getFullYear() || this.now.getFullYear(),
          inputClass: this.props.inputClass || ''
        }
        this.setState(updState)
        void this.init()
      }

    }
  }

  componentWillUpdate (newProps: any, newState: any) {
    if (newProps.disabled !== undefined && this.state.disabled !== newProps.disabled) {
      this.setState({ disabled: newProps.disabled })
    }
    if (newState.userForcedClose !== this.state.userForcedClose) {
      this.setState({ userForcedClose: newState.userForcedClose })
    }
    if (newProps.open === true && !this.state.isPickerVisible && !this.state.userForcedClose) {
      this.showPicker()
    }
    if (newProps.close === true && this.state.isPickerVisible) {
      this.closePicker()
    }
  }

  componentDidMount () {
    void this.init().catch(this.handleRejection)
  }

  async init () {
    if (this.node && this.node.current) {
      this.setCalendarPosition(this.node.current.getBoundingClientRect() as DOMRect)
    }
    if (this.props.defaultValue) {
      this.setState({ selectedDate: this.splitDefaultValue(this.props.defaultValue) })
    }
    this.setState({ yearsList: this.getYears(this.getInitialYear()) })
  }

  splitDefaultValue (val: IDefaultValue) {
    if (this.props.showOnlyStart) return { ...val, end: null }
    if (this.props.showOnlyEnd) return { ...val, start: null }
    return val
  }

  setCalendarPosition (bcr: DOMRect) {
    this.positionStyles = {}
    if (this.props.position) {
      const position = this.props.position
      if (position === pickerPositions.TOP) {
        if (bcr.x > (window.innerWidth / 2)) {
          this.positionStyles.right = 0
        } else {
          this.positionStyles.left = 0
        }
        this.positionStyles.bottom = bcr.height + 'px'
        return
      }
      if (position === pickerPositions.BOTTOM) {
        if (bcr.x > (window.innerWidth / 2)) {
          this.positionStyles.right = 0
        } else {
          this.positionStyles.left = 0
        }
        this.positionStyles.top = bcr.height + 'px'
        return
      }
    }

    if (bcr.x > (window.innerWidth / 2)) {
      this.positionStyles.right = 0
    } else {
      this.positionStyles.left = 0
    }
    if (bcr.y > (window.innerHeight / 2)) {
      this.positionStyles.bottom = bcr.height + 'px'
    } else {
      this.positionStyles.top = bcr.height + 'px'
    }
  }

  /**
   * Supports single day selection
   *
   * @param index index of a day
   */
  handleSingleSelection (index: number) {
    this.saveSelection(index)
  }

  /**
   * Condition check if selection began
   *
   */
  isStartSelected () {
    return Boolean(this.state.defaultValue || this.state.userSelectedDaysBefore)
  }

  /**
   * Condition check if selection end
   *
   */
  isEndSelected () {
    return this.state.selectedDate.end !== undefined && this.state.selectedDate.end !== null
  }

  handleError (newDateObject: any) {
    if (this.props.onError) {
      this.props.onError(this.inputValueObjToCallback(newDateObject))
    }
  }

  inputValueObjToCallback (newDateObject: any) {
    return {
      date: newDateObject.date,
      end: newDateObject.day,
      inputValue: newDateObject.dateString,
      month: newDateObject.month,
      start: newDateObject.day,
      year: newDateObject.year
    }
  }

  saveSelectionForTyping (newDateObject: any) {
    this.setState({
      selectedDate: {
        start: newDateObject.date,
        end: newDateObject.date,
        display: newDateObject.date
      },
      displayedMonthIndex: newDateObject.month - 1,
      displayedYear: newDateObject.year,
      yearsList: this.getYears(newDateObject.year)
    })

    if (this.props.onSelect) {
      this.props.onSelect(this.inputValueObjToCallback(newDateObject))
    }
  }

  /**
   * Save selection
   *
   */
  saveSelection (singleIndex: number, shouldClosePicker = true) {
    let value = ''
    let valueObj = {}
    const start = this.state.selectedDate.start as Date
    const end = this.state.selectedDate.end as Date
    const month = this.state.displayedMonthIndex
    const year = this.state.displayedYear
    if ((!singleIndex && singleIndex !== 0) || !Number.isInteger(singleIndex)) {
      if ((!start && start !== 0) || (!end && end !== 0)) return
      if (this.props.showOnlyEnd) {
        value = assembleDateForEndOnly(end)
      } else {
        value = assembleMultiSelectDate(start, end)
      }

    } else {
      if (this.props.showOnlyStart) {
        value = assembleDateForStartOnly(new Date(year, month, singleIndex + 1))
      } else {
        value = assembleDate(singleIndex + 1, singleIndex + 1, month, year)
      }
      valueObj = {
        start: singleIndex + 1,
        end: singleIndex + 1,
        month: month + 1,
        year,
        date: new Date(year, month, singleIndex + 1),
        inputValue: value
      }
    }
    // TODO onSelect overrides setState inputValue
    if (this.props.onSelect) {
      this.props.onSelect(valueObj)
    }
    this.setState({
      inputValue: value,
      selectedDate: {
        ...this.state.selectedDate,
        start: new Date(year, month, singleIndex + 1),
        end: new Date(year, month, singleIndex + 1)
      }
    })
    if (shouldClosePicker) {
      this.closePicker()
    }

    this.userSavedDate = true
  }

  /**
   * Supports input value change
   *
   * @param event event object
   */
  // TODO move to input component
  handleChange (event: React.ChangeEvent<HTMLInputElement>) {

    const element = event.target
    const caret = element.selectionStart
    let typedValue = element.value
    const maxLength = 10
    window.requestAnimationFrame(() => {
      element.selectionStart = caret
      element.selectionEnd = caret
    })

    typedValue = setCorrectTypedValue(typedValue, element.selectionEnd as number)
    const newValue = parseDate(typedValue)
    const newDateObject = newDateFromParsed(newValue)

    if (isValidToSelect(newDateObject, this.props.restrictions)) {
      this.saveSelectionForTyping(newDateObject)
    } else {
      this.handleError(newDateObject)
    }
    if (typedValue.length > maxLength) {
      this.setState({ inputValue: '' })
      const dYear = this.state.displayedYear
      const dmonth = this.state.displayedMonthIndex
      this.setState({
        selectedDate: {
          start: null,
          end: null,
          display: new Date(dYear, dmonth)
        }
      })
    } else {
      this.setState({ inputValue: newValue })
      if (this.props.onInputChange) {
        this.props.onInputChange(newValue)
      }
    }
    if (newValue.length < maxLength) {
      window.requestAnimationFrame(() => {
        element.selectionStart = newValue.length
        element.selectionEnd = newValue.length
      })
    }
  }

  /**
   * Supports click on years
   *
   * @param year year in number eg. 2018
   */
  async yearClickHandler (year: number) {
    this.setState({ displayedYear: year })
    this.switchToMonthSelect()
    this.updYearInInput(year)
  }

  /**
   * Supports click on month
   *
   * @param index month index
   */
  async monthClickHandler (index: number) {
    this.setState({ displayedMonthIndex: index })
    this.switchToDaySelect()
    this.updMonthInInput(index)
  }

  updYearInInput (newYear: number) {
    const oldInputValue = this.state.inputValue as String
    if (oldInputValue) {
      const separator = oldInputValue.match(/\W/g) as Array<any>
      if (separator.length === 2) {
        this.setState({
          inputValue: oldInputValue.substring(0, oldInputValue.lastIndexOf(separator[0]) + 1) + newYear.toString()
        })
      }
    }

    return oldInputValue
  }

  updMonthInInput (newMonth: number) {
    const oldInputValue = this.state.inputValue as String
    if (oldInputValue) {
      const separator = oldInputValue.match(/\W/g) as Array<any>
      const firstSeparatorIndex = oldInputValue.indexOf(separator[0])
      const lastSepearatorIndex = oldInputValue.lastIndexOf(separator[0]) + 1
      if (separator.length === 2) {
        const newMonthInDoubleDigitFormat = newMonth < 10 ? `0${newMonth + 1}` : newMonth + 1
        this.setState({
          inputValue: oldInputValue.substring(0, firstSeparatorIndex)
            + separator[0] + (newMonthInDoubleDigitFormat).toString() + separator[0] +
            oldInputValue.substring(lastSepearatorIndex)
        })
      }
    }
    return oldInputValue
  }

  /**
   * Display years picker
   *
   */
  switchToYearSelect () {
    this.setState({ currentlyPicking: pickingOptions.YEAR })
  }

  /**
   * Display months picker
   *
   */
  switchToMonthSelect () {
    this.setState({ currentlyPicking: pickingOptions.MONTH })
  }

  /**
   * Display days picker ( default view )
   *
   */
  switchToDaySelect () {
    this.setState({ currentlyPicking: pickingOptions.DAY })
  }

  /**
   * Handle month change ( right arrow )
   *
   */
  async nextButtonHandler () {

    if (this.state.currentlyPicking === pickingOptions.YEAR) {
      // user is picking year
      this.setState({ yearsList: this.getYears(this.state.yearsList[0].name + yearsDisplayedPerScreen) })
    } else {
      // user is picking month
      const oldMonthIndex = this.state.displayedMonthIndex
      const newMonthIndex = (oldMonthIndex + 1) % 12

      const oldYear = this.state.displayedYear || this.now.getFullYear()
      const newYear = newMonthIndex === 0 ? oldYear + 1 : oldYear
      this.setState({
        displayedMonthIndex: newMonthIndex,
        displayedYear: newYear
      })
    }
  }

  /**
   * Handle month change ( left arrow )
   *
   */
  async prevButtonHandler () {
    const oldYear = this.state.displayedYear || this.now.getFullYear()
    if (this.state.currentlyPicking === pickingOptions.YEAR) {
      // user is picking year
      if (oldYear > yearsDisplayedPerScreen) {
        this.setState({ yearsList: this.getYears(this.state.yearsList[0].name - yearsDisplayedPerScreen) })
      }
    } else {
      // user is picking month
      const oldMonthIndex = this.state.displayedMonthIndex
      const newMonthIndex = (oldMonthIndex || 12) - 1

      let newYear = newMonthIndex === 11 ? oldYear - 1 : oldYear
      if (newYear < 0) {
        newYear = 1
      }
      this.setState({
        displayedMonthIndex: newMonthIndex,
        displayedYear: newYear
      })
    }
  }

  setDefaultDate (defaultValue: IDefaultValue) {
    // TODO should set selected
    if (!defaultValue) return
    if (this.props.showOnlyStart === true && defaultValue.start) {
      return assembleDateForStartOnly(defaultValue.start)
    }
    if (defaultValue.end) {
      if (this.props.showOnlyEnd === true) {
        return assembleDateForEndOnly(defaultValue.end)
      }

      if (defaultValue.start) {
        if (defaultValue.start.getTime() !== defaultValue.end.getTime()) {
          return assembleMultiSelectDate(defaultValue.start, defaultValue.end)
        }
      }

      if (defaultValue.start) {
        return assembleDate(
          defaultValue.start.getDate(),
          defaultValue.end.getDate(),
          defaultValue.start.getMonth(),
          defaultValue.start.getFullYear()
        )
      }
    }
    if (defaultValue.start) {
      return assembleDate(
        defaultValue.display.getDate(),
        undefined,
        defaultValue.display.getMonth(),
        defaultValue.display.getFullYear()
      )
    }
    return ''
  }

  eventsHandlers = {
    mouseUpHandler: this.mouseUpHandler.bind(this),
    mouseDownHandler: this.mouseDownHandler.bind(this),
    clickHandler: this.clickHandler.bind(this)
  }
  yearEventsHandlers = {
    clickHandler: this.yearClickHandler.bind(this)
  }
  monthEventsHandlers = {
    clickHandler: this.monthClickHandler.bind(this)
  }

  render () {

    return (
      <div className={getClassFor({ key: 'pickerWrapper', theme: this.theme, defaultClass: pickerWrapper })}
           ref={this.node}
      >
        <InputComponent
          children={this.props.children}
          inputValue={this.state.inputValue || (this.state.defaultValue && this.setDefaultDate(this.state.defaultValue)) || ''}
          inputClass={`miquido-date-picker__input ${this.state.inputClass}`}
          onClickHandler={this.onInputClickHandler}
          onChangeHandler={this.handleChange}
          disabled={this.state.disabled}
          placeholder={this.props.placeholder || ''}
          name={this.props.name || ''}
          isVisible={this.state.isPickerVisible}
        />
        <CSSTransition
          in={this.state.isPickerVisible}
          timeout={animationDuration}
          classNames='picker'
          unmountOnExit
          onExited={this.closePicker}
        >
          <div className={getClassFor({ key: 'picker', theme: this.theme, defaultClass: picker })}
               style={this.positionStyles}>
            {this.props.beforeHeader}
            <HeaderMenu displayYear={this.state.displayedYear}
                        displayMonth={monthNames[this.state.displayedMonthIndex]}
                        switchToYearSelect={this.switchToYearSelect}
                        switchToMonthSelect={this.switchToMonthSelect}
                        nextMonth={this.nextButtonHandler}
                        prevMonth={this.prevButtonHandler}
                        theme={this.theme}
            />
            <CSSTransition
              in={this.state.currentlyPicking === pickingOptions.YEAR}
              timeout={animationDuration}
              classNames='picker'
              unmountOnExit
              onExited={this.switchToMonthSelect}
            >
              <YearPicker years={this.state.yearsList}
                          theme={this.theme}
                          restrictions={this.props.restrictions}
              />
            </CSSTransition>
            <CSSTransition
              in={this.state.currentlyPicking === pickingOptions.MONTH}
              timeout={animationDuration}
              classNames='picker'
              unmountOnExit
            >
              <MonthPicker months={this.monthsList} eventsHandlers={this.eventsHandlers}
                           theme={this.theme}
              />
            </CSSTransition>
            {this.props.beforeDayNamesRow}
            <DaysHeader
              theme={this.theme}
            />
            {this.props.beforeBody}

            <PickDay pastDaysAmount={getDayOfTheWeek(this.state.displayedMonthIndex, this.state.displayedYear)}
                     eventsHandlers={this.eventsHandlers}
                     theme={this.theme}
                     selectedYear={this.state.displayedYear}
                     selectedMonthIndex={this.state.displayedMonthIndex}
                     selection={this.getSelectionForDays()}
                     restrictions={this.props.restrictions}
            />
            {this.props.beforeFooter}
            <FooterMenu save={this.saveSelection.bind(this)}
                        theme={this.theme}
                        noButtons={true}
            />
            {this.props.beforeEnd}
          </div>
        </CSSTransition>
      </div>
    )
  }

  getSelectionForDays () {
    if (this.props.showOnlyEnd && this.state.selectedDate.end) return this.state.selectedDate.end
    if (this.state.selectedDate.start) return this.state.selectedDate.start
    return undefined
  }

  onInputClickHandler () {
    this.setState({ userForcedClose: false })
    if (this.props.onClick) {
      this.props.onClick()
    } else {
      this.showPicker()
    }
  }

  /**
   * Display picker and bind mouse up event to window
   *
   */
  private showPicker () {
    this.setCalendarPosition(this.node.current.getBoundingClientRect() as DOMRect)
    this.setState({ isPickerVisible: true, userForcedClose: false })
    document.addEventListener('mousedown', this.clickOutsideHandler, false)
  }

  /**
   * Hide picker
   *
   */
  private closePicker () {
    this.setState({ isPickerVisible: false, userForcedClose: true })
    document.removeEventListener('mousedown', this.clickOutsideHandler, false)
  }
}

export default SingleSelection
