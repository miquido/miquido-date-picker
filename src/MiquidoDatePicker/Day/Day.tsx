import * as React from 'react'
import { Iday } from './Day.interface'
import * as className from './Day.classname'
import { getClassFor } from '../functions'

const Day = (props: Iday) => {
  const baseClass = getClassFor({
    key: 'dayItem',
    theme: props.theme,
    defaultClass: className.dayClass
  }) + ' ' +
    (props.start ? getClassFor({
      key: 'selectionStart',
      theme: props.theme && props.theme.status,
      defaultClass: className.selectionStartClass
    }) + ' ' : '') +
    (props.end ? getClassFor({
      key: 'selectionEnd',
      theme: props.theme && props.theme.status,
      defaultClass: className.selectionEndClass
    }) + ' ' : '') +
    (props.selected ? getClassFor({
      key: 'day',
      theme: props.theme && props.theme.selected,
      defaultClass: className.selectedDayClass
    }) + ' ' : '') +
    (props.today ? getClassFor({
      key: 'today',
      theme: props.theme && props.theme.status,
      defaultClass: className.todayClass
    }) + ' ' : '') +
    (props.disabled ? getClassFor({
      key: 'disabled',
      theme: props.theme && props.theme.status,
      defaultClass: className.disabledClass
    }) + ' ' : '')

  return (
    <div className={baseClass}
         onMouseOver={(_) => props.eventsHandlers && props.eventsHandlers.mouseOverHandler(props.itemIndex)}
         onMouseDown={(_) => props.eventsHandlers && props.eventsHandlers.mouseDownHandler(props.itemIndex)}
         onMouseUp={(_) => props.eventsHandlers && props.eventsHandlers.mouseUpHandler(props.itemIndex)}
         onClick={(_) => props.eventsHandlers && props.eventsHandlers.clickHandler(props.itemIndex)}
         onContextMenu={(_) => props.eventsHandlers && props.eventsHandlers.clickHandler(props.itemIndex)}

    >
      {props.displayValue}
    </div>
  )
}

export default Day
