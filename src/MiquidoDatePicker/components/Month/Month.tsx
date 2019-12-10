import * as React from 'react'
import { monthClass, disabledClass, selectedMonthClass } from './Month.classname'
import { IMonth } from './Month.interface'
import { getClassFor } from '../../functions'

const Month = (props: IMonth) => {

  const baseClass =
    getClassFor({ key: 'month', theme: props.theme, defaultClass: monthClass }) + ' ' +
    (props.selected ? getClassFor({
      key: 'month',
      theme: props.theme && props.theme.selected,
      defaultClass: selectedMonthClass
    }) + ' ' : '') +
    (props.allowed ? '' : getClassFor({ key: 'month', theme: props.theme, defaultClass: disabledClass }))
  return (
    <div className={baseClass}
         onClick={(_) => props.allowed && props.eventsHandlers && props.eventsHandlers.clickHandler(props.itemIndex)}
         onContextMenu={(_) => props.allowed && props.eventsHandlers && props.eventsHandlers.clickHandler(props.itemIndex)}
    >
      {props.displayValue}
    </div>
  )
}

export default Month
