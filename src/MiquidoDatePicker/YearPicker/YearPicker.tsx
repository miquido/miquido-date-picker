import { style } from 'typestyle'
import * as React from 'react'
import Year from '../Year/Year'
import { IYearObject } from '../interfaces'

interface IYearPicker {
  years: IYearObject[]
}

const YearPicker = (props: IYearPicker) => {
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
  //   width: '100%',
  //   position: 'absolute',
  //   top: '50px',
  //   left: 0,
  //   minHeight: '285px'
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
    width: '100%',
    position: 'absolute',
    top: '50px',
    left: '50%',
    transform: 'translateX(-50%)'
  })
  const years = props.years.map((year, index) => {
    return (<Year
      key={index}
      displayValue={year.name}
      selected={year.selected}
      itemIndex={year.itemIndex}
      eventsHandlers={year.eventsHandlers} />)
  })
  return (
    <div className={pickerDate}>
      {years}
    </div>
  )
}

export default YearPicker
