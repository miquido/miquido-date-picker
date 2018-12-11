import * as React from 'react'
import IPickDayProps from './DayPicker.interface'
import { Iday } from '../Day/Day.interface'
import Day from '../Day/Day'
import { pickerDate } from './DayPicker.classname'
import { getClassFor } from '../functions'

const PickDay = (props: IPickDayProps) => {
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
  const currentMonthDays = props.days.map((value: Iday, index: number) => (
      <Day key={`current-${index}`}
           displayValue={value.displayValue}
           selected={value.selected}
           disabled={value.disabled}
           start={value.start}
           end={value.end}
           today={value.today}
           eventsHandlers={props.eventsHandlers}
           itemIndex={index}
           theme={props.theme}/>
    )
  )
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
  const daysGrid = previousMonthDays.reverse().concat(currentMonthDays, nextMonthDays)

  return (
    <div className={getClassFor({ key: 'dayPicker', theme: props.theme, defaultClass: pickerDate })}>
      {daysGrid}
    </div>
  )
}

export default PickDay
