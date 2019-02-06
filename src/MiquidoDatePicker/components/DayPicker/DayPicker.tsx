import * as React from 'react'
import IPickDayProps from './DayPicker.interface'
import { Iday } from '../Day/Day.interface'
import Day from '../Day/Day'
import { pickerDate } from './DayPicker.classname'
import {
  checkIfDayIsNotAllowedForSelection,
  getClassFor,
  getDaysInMonth
} from '../../functions'

const PickDay = (props: IPickDayProps) => {
  const pickedDate = props.selection && props.selection.start
  const today = new Date()
  today.setHours(0,0,0,0)
  const previousMonthDays = []
  const nextMonthDays = []
  const daysInPrevMonth = props.selectedMonthIndex === 0 ?
    new Date(props.selectedYear - 1, 11, 0).getDate()
    :
    new Date(props.selectedYear, props.selectedMonthIndex, 0).getDate()

  for (let i = 0; i < props.pastDaysAmount; i++) {
    previousMonthDays.push(<Day key={`previous-${i}`}
                                displayValue={(daysInPrevMonth - i).toString()}
                                itemIndex={(i + 1) * -1}
                                disabled={true}
                                theme={props.theme}
    />)
  }
  const numberOfDaysInMonth = getDaysInMonth(props.selectedMonthIndex, props.selectedYear)

  const currentMonthDays = Array.from(new Array(numberOfDaysInMonth), (value: Iday, index: number) => {
    const dayDate = new Date(props.selectedYear, props.selectedMonthIndex, index + 1)
    return <Day
      key={`current-${index}`}
      displayValue={(index + 1).toString()}
      selected={false}
      disabled={checkIfDayIsNotAllowedForSelection(props.restrictions, dayDate)}
      start={Boolean(pickedDate && dayDate.getTime() === pickedDate.getTime())}
      end={Boolean(pickedDate && dayDate.getTime() === pickedDate.getTime())}
      today={Boolean(dayDate.getTime() === today.getTime())}
      eventsHandlers={props.eventsHandlers}
      itemIndex={index}
      theme={props.theme}
    />
  })

  if ((previousMonthDays.length + currentMonthDays.length) % 7 !== 0) {
    let i = 0
    while ((previousMonthDays.length + currentMonthDays.length + nextMonthDays.length) % 7 !== 0) {
      i++
      nextMonthDays.push(<Day key={`next-${i}`}
                              displayValue={i.toString()}
                              itemIndex={i * -1}
                              disabled={true}
                              theme={props.theme}/>)
    }
  }
  const daysGrid = previousMonthDays.reverse().concat(currentMonthDays as Array<any>, nextMonthDays)

  return (
    <div className={getClassFor({ key: 'dayPicker', theme: props.theme, defaultClass: pickerDate })}>
      {daysGrid}
    </div>
  )
}

export default PickDay
