import * as React from 'react'
import { style } from 'typestyle'
import HeaderMenu from './HeaderMenu/HeaderMenu'
import YearPicker from './YearPicker/YearPicker'
import MonthPicker from './MonthPicker/MonthPicker'
import DaysHeader from './DaysHeader/DaysHeader'
import PickDay from './DayPicker/DayPicker'
import FooterMenu from './FooterMenu/FooterMenu'
import { IMonthObject, IYearObject, Props, State } from './interfaces'
import { pickingOptions } from './enums'
import { monthNames } from './consts'
import { generateCalendar, getFirstMondayIndex, selectDate, unselectDate } from './functions'

class MiquidoDatePicker extends React.Component<Props, State> {
  now = new Date()
  currentMonth = this.now.getMonth()

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

  }

  getMonthName (index: number) {

    if (!Number.isInteger(index)) {
      return monthNames[this.now.getMonth() + 1]
    } else {
      return monthNames[index]
    }
  }

  componentDidMount () {
    this.initDaysCalendar(this.currentMonth, this.now.getFullYear())
  }

  initDaysCalendar (month: number, year: number) {
    const calendarInit = generateCalendar(month, year)
    this.setState({ daysArray: calendarInit })
  }

  // pickerWrapperClass = style({
  //   position: 'relative',
  //   display: 'inline-block',
  //   fontSize: '62.5%',
  //   boxSizing: 'border-box',
  //   width: '250px'
  // })
  pickerWrapperClass = style({
    position: 'relative',
    display: 'inline-block',
    fontSize: '62.5%',
    boxSizing: 'border-box',
    width: '450px'
  })

  mouseOverHandler = (index: number) => {
    if (!this.state.selectionStart || this.state.selectionEnd) return
    const days = this.state.daysArray
    const start = this.state.selectionStart
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

  clickHandler = (index: number) => {
    const days = this.state.daysArray
    if (this.state.selectionStart && !this.state.selectionEnd) {

      const start = this.state.selectionStart
      const newSelection = days.map((day) => {
        if (day.itemIndex <= index && day.itemIndex > start) {
          return selectDate(day)
        } else if (day.itemIndex >= index && day.itemIndex < start) {
          return selectDate(day)
        } else {
          return unselectDate(day)
        }
      })

      // this.setState({ selectMethod: undefined })
      this.setState({ selectionEnd: index })
      const newDaysObjArray = [...newSelection]
      newDaysObjArray[index].end = true
      this.setState({ daysArray: newDaysObjArray })
    } else {
      this.clearSelection()
      days[index].start = true
      this.setState({ selectionStart: index, selectionEnd: undefined, daysArray: days })
    }
    // this.setState({ selectMethod: selectMethods.CLICK })
  }

  mouseDownHandler = (index: number) => {
    window.document.addEventListener('mouseup', this._onMouseUp)
  }

  mouseUpHandler = (index: number) => {
    window.document.removeEventListener('mouseup', this._onMouseUp)
  }

  clearSelection () {
    const days = this.state.daysArray.map((day) => {
      day.selected = false
      day.end = false
      day.start = false
      return day
    })

    this.setState({ daysArray: days, selectionStart: undefined, selectionEnd: undefined })
  }

  saveSelection () {
    if (!this.state.selectionStart || !this.state.selectionEnd) return
    const days = this.state.daysArray
    const value = `${days[this.state.selectionStart].displayValue} - ${days[this.state.selectionEnd].displayValue}`
      + `/${this.state.selectedMonthIndex + 1}/${this.state.selectedYear}`
    this.setState({ inputVal: value })
    this.closePicker()
  }

  handleChange (event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ inputVal: event.target.value })
  }

  yearClickHandler (year: number) {
    this.setState({ selectedYear: year })
    this.switchToMonthSelect()

  }

  monthClickHandler (index: number) {
    this.setState({ selectedMonth: monthNames[index], selectedMonthIndex: index })
    this.switchToDaySelect()
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

  getMonths = (): IMonthObject[] => {
    return monthNames.map((monthName: string, index: number): IMonthObject => {
      return {
        name: monthName,
        itemIndex: index,
        selected: this.state.selectedMonth === monthName,
        eventsHandlers: this.monthEventsHandlers
      }
    })

  }

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

  _onMouseUp = (e: object) => {
    console.log(e)
  }

  private showPicker (i: object) {
    window.document.addEventListener('mouseup', this._onMouseUp, false)
    this.setState({ isPickerVisible: true })
  }

  private closePicker () {
    this.setState({ isPickerVisible: false })
  }

  pickerWrapper = style({
    position: 'relative',
    backgroundColor: '#ffffff'
  })

  switchToYearSelect () {
    this.setState({ currentlyPicking: pickingOptions.YEAR })
  }

  switchToMonthSelect () {
    this.setState({ currentlyPicking: pickingOptions.MONTH })
  }

  switchToDaySelect () {
    this.setState({ currentlyPicking: pickingOptions.DAY })
  }

  nextMonth () {
    const oldMonthIndex = this.state.selectedMonthIndex
    const newMonthIndex = (oldMonthIndex + 1) % 12

    this.setState({ selectedMonthIndex: newMonthIndex, selectedMonth: this.getMonthName(newMonthIndex) })
    this.initDaysCalendar(newMonthIndex, this.now.getFullYear())
  }

  prevMonth () {
    const oldMonthIndex = this.state.selectedMonthIndex
    const newMonthIndex = (oldMonthIndex - 1) % 12 < 0 ? 11 : (oldMonthIndex - 1) % 12

    this.setState({ selectedMonthIndex: newMonthIndex, selectedMonth: this.getMonthName(newMonthIndex) })
    this.initDaysCalendar(newMonthIndex, this.now.getFullYear())
  }

  render () {
    return (
      <div className={this.pickerWrapperClass} onContextMenu={(e) => {
        // e.preventDefault()
        // return false
      }}>
        {React.cloneElement(
          this.props.children, {
            value: this.state.inputVal,
            onClick: this.showPicker.bind(this, this.props.children.props),
            onChange: this.handleChange.bind(this, this.props.children.props)
          })
        }
        {this.state.isPickerVisible &&
        <div onClick={e => e.stopPropagation()} className={this.pickerWrapper}>
          <HeaderMenu displayYear={this.state.selectedYear}
                      displayMonth={this.state.selectedMonth}
                      switchToYearSelect={this.switchToYearSelect.bind(this)}
                      switchToMonthSelect={this.switchToMonthSelect.bind(this)}
                      nextMonth={this.nextMonth.bind(this)}
                      prevMonth={this.prevMonth.bind(this)}
          />
          {this.state.currentlyPicking === pickingOptions.YEAR && <YearPicker years={this.getYears()}/>}
          {this.state.currentlyPicking === pickingOptions.MONTH &&
          <MonthPicker months={this.getMonths()} eventsHandlers={this.eventsHandlers}/>}
          <DaysHeader/>
          <PickDay pastDaysAmount={getFirstMondayIndex(this.state.selectedMonthIndex, this.now.getFullYear())}
                   days={this.state.daysArray}
                   eventsHandlers={this.eventsHandlers}/>
          <FooterMenu clear={this.clearSelection.bind(this)} save={this.saveSelection.bind(this)}/>
        </div>
        }
      </div>
    )
  }
}

export default MiquidoDatePicker
