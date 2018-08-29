import * as React from 'react'
import * as className from './Month.classname'
import { IMonth } from './Month.interface'

const Month = (props: IMonth) => {

  const baseClass = className.monthClass + ' ' +
    (props.selected ? className.selectedMonthClass + ' ' : '')

  return (
    <div className={baseClass}
         onClick={(_) => props.eventsHandlers && props.eventsHandlers.clickHandler(props.itemIndex)}
         onContextMenu={(_) => props.eventsHandlers && props.eventsHandlers.clickHandler(props.itemIndex)}
    >
      {props.displayValue}
    </div>
  )
}

export default Month
