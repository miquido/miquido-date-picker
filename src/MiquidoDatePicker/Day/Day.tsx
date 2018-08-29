import * as React from 'react'
import { Iday } from './Day.interface'
import * as className from './Day.classname'

const Day = (props: Iday) => {

  const baseClass = className.dayClass + ' ' +
    (props.start ? className.selectionStartClass + ' ' : '') +
    (props.end ? className.selectionEndClass + ' ' : '') +
    (props.selected ? className.selectedDayClass + ' ' : '') +
    (props.today ? className.todayClass : '') +
    (props.disabled ? className.disabledClass + ' ' : '')

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
