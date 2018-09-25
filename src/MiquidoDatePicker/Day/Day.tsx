import * as React from 'react'
import { Iday } from './Day.interface'
import * as className from './Day.classname'
import { getClassFor } from '../functions'
import classNames from 'classnames'

const Day = (props: Iday) => {
  const { selected, today, start, end, disabled } = props
  const baseClass = getClassFor({
    key: 'dayItem',
    theme: props.theme,
    defaultClass: className.dayClass
  })

  const startClass = getClassFor({
    key: 'selectionStart',
    theme: props.theme && props.theme.status,
    defaultClass: className.selectionStartClass
  })

  const endClass = getClassFor({
    key: 'selectionEnd',
    theme: props.theme && props.theme.status,
    defaultClass: className.selectionEndClass
  })

  const selectedClass = getClassFor({
    key: 'day',
    theme: props.theme && props.theme.selected,
    defaultClass: className.selectedDayClass
  })

  const todayClass = getClassFor({
    key: 'today',
    theme: props.theme && props.theme.status,
    defaultClass: className.todayClass
  })

  const disabledClass = getClassFor({
    key: 'disabled',
    theme: props.theme && props.theme.status,
    defaultClass: className.disabledClass
  })

  const dayClassNames = classNames({
    [startClass]: start,
    [endClass]: end,
    [baseClass]: true,
    [selectedClass]: selected,
    [todayClass]: today,
    [disabledClass]: disabled
  })

  return (
    <div className={dayClassNames}
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
