import * as React from 'react'
import Year from '../Year/Year'
import { YearPickerWrapper } from './YearPicker.classname'
import { IYearPicker } from './YearPicker.interface'
import { getClassFor } from '../functions'

const YearPicker = (props: IYearPicker) => {

  const years = props.years.map((year, index) => {
    return (<Year
      key={index}
      displayValue={year.name}
      selected={year.selected}
      itemIndex={year.itemIndex}
      eventsHandlers={year.eventsHandlers}
      theme={props.theme}
    />)
  })
  return (
    <div className={getClassFor({ key: 'yearPicker', theme: props.theme, defaultClass: YearPickerWrapper })}>
      {years}
    </div>
  )
}

export default YearPicker
