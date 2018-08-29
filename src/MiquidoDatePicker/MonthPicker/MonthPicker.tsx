import { style } from 'typestyle'
import * as React from 'react'
import Month from '../Month/Month'
import { IMonthObject } from '../interfaces'

interface IMonthPicker {
  months: IMonthObject[]
  selected?: boolean
  eventsHandlers?: object
}

const PickMonth = (props: IMonthPicker) => {
  // const pickerDate = style({
  //   minWidth: '250px',
  //   padding: '0 15px',
  //   maxWidth: (35 * 7) + 'px',
  //   display: 'flex',
  //   alignContent: 'space-between',
  //   justifyContent: 'space-between',
  //   flexWrap: 'wrap',
  //   fontFamily: 'Rubik, sans-serif',
  //   backgroundColor: '#ffffff',
  //   borderRadius: '1px',
  //   boxSizing: 'border-box',
  //   position: 'absolute',
  //   top: '50px',
  //   left: 0,
  //   minHeight: '245px'
  // })
  const pickerDate = style({
    minWidth: '250px',
    padding: '0 15px',
    maxWidth: (35 * 7) + 'px',
    display: 'flex',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    fontFamily: 'Roboto, sans-serif',
    backgroundColor: '#ffffff',
    borderRadius: '1px',
    boxSizing: 'border-box',
    position: 'absolute',
    top: '50px',
    left: '50%',
    transform: 'translateX(-50%)'
  })

  const monthsGrid = props.months.map((month: IMonthObject, index: number) => (
      <Month key={index}
             itemIndex={month.itemIndex}
             displayValue={month.name}
             selected={month.selected}
             eventsHandlers={month.eventsHandlers}/>
    )
  )
  return (
    <div className={pickerDate}>
      {monthsGrid}
    </div>
  )
}

export default PickMonth
