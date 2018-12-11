import * as React from 'react'
import { Iday } from './Day.interface'
import * as className from './Day.classname'
import { getClassFor } from '../functions'
import classNames from 'classnames'

const Day = (props: Iday) => {
  const { selected, today, start, end, disabled, displayValue } = props
  const baseClass = getClassFor({
    key: 'dayItem',
    theme: props.theme,
    defaultClass: className.dayClass
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
    [endClass]: end || start,
    [baseClass]: true,
    [selectedClass]: selected && !start && !end,
    [todayClass]: today,
    [disabledClass]: disabled
  })

  return (
    <div className={dayClassNames}
         onMouseOver={(_) => !props.disabled && props.eventsHandlers && props.eventsHandlers.mouseOverHandler(props.itemIndex)}
         onMouseDown={(_) => !props.disabled && props.eventsHandlers && props.eventsHandlers.mouseDownHandler(props.itemIndex)}
         onMouseUp={(_) => !props.disabled && props.eventsHandlers && props.eventsHandlers.mouseUpHandler(props.itemIndex)}
         onClick={(_) => !props.disabled && props.eventsHandlers && props.eventsHandlers.clickHandler(props.itemIndex)}
         onContextMenu={(_) => !props.disabled && props.eventsHandlers && props.eventsHandlers.clickHandler(props.itemIndex)}
    >
      {displayValue}
    </div>
  )
}

export default Day
