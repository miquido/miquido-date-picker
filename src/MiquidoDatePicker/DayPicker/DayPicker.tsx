import { style } from 'typestyle'
import * as React from 'react'
import IPickDayProps from './DayPicker.interface'
import { Iday } from '../Day/Day.interface'
import Day from '../Day/Day'

const PickDay = (props: IPickDayProps) => {
  const pickerDate = style({
    minWidth: '250px',
    padding: '0 15px',
    maxWidth: (35 * 7) + 'px',
    display: 'flex',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    fontFamily: 'Rubik, sans-serif',
    backgroundColor: '#ffffff',
    borderRadius: '1px',
    boxShadow: '0 17px 13px 0 #ecf5fd, 0 -2px 7px 0 rgba(236, 245, 253, 0.5)',
    boxSizing: 'border-box',
    width: '100%'
  })

  const previousMonthDays = []
  const nextMonthDays = []
  const date = new Date()
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

  for (let i = 1; i <= 2; i++) {
    previousMonthDays.push(<Day key={`previous-${i}`} displayValue={(daysInMonth - (2 - i)).toString()} itemIndex={i * -1}
                                disabled={true}/>)
  }

  const currentMonthDays = props.days.map((value: Iday, index: number) => (
      <Day key={`current-${index}`}
           displayValue={value.displayValue}
           selected={value.selected}
           start={value.start}
           end={value.end}
           today={value.today}
           eventsHandlers={props.eventsHandlers}
           itemIndex={index}/>
    )
  )

  for (let i = 1; i <= 3; i++) {
    nextMonthDays.push(<Day key={`next-${i}`} displayValue={i.toString()} itemIndex={i * -1}
                            disabled={true}/>)
  }

  const daysGrid = previousMonthDays.concat(currentMonthDays, nextMonthDays)

  return (
    <div className={pickerDate}>
      {daysGrid}
    </div>
  )
}

export default PickDay
