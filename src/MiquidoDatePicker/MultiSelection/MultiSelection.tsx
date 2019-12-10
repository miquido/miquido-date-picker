/*
import * as React from 'react'
import HeaderMenu from './../components/HeaderMenu/HeaderMenu'
import YearPicker from './../components/YearPicker/YearPicker'
import MonthPicker from './../components/MonthPicker/MonthPicker'
import DaysHeader from './../components/DaysHeader/DaysHeader'
import PickDay from './../components/DayPicker/DayPicker'
import FooterMenu from './../components/FooterMenu/FooterMenu'
import {
  IDayObject,
  IDefaultValue,
  IMonthObject,
  IRestrictions,
  IYearObject,
  Props,
  State
} from '../interfaces'
import { pickingOptions } from '../enums'
import { monthNames, yearsDisplayedPerScreen, animationDuration } from '../consts'
import {
  assembleDate, assembleDateForEndOnly,
  assembleDateForStartOnly,
  assembleMultiSelectDate,
  charWasDeleted,
  checkVisibleCalendarForSelection,
  disableDay,
  enableDay,
  generateCalendar,
  getClassFor,
  getFirstMondayIndex,
  getLastDayOfAMonth,
  isNumeric,
  isValidDate,
  replaceCharInText,
  selectDate,
  setRawStyles,
  unselectDate
} from '../functions'
import { picker, pickerWrapper } from './../MiquidoDatePicker.classname'
import { defaultTheme } from '../../themes/default/default_theme'
import { CSSTransition } from 'react-transition-group'
import InputComponent from './../components/InputComponent/InputComponent'

class MiquidoDatePicker extends React.Component<Props, State> {
  now = new Date()
  currentMonth = this.now.getMonth()
  theme = {}
  inputClass = ''
  monthsList: IMonthObject[]
  userSavedDate = false
  private node: any
  private positionStyles: any

  constructor (props: Props) {
    super(props)

    this.state = {
      isPickerVisible: false,
      currentlyPicking: pickingOptions.DAY,
      selectionStart: undefined,
      selectionEnd: undefined,
      selectMethod: undefined,
      daysArray: [],
      displayedMonth: this.getMonthName(this.getInitialMonth()),
      displayedMonthIndex: this.getInitialMonth(),
      displayedYear: this.getInitialYear(),
      defaultValue: props.defaultValue,
      inputValue: '',
      userSelectedDaysBefore: !!this.props.defaultValue,
      yearsList: [],
      selectedDate: this.getDefaultValue(),
      disabled: !!props.disabled
    }
    this.theme = props.theme || defaultTheme
    this.node = React.createRef()
    this.positionStyles = {}
    this.monthsList = this.getMonths()
    if (props.inputClass) this.inputClass = props.inputClass

    this.switchToYearSelect = this.switchToYearSelect.bind(this)
    this.switchToMonthSelect = this.switchToMonthSelect.bind(this)
    this.nextButtonHandler = this.nextButtonHandler.bind(this)
    this.prevButtonHandler = this.prevButtonHandler.bind(this)
    this.showPicker = this.props.children ? this.showPicker.bind(this, this.props.children.props) : this.showPicker.bind(this)
    this.handleChange = this.props.children ? this.handleChange.bind(this, this.props.children.props) : this.handleChange.bind(this)
    this.clearSelection = this.clearSelection.bind(this)
    this.saveSelection = this.saveSelection.bind(this)
    this.closePicker = this.closePicker.bind(this)
  }

  handleRejection (error: Error) {
    console.trace('handle Rejection')
    console.error(error)
  }

  /!**
   * Supports mouse over on days
   * if user selected start date also select days
   *
   * @param index index of a day
   *!/
  mouseOverHandler = (index: number) => {
    if (!this.props.singleSelection) {
      const start = this.state.selectionStart
      const end = this.state.selectionEnd
      if (start === undefined || end || end === 0) return
      const newSelection = this.selectBetweenTwoDays(start, index + 1)
      this.setState({
        daysArray: newSelection, selectedDate: {
          ...this.state.selectedDate,
          start: new Date(this.state.displayedYear, this.state.displayedMonthIndex, start),
          end: new Date(this.state.displayedYear, this.state.displayedMonthIndex, index + 1)
        }
      })
    }
  }
  /!**
   * Supports click on days
   *
   * @param index index of a day
   *!/
  clickHandler = (index: number) => {
    this.setState({ userSelectedDaysBefore: true })
    if (this.props.singleSelection) {
      this.handleSingleSelection(index)
    } else {
      this.handleMultiSelection(index)
    }
  }
  /!**
   * Supports click outside picker
   *!/
  clickOutsideHandler: EventListenerOrEventListenerObject = (e) => {
    if (!this.node.current || !this.node.current.contains(e.target)) {
      this.closePicker()
    }
  }
  /!**
   * Supports mouse down on days
   *
   * @param index index of a day
   *!/
  mouseDownHandler = (index: number) => {
    // window.document.addEventListener('mouseup', this._onMouseUp)
  }
  /!**
   * Supports mouse up on days
   *
   * @param index index of a day
   *!/
  mouseUpHandler = (index: number) => {
    // window.document.removeEventListener('mouseup', this._onMouseUp)
  }
  /!**
   * Get array of month objects
   *
   * @return array of month objects
   *!/
  getMonths = (): IMonthObject[] => {
    return monthNames.map((monthName: string, index: number): IMonthObject => {
      return {
        name: monthName,
        itemIndex: index,
        selected: this.state.displayedMonth === monthName,
        eventsHandlers: this.monthEventsHandlers,
        theme: this.theme
      }
    })
  }
  /!**
   * Get array of year objects
   *
   * @return array of year objects
   *!/
  getYears = (firstYear: number): IYearObject[] => {
    const years = []

    for (let i = 0; i < yearsDisplayedPerScreen; i++) {
      const year = firstYear + i
      years.push({
        name: year,
        selected: this.state.displayedYear === year,
        eventsHandlers: this.yearEventsHandlers,
        itemIndex: i
      })
    }

    return years
  }
  /!**
   * Supports mouse up event
   * detects if mouse up was on picker or outside ( and close it if so )
   *
   * @param e event listener object
   *!/
  _onMouseUp: EventListenerOrEventListenerObject = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!this.node.current || !this.node.current.contains(e.target)) {
      this.closePicker()
    }

  }

  getDefaultValue () {
    const defaultValue = this.props.defaultValue
    if (defaultValue && defaultValue.end && (defaultValue.start.getTime() > defaultValue.end.getTime())) {
      [defaultValue.start, defaultValue.end] = [defaultValue.end, defaultValue.start]
    }
    return defaultValue || { start: null, end: null, display: this.now }
  }

  getInitialMonth () {
    return (this.props.defaultValue && this.props.defaultValue.display.getMonth()) || this.currentMonth
  }

  getInitialYear () {
    return (this.props.defaultValue && this.props.defaultValue.display.getFullYear()) || this.now.getFullYear()
  }

  /!**
   * Get month name from array
   *
   * @param index index of month from 0 to 11
   *!/
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
      if (this.state.defaultValue &&
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
      this.props.singleSelection &&
      (this.state.defaultValue.start.getTime() !== (this.state.defaultValue.end && this.state.defaultValue.end.getTime()))) {
      try {
        throw new Error(`Start and End should be the same for single selection`)
      } catch (e) {
        this.handleRejection(e)
      }
    }

    if (this.props.open) {
      this.showPicker()
    }
  }

  componentWillUnmount () {
    document.removeEventListener('mousedown', this._onMouseUp, false)
  }

  componentWillUpdate (newProps: any, newState: any) {
    if (!Object.is(this.state.defaultValue, newProps.defaultValue)) {
      const newDefault = newProps.defaultValue
      const newInputValue = this.setDefaultDate(newDefault) ? this.setDefaultDate(newDefault) : ''

      this.currentMonth = newDefault.display.getMonth()
      const updState = {
        defaultValue: newDefault, inputValue: newInputValue,
        selectionStart: newDefault.start.getDate(),
        selectedDate: {
          ...this.state.selectedDate,
          start: newDefault.start
        }
      }
      this.setState(updState)
      void this.init()
    }

    if (newProps.disabled !== undefined && this.state.disabled !== newProps.disabled) {
      this.setState({ disabled: newProps.disabled })
    }

    if (newProps.open && !this.state.isPickerVisible && !this.userSavedDate) {
      this.showPicker()
    }

    // if (newState.inputValue !== this.state.inputValue && newState.inputValue !== '') {
    //   console.log('newState', newState)
    //   this.setState({ inputValue: newState.inputValue })
    // }
  }

  componentDidMount () {
    void this.init().catch(this.handleRejection)
  }

  async init () {
    if (this.node && this.node.current) {
      this.setCalendarPosition(this.node.current.getBoundingClientRect() as DOMRect)
    }
    await this.initDaysCalendar(this.currentMonth, this.getInitialYear())
    if (this.props.restrictions) {
      this.setState({
        daysArray: this.setRestrictions(this.props.restrictions, this.state.daysArray)
      })
    }
    if (this.state.defaultValue) {
      const defValue = { selectionStart: this.state.defaultValue.start.getDate() }
      if (this.state.defaultValue.end) {
        defValue['selectionEnd'] = this.state.defaultValue.end.getDate()
      }
      this.setState(defValue)
    }
    if (this.state.selectedDate && this.state.selectedDate.display) {
      const selectedDate = this.state.selectedDate
      const display = selectedDate.display as Date
      if ((selectedDate.start && selectedDate.start.getTime()) !== (selectedDate.end && selectedDate.end.getTime())) {
        this.setMultiMonthSelection(display.getFullYear(), display.getMonth())
      } else {
        this.setSingleMonthSelection()
      }
    }
    this.setState({ yearsList: this.getYears(this.getInitialYear()) })
  }

  setCalendarPosition (bcr: DOMRect) {
    this.positionStyles = {}
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

  /!**
   * Init calendar on given month and year
   *
   * @param month index of month from 0 to 11
   * @param year year number eg 2018
   *!/
  async initDaysCalendar (month: number, year: number) {
    const calendarInit = generateCalendar(month, year)
    this.setState({ daysArray: calendarInit })
  }

  /!**
   * Supports single day selection
   *
   * @param index index of a day
   *!/
  handleSingleSelection (index: number) {
    const { daysArray } = this.state
    const newDaysObjArray = [...daysArray]
    this.clearSelection()
    newDaysObjArray[index].start = true
    this.setState({ selectionStart: index, selectionEnd: index, daysArray: newDaysObjArray })
    this.saveSelection(index)
  }

  /!**
   * Supports range selection
   *
   * @param index index of a day
   *!/
  handleMultiSelection (index: number) {
    const { daysArray, selectionStart } = this.state
    if (this.isStartSelected()) {
      // start point is set
      if (this.isEndSelected()) {
        // whole range is selected - user want to select again
        this.clearSelection()
        this.setState({ selectionStart: index, selectionEnd: undefined })
      } else {
        const newSelection = this.selectBetweenTwoDays(selectionStart as number, index + 1)

        this.setState({
          selectionStart: selectionStart, selectionEnd: index, daysArray: newSelection,
          selectedDate: {
            ...this.state.selectedDate,
            end: new Date(this.state.displayedYear, this.state.displayedMonthIndex, index)
          }
        })
      }
    } else {
      // start point is NOT set
      this.clearSelection()
      const newDaysObjArray = [...daysArray]
      newDaysObjArray[index].start = true
      this.setState({ selectionStart: index, selectionEnd: undefined, daysArray: newDaysObjArray })
    }
  }

  /!**
   * Set picking restrictions
   *
   *!/

  setRestrictions (restrictions: IRestrictions, daysArray: IDayObject[]) {
    const min = restrictions.min
    const max = restrictions.max

    return daysArray.map((day) => {
      const selectedDate = new Date(this.state.displayedYear, this.state.displayedMonthIndex, day.itemIndex)
      if ((min && selectedDate < min) || (max && selectedDate > max)) {
        return disableDay(day)
      } else {
        return enableDay(day)
      }
    })
  }

  /!**
   * Select between two given points
   *
   * @param start index of a day
   * @param end index of a day
   * @param containsStart optional boolean that determine if starting point should be selected
   * @param containsEnd optional boolean that determine if ending point should be selected
   *!/
  selectBetweenTwoDays (start: number, end: number, containsStart = true, containsEnd = true) {
    const { daysArray } = this.state
    return daysArray.map((day) => {
      if (day.displayValue === end && containsEnd) {
        day.end = true
      } else if (day.displayValue === start && containsStart) {
        day.start = true
      } else {
        day.start = false
        day.end = false
      }

      if (day.displayValue <= end && day.displayValue >= start) {
        return selectDate(day)
      } else if (day.displayValue >= end && day.displayValue < start) {
        return selectDate(day)
      } else {
        return unselectDate(day)
      }
    })
  }

  /!**
   * Condition check if selection began
   *
   *!/
  isStartSelected () {
    return this.state.selectionStart !== undefined
  }

  /!**
   * Condition check if selection end
   *
   *!/
  isEndSelected () {
    return this.state.selectionEnd !== undefined
  }

  /!**
   * Clear selected days
   *
   *!/
  clearSelection () {
    const days = this.state.daysArray.map((day) => {
      day.selected = false
      day.end = false
      day.start = false
      return day
    })

    this.setState({ daysArray: days, selectionStart: undefined, selectionEnd: undefined })
  }

  /!**
   * Save selection
   *
   *!/
  saveSelection (singleIndex?: number, shouldClosePicker = true) {
    let value = ''
    let valueObj = {}
    const start = this.state.selectionStart
    const end = this.state.selectionEnd
    const month = this.state.displayedMonthIndex
    const year = this.state.displayedYear

    if ((!singleIndex && singleIndex !== 0) || !Number.isInteger(singleIndex)) {
      if ((!start && start !== 0) || (!end && end !== 0)) return
      if (this.props.showOnlyEnd) {
        value = assembleDateForEndOnly(this.state.selectedDate.end as Date)
      } else {
        value = assembleMultiSelectDate(this.state.selectedDate.start as Date, this.state.selectedDate.end as Date)
      }

      valueObj = {
        start: start + 1,
        end: end + 1,
        month: month,
        year,
        date: {
          start: new Date(year, month, start + 1),
          end: new Date(year, month, end + 1)
        },
        inputValue: value
      }
    } else {
      if (this.props.showOnlyStart) {
        value = assembleDateForStartOnly(new Date(year, month, singleIndex))
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
    this.setState({ inputValue: value })
    if (shouldClosePicker) {
      this.closePicker()
    }

    this.userSavedDate = true
  }

  /!**
   * Supports input value change
   *
   * @param event event object
   *!/
  // TODO move to input component
  async handleChange (event: React.ChangeEvent<HTMLInputElement>) {
    const element = event.target
    const caret = element.selectionStart
    let typedDaysAbove30 = false

    window.requestAnimationFrame(() => {
      element.selectionStart = caret
      element.selectionEnd = caret
    })
    let typedValue = element.value
    const lastTypedCharacter = typedValue[typedValue.length - 1]
    const maxLength = this.props.singleSelection ? 10 : 30
    if (typedValue.length >= maxLength) {
      if (typedValue[element.selectionEnd as number] !== '/') {
        typedValue = replaceCharInText(element.selectionStart as number,
          this.state.inputValue as string,
          typedValue[element.selectionEnd as number - 1]
        )

        if (element.selectionStart && parseInt(typedValue.substring(0, 2), 10) > 31) {
          typedValue = typedValue.substring(0, 1) + typedValue.substring(2, typedValue.length)
          typedDaysAbove30 = true
        }
      } else {
        window.requestAnimationFrame(() => {
          element.selectionStart = caret as number + 1
          element.selectionEnd = caret as number + 1
        })
      }
    }
    let newValue = ''

    // const patternDays = /^([0-2][0-9]|(3)[0-1])$/
    const patternDaysMonths = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))$/
    // const isCorrectDays = patternDays.test(typedValue)
    const isCorrectDaysAndMonths = patternDaysMonths.test(typedValue)
    if ((typedValue.length === 2 && charWasDeleted(typedValue, this.state.inputValue as string)) || typedDaysAbove30) {
      newValue = `${typedValue}/`
      window.requestAnimationFrame(() => {
        element.selectionStart = caret as number + 1
        element.selectionEnd = caret as number + 1
      })
    } else if (typedValue.length === 5 && charWasDeleted(typedValue, this.state.inputValue as string) && isCorrectDaysAndMonths) {
      newValue = `${typedValue}/`
      window.requestAnimationFrame(() => {
        element.selectionStart = caret as number + 1
        element.selectionEnd = caret as number + 1
      })
    } else {

      if ((!charWasDeleted(typedValue, this.state.inputValue as string)
        && lastTypedCharacter !== '/')
        && typedValue.length !== 0) {
        if ((!isNumeric(lastTypedCharacter))) {
          event.preventDefault()
          return
        }
      }
      newValue = typedValue
    }
    if (this.props.singleSelection) {
      const dateArray = newValue.split('/')
      const newDay = parseInt(dateArray[0], 10) - 1
      const newMonth = parseInt(dateArray[1], 10)
      const newYear = parseInt(dateArray[2], 10)
      const newDate = new Date(newYear, newMonth, newDay)

      if (((newDay && newDay > 0) || newDay === 0) && newMonth && newYear && isValidDate(newValue.toString())) {
        const { daysArray } = this.state
        const newDaysObjArray = [...daysArray]
        this.clearSelection()
        await this.initDaysCalendar(newMonth - 1, newYear)
        this.setState({
          selectionStart: newDay,
          selectionEnd: newDay,
          selectedDate: {
            start: newDate,
            end: newDate,
            display: newDate
          },
          daysArray: newDaysObjArray,
          displayedMonthIndex: newMonth - 1,
          displayedMonth: this.getMonthName(newMonth - 1),
          displayedYear: newYear
        })
        newDaysObjArray[newDay].start = true
        this.saveSelection(newDay, false)
        this.setState({ yearsList: this.getYears(newYear) })
      }

    }
    if (typedValue.length !== maxLength || isValidDate(newValue.toString())) {
      this.setState({ inputValue: newValue })
    }
  }

  /!**
   * Supports click on years
   *
   * @param year year in number eg. 2018
   *!/
  async yearClickHandler (year: number) {
    this.setState({ displayedYear: year })
    if (!this.state.userSelectedDaysBefore) {
      await this.initDaysCalendar(this.state.displayedMonthIndex, year)
    }
    this.switchToMonthSelect()
    this.updYearInInput(year)
  }

  /!**
   * Supports click on month
   *
   * @param index month index
   *!/
  async monthClickHandler (index: number) {
    this.setState({ displayedMonth: monthNames[index], displayedMonthIndex: index })
    if (!this.state.userSelectedDaysBefore) {
      await this.initDaysCalendar(index, this.state.displayedYear)
    }
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
      const firstSeparatorIndex = oldInputValue.indexOf(separator[0] + 1)
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

  /!**
   * Display years picker
   *
   *!/
  switchToYearSelect () {
    this.setState({ currentlyPicking: pickingOptions.YEAR })
  }

  /!**
   * Display months picker
   *
   *!/
  switchToMonthSelect () {
    this.setState({ currentlyPicking: pickingOptions.MONTH })
  }

  /!**
   * Display days picker ( default view )
   *
   *!/
  switchToDaySelect () {
    this.setState({ currentlyPicking: pickingOptions.DAY })
  }

  setMultiMonthSelection (year: number, month: number) {
    const selected = this.state.selectedDate
    if (selected.start && selected.end) {
      const start = new Date(year, month, 1)
      const end = new Date(year, month + 1, 0)

      // month contains selection
      if (selected.start.getMonth() === start.getMonth()) {
        // first month of selection
        this.setState({
          daysArray: this.selectBetweenTwoDays(
            selected.start.getDate(),
            end.getDate(),
            true,
            false)
        })
      } else if (selected.end.getMonth() === end.getMonth()) {
        // last month of selection
        this.setState({
          daysArray: this.selectBetweenTwoDays(
            start.getDate() - 1,
            selected.end.getDate(),
            false,
            true)
        })
      } else if (selected.start <= start && selected.end >= end) {
        // month containing selection without first and last
        this.selectWholeMonth(year, month)
      }

    }
  }

  setSingleMonthSelection () {
    const selected = this.state.selectedDate
    if (selected.start && selected.end) {
      const daysArray = [...this.state.daysArray]
      const selectedDay = selected.start.getDate()
      daysArray[selectedDay - 1].start = true
      daysArray[selectedDay - 1].end = true
      this.setState({ selectionStart: selectedDay, selectionEnd: selectedDay, daysArray: daysArray })
    }
  }

  selectWholeMonth (year: number, month: number) {
    const start = new Date(year, month + 1, 1).getDate() - 1
    const end = getLastDayOfAMonth(year, month)
    this.setState({
      daysArray: this.selectBetweenTwoDays(start, end,
        false,
        false)
    })
  }

  /!**
   * Handle month change ( right arrow )
   *
   *!/
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
        displayedMonth: this.getMonthName(newMonthIndex),
        displayedYear: newYear
      })
      await this.initDaysCalendar(newMonthIndex, newYear)

      const selectedDate = this.state.selectedDate

      if (checkVisibleCalendarForSelection(selectedDate, newMonthIndex, newYear)) {

        if ((selectedDate.start && selectedDate.start.getTime()) !== (selectedDate.end && selectedDate.end.getTime())) {
          this.setMultiMonthSelection(newYear, newMonthIndex)
        } else {
          this.setSingleMonthSelection()
        }
      }
      if (this.props.restrictions) {
        this.setState({
          daysArray: this.setRestrictions(this.props.restrictions, this.state.daysArray)
        })
      }
    }
  }

  /!**
   * Handle month change ( left arrow )
   *
   *!/
  async prevButtonHandler () {
    if (this.state.currentlyPicking === pickingOptions.YEAR) {
      // user is picking year
      this.setState({ yearsList: this.getYears(this.state.yearsList[0].name - yearsDisplayedPerScreen) })
    } else {
      // user is picking month
      const oldMonthIndex = this.state.displayedMonthIndex
      const newMonthIndex = (oldMonthIndex || 12) - 1

      const oldYear = this.state.displayedYear || this.now.getFullYear()
      const newYear = newMonthIndex === 11 ? oldYear - 1 : oldYear

      this.setState({
        displayedMonthIndex: newMonthIndex,
        displayedMonth: this.getMonthName(newMonthIndex),
        displayedYear: newYear
      })
      await this.initDaysCalendar(newMonthIndex, newYear)

      const selectedDate = this.state.selectedDate

      if (checkVisibleCalendarForSelection(selectedDate, newMonthIndex, newYear)) {
        if ((selectedDate.start && selectedDate.start.getTime()) !== (selectedDate.end && selectedDate.end.getTime())) {
          this.setMultiMonthSelection(newYear, newMonthIndex)
        } else {
          this.setSingleMonthSelection()
        }
      }
      if (this.props.restrictions) {
        this.setState({
          daysArray: this.setRestrictions(this.props.restrictions, this.state.daysArray)
        })
      }
    }
  }

  setDefaultDate (defaultValue: IDefaultValue) {
    // TODO should set selected
    if (!defaultValue) return
    if (defaultValue.end) {
      if (this.props.showOnlyStart === true) return assembleDateForStartOnly(defaultValue.start)
      if (this.props.showOnlyEnd === true) return assembleDateForEndOnly(defaultValue.end)

      if (defaultValue.start.getTime() !== defaultValue.end.getTime()) {
        return assembleMultiSelectDate(defaultValue.start, defaultValue.end)
      }

      return assembleDate(
        defaultValue.start.getDate(),
        defaultValue.end.getDate(),
        defaultValue.start.getMonth(),
        defaultValue.start.getFullYear()
      )
    }
    return ''
  }

  eventsHandlers = {
    mouseUpHandler: this.mouseUpHandler.bind(this),
    mouseDownHandler: this.mouseDownHandler.bind(this),
    mouseOverHandler: this.mouseOverHandler.bind(this),
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
          inputClass={`miquido-date-picker__input ${this.inputClass}`}
          onClickHandler={this.showPicker}
          onChangeHandler={this.handleChange}
          disabled={this.state.disabled}
          placeholder={this.props.placeholder || ''}
          name={this.props.name || ''}
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
                        displayMonth={this.state.displayedMonth}
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
            <PickDay pastDaysAmount={getFirstMondayIndex(this.state.displayedMonthIndex, this.state.displayedYear)}
                     days={this.state.daysArray}
                     eventsHandlers={this.eventsHandlers}
                     theme={this.theme}
                     selectedYear={this.state.displayedYear}
                     selectedMonthIndex={this.state.displayedMonthIndex}
            />
            {this.props.beforeFooter}
            <FooterMenu clear={this.clearSelection.bind(this)}
                        save={this.saveSelection.bind(this)}
                        theme={this.theme}
                        noButtons={this.props.singleSelection}
            />
            {this.props.beforeEnd}
          </div>
        </CSSTransition>
      </div>
    )
  }

  /!**
   * Display picker and bind mouse up event to window
   *
   *!/
  private showPicker () {
    this.setCalendarPosition(this.node.current.getBoundingClientRect() as DOMRect)
    this.setState({ isPickerVisible: true })
    document.addEventListener('mousedown', this.clickOutsideHandler, false)
  }

  /!**
   * Hide picker
   *
   *!/
  private closePicker () {
    this.setState({ isPickerVisible: false })
    document.removeEventListener('mousedown', this.clickOutsideHandler, false)
  }
}

export default MiquidoDatePicker
*/
