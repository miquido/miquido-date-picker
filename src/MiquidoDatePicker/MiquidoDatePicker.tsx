import * as React from 'react'
import HeaderMenu from './HeaderMenu/HeaderMenu'
import YearPicker from './YearPicker/YearPicker'
import MonthPicker from './MonthPicker/MonthPicker'
import DaysHeader from './DaysHeader/DaysHeader'
import PickDay from './DayPicker/DayPicker'
import FooterMenu from './FooterMenu/FooterMenu'
import { IMonthObject, IYearObject, Props, State } from './interfaces'
import { pickingOptions } from './enums'
import { monthNames } from './consts'
import { asembleDate, generateCalendar, getClassFor, getFirstMondayIndex, selectDate, unselectDate } from './functions'
import { pickerWrapper, picker } from './MiquidoDatePicker.classname'
import { defaultTheme } from '../themes/default/default_theme'
import { CSSTransition } from 'react-transition-group'

class MiquidoDatePicker extends React.Component<Props, State> {
  now = new Date()
  currentMonth = this.now.getMonth()
  theme = {}
  private node: any

  constructor (props: Props) {
    super(props)

    this.state = {
      isPickerVisible: false,
      currentlyPicking: pickingOptions.DAY,
      selectionStart: undefined,
      selectionEnd: undefined,
      selectMethod: undefined,
      daysArray: [],
      selectedMonth: this.getMonthName(this.currentMonth),
      selectedMonthIndex: this.currentMonth,
      selectedYear: this.now.getFullYear(),
      inputVal: undefined
    }
    this.theme = props.theme || defaultTheme
    this.node = React.createRef()

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
    document.addEventListener('mousedown', this._onMouseUp, false)
  }

  componentWillUnmount () {
    document.removeEventListener('mousedown', this._onMouseUp, false)
  }

  componentDidMount () {
    this.initDaysCalendar(this.currentMonth, this.now.getFullYear())
  }

  /**
   * Init calendar on given month and year
   *
   * @param month index of month from 0 to 11
   * @param year year number eg 2018
   */
  initDaysCalendar (month: number, year: number) {
    const calendarInit = generateCalendar(month, year)
    this.setState({ daysArray: calendarInit })
  }

  /**
   * Supports mouse over on days
   * if user selected start date also select days
   *
   * @param index index of a day
   */
  mouseOverHandler = (index: number) => {
    if (!this.props.singleSelection) {
      const start = this.state.selectionStart
      if (start === undefined || this.state.selectionEnd) return
      const days = this.state.daysArray
      const newSelection = days.map(day => {
        if (day.itemIndex <= index && day.itemIndex > start) {
          return selectDate(day)
        } else if (day.itemIndex >= index && day.itemIndex < start) {
          return selectDate(day)
        } else {
          return unselectDate(day)
        }
      })
      this.setState({ daysArray: newSelection })
    }
  }

  /**
   * Supports click on days
   *
   * @param index index of a day
   */
  clickHandler = (index: number) => {
    if (this.props.singleSelection) {
      this.handleSingleSelection(index)
    } else {
      this.handleMultiSelection(index)
    }
  }

  /**
   * Supports single day selection
   *
   * @param index index of a day
   */
  handleSingleSelection (index: number) {
    const { daysArray } = this.state
    const newDaysObjArray = [...daysArray]
    this.clearSelection()
    newDaysObjArray[index].start = true
    this.setState({ selectionStart: index, selectionEnd: index, daysArray: newDaysObjArray })
    this.saveSelection(index)
  }

  /**
   * Supports range selection
   *
   * @param index index of a day
   */
  handleMultiSelection (index: number) {
    const { daysArray, selectionStart } = this.state
    if (this.isStartSelected()) {
      const newSelection = this.selectBetweenPoints(selectionStart as number, index)
      this.setState({ selectionEnd: index, daysArray: newSelection })
    } else {
      this.clearSelection()
      const newDaysObjArray = [...daysArray]
      newDaysObjArray[index].start = true
      this.setState({ selectionStart: index, selectionEnd: undefined, daysArray: newDaysObjArray })
    }
  }

  /**
   * Select between two given points
   *
   * @param start index of a day
   * @param end index of a day
   */
  selectBetweenPoints (start: number, end: number) {
    const { daysArray } = this.state
    return daysArray.map((day) => {
      if (day.itemIndex <= end && day.itemIndex > start) {
        if (day.itemIndex === end) {
          day.end = true
        }
        return selectDate(day)
      } else if (day.itemIndex >= end && day.itemIndex < start) {
        return selectDate(day)
      } else {
        return unselectDate(day)
      }
    })
  }

