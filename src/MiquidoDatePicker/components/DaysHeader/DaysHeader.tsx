import * as React from 'react'
import { dayNames } from '../../consts'
import { baseClass, itemClass } from './DaysHeader.classname'
import { IDaysHeader } from './DaysHeader.interface'
import { getClassFor } from '../../functions'

const DaysHeader = (props: IDaysHeader) => {
  const daysHeader = dayNames.map((day: string, index: number) => {
    return <div key={index} className={getClassFor({ key: 'daysHeaderItem', theme: props.theme, defaultClass: itemClass })}>{day}</div>
  })

  return (
    <div className={getClassFor({ key: 'daysHeaderWrapper', theme: props.theme, defaultClass: baseClass })}>
      {daysHeader}
    </div>
  )
}

export default DaysHeader
