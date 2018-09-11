import * as React from 'react'
import Year from '../Year/Year'
import { IYearObject } from '../interfaces'
import { pickerDate } from './YearPicker.classname'

interface IYearPicker {
  years: IYearObject[]
  theme?: object
}

const YearPicker = (props: IYearPicker) => {

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
