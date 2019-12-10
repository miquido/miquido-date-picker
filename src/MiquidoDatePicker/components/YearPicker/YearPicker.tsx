import * as React from 'react'
import Year from '../Year/Year'
import { YearPickerWrapper } from './YearPicker.classname'
import { IYearPicker } from './YearPicker.interface'
import { checkIfYearIsAllowedToBeSelected, getClassFor } from '../../functions'

const YearPicker = (props: IYearPicker) => {
  const years = props.years.map((year, index) => {
    const isAllowed = checkIfYearIsAllowedToBeSelected(year.name, props.restrictions)
    return (<Year
      key={index}
      displayValue={`${year.name}`}
      selected={year.selected}
      itemIndex={year.itemIndex}
      eventsHandlers={year.eventsHandlers}
      theme={props.theme}
      allowed={!!isAllowed}
    />)
  })
  return (
    <div className={getClassFor({ key: 'yearPicker', theme: props.theme, defaultClass: YearPickerWrapper })}>
      {years}
    </div>
  )
}

export default YearPicker