  /**
   * Condition check if selection began
   *
   */
  isStartSelected () {
    return this.state.selectionStart !== undefined && !this.state.selectionEnd
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
   * Clear selected days
   *
   */
  clearSelection () {
    const days = this.state.daysArray.map((day) => {
      day.selected = false
      day.end = false
      day.start = false
      return day
    })

    this.setState({ daysArray: days, selectionStart: undefined, selectionEnd: undefined })
  }

  /**
   * Save selection
   *
   */
  saveSelection (singleIndex?: number) {
    const days = this.state.daysArray
    let value = ''
    const start = this.state.selectionStart
    const month = this.state.selectedMonthIndex
    const year = this.state.selectedYear

    if ((!singleIndex && singleIndex !== 0) || !Number.isInteger(singleIndex)) {
      if ((!start && start !== 0) || !this.state.selectionEnd) return
      value = asembleDate(start, this.state.selectionEnd, month, year, days)
    } else {
      value = asembleDate(singleIndex, singleIndex, month, year, days)
    }
    this.setState({ inputVal: value })
    this.closePicker()
  }

  /**
   * Supports input value change
   *
   * @param event event object
   */
  handleChange (event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ inputVal: event.target.value })
  }

  /**
   * Supports click on years
   *
   * @param year year in number eg. 2018
   */
  yearClickHandler (year: number) {
    this.setState({ selectedYear: year })
    this.initDaysCalendar(this.state.selectedMonthIndex, year)
    this.switchToMonthSelect()

  }

  /**
   * Supports click on month
   *
   * @param index month index
   */
  monthClickHandler (index: number) {
    this.setState({ selectedMonth: monthNames[index], selectedMonthIndex: index })
    this.initDaysCalendar(index, this.state.selectedYear)
    this.switchToDaySelect()
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
        selected: this.state.selectedMonth === monthName,
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
  getYears = (): IYearObject[] => {
    const now = new Date()
    const currentYear = now.getFullYear()

    const years = []
    for (let i = 0; i < 12; i++) {
      const year = currentYear + i
      years.push({
        name: year,
        selected: this.state.selectedYear === year,
        eventsHandlers: this.yearEventsHandlers,
        itemIndex: i
      })
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
      this.setState({
        isPickerVisible: false
      })
    }

  }

  /**
   * Display picker and bind mouse up event to window
   *
   */
  private showPicker () {
    this.setState({ isPickerVisible: true })
  }

  /**
   * Hide picker
   *
   */
  private closePicker () {
    this.setState({ isPickerVisible: false })
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
  nextMonth () {
    const oldMonthIndex = this.state.selectedMonthIndex
    const newMonthIndex = (oldMonthIndex + 1) % 12

    const oldYear = this.state.selectedYear || this.now.getFullYear()
    const newYear = newMonthIndex === 0 ? oldYear + 1 : oldYear
    this.setState({
      selectedMonthIndex: newMonthIndex,
      selectedMonth: this.getMonthName(newMonthIndex),
      selectedYear: newYear
    })
    this.initDaysCalendar(newMonthIndex, newYear)
  }

  /**
   * Handle month change ( left arrow )
   *
   */
  prevMonth () {
    const oldMonthIndex = this.state.selectedMonthIndex
    const newMonthIndex = (oldMonthIndex - 1) % 12 < 0 ? 11 : (oldMonthIndex - 1) % 12

    const oldYear = this.state.selectedYear || this.now.getFullYear()
    const newYear = newMonthIndex === 11 ? oldYear - 1 : oldYear

    this.setState({
      selectedMonthIndex: newMonthIndex,
      selectedMonth: this.getMonthName(newMonthIndex),
      selectedYear: newYear
    })
    this.initDaysCalendar(newMonthIndex, newYear)
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
        {React.cloneElement(
          this.props.children, {
            value: this.state.inputVal || '',
            onClick: this.showPicker.bind(this, this.props.children.props),
            onChange: this.handleChange.bind(this, this.props.children.props)
          })
        }
        <CSSTransition
          in={this.state.isPickerVisible}
          timeout={300}
          classNames='picker'
          unmountOnExit
          onExited={() => {
            this.setState({
              isPickerVisible: false
            })
          }}
        >
          <div className={getClassFor({ key: 'picker', theme: this.theme, defaultClass: picker })}>
            <HeaderMenu displayYear={this.state.selectedYear}
                        displayMonth={this.state.selectedMonth}
                        switchToYearSelect={this.switchToYearSelect.bind(this)}
                        switchToMonthSelect={this.switchToMonthSelect.bind(this)}
                        nextMonth={this.nextMonth.bind(this)}
                        prevMonth={this.prevMonth.bind(this)}
                        theme={this.theme}
            />
            <CSSTransition
              in={this.state.currentlyPicking === pickingOptions.YEAR}
              timeout={300}
              classNames='picker'
              unmountOnExit
              onExited={() => {
                this.setState({
                  currentlyPicking: pickingOptions.MONTH
                })
              }}
            >
              <YearPicker years={this.getYears()}
                          theme={this.theme}
              />
            </CSSTransition>
            <CSSTransition
              in={this.state.currentlyPicking === pickingOptions.MONTH}
              timeout={300}
              classNames='picker'
              unmountOnExit
            >
              <MonthPicker months={this.getMonths()} eventsHandlers={this.eventsHandlers}
                           theme={this.theme}
              />
            </CSSTransition>
            <DaysHeader
              theme={this.theme}
            />
            <PickDay pastDaysAmount={getFirstMondayIndex(this.state.selectedMonthIndex, this.state.selectedYear)}
                     days={this.state.daysArray}
                     eventsHandlers={this.eventsHandlers}
                     theme={this.theme}
                     selectedYear={this.state.selectedYear}
                     selectedMonthIndex={this.state.selectedMonthIndex}
            />
            <FooterMenu clear={this.clearSelection.bind(this)}
                        save={this.saveSelection.bind(this)}
                        theme={this.theme}
                        noButtons={this.props.singleSelection}
            />
          </div>
        </CSSTransition>
      </div>
    )
  }
}

export default MiquidoDatePicker
