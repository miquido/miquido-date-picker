import * as React from 'react'
import { IYearEventsHandlers } from '../interfaces'
import { baseClass, selectedClass } from './Year.classname'

interface IYear {
  displayValue: number | string
  selected?: boolean
  eventsHandlers: IYearEventsHandlers
  itemIndex: number
}

const Year = (props: IYear) => {

  const className = baseClass + ' ' + (props.selected ? selectedClass : '')
  return (
    <div className={className}
         onClick={(_) => props.eventsHandlers && props.eventsHandlers.clickHandler(+props.displayValue)}
         onContextMenu={(_) => props.eventsHandlers && props.eventsHandlers.clickHandler(+props.displayValue)}
    >
      {props.displayValue}
    </div>
  )
}

export default Year
