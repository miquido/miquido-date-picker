import * as React from 'react'
import { baseClass, disabledClass, selectedClass } from './Year.classname'
import { IYear } from './Year.interface'
import { getClassFor } from '../../functions'

const Year = (props: IYear) => {

  const className = getClassFor({ key: 'year', theme: props.theme, defaultClass: baseClass }) + ' ' +
    (props.selected ? getClassFor({
      key: 'year',
      theme: props.theme && props.theme.selected,
      defaultClass: selectedClass
    }) + ' ' : '') +
    (props.allowed ? '' : getClassFor({ key: 'year', theme: props.theme, defaultClass: disabledClass }))

  return (
    <div className={className}
         onClick={(_) => props.allowed && props.eventsHandlers && props.eventsHandlers.clickHandler(+props.displayValue)}
         onContextMenu={(_) => props.allowed && props.eventsHandlers && props.eventsHandlers.clickHandler(+props.displayValue)}
    >
      {props.displayValue}
    </div>
  )
}

export default Year
