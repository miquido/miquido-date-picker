import * as React from 'react'
import Month from '../Month/Month'
import { IMonthObject } from '../../interfaces'
import { pickerDate } from './MonthPicker.classname'
import { IMonthPicker } from './MonthPicker.interface'
import { getClassFor } from '../../functions'

const PickMonth = (props: IMonthPicker) => {

  const monthsGrid = props.months.map((month: IMonthObject, index: number) => (
      <Month key={index}
             itemIndex={month.itemIndex}
             displayValue={month.name}
             selected={month.selected}
             eventsHandlers={month.eventsHandlers}
             theme={props.theme}
      />
    )
  )
  return (
    <div className={getClassFor({ key: 'monthPicker', theme: props.theme, defaultClass: pickerDate })}>
      {monthsGrid}
    </div>
  )
}

export default PickMonth
