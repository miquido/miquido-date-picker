import * as React from 'react'
import * as className from './Month.classname'
import { IMonth } from './Month.interface'
import { getClassFor } from '../../functions'

const Month = (props: IMonth) => {

  const baseClass =
    getClassFor({ key: 'month', theme: props.theme, defaultClass: className.monthClass }) + ' ' +
    (props.selected ? getClassFor({
      key: 'month',
      theme: props.theme && props.theme.selected,
      defaultClass: className.selectedMonthClass
    }) + ' ' : '')

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
