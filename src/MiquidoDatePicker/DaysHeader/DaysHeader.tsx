import { style } from 'typestyle'
import * as React from 'react'

const DaysHeader = () => {
  const baseClass = style({
    height: '40px',
    fontSize: '12px',
    fontWeight: 500,
    color: '#333333',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottom: 'rgba(196, 197, 202, 0.2)',
    padding: '0 20px',
    fontFamily: 'Rubik',
    boxSizing: 'border-box',
    width: '100%'
  })

  const itemClass = style({
    width: '35px',
    height: '35px',
    textAlign: 'center'
  })

  const monthsNames = [
    'Mo',
    'Tu',
    'We',
    'Th',
    'Fr',
    'Sa',
    'Su'
  ].map((day: string, index: number) => {
    return <div key={index} className={itemClass}>{day}</div>
  })

  return (
    <div className={baseClass}>
      {monthsNames}
    </div>
  )
}

export default DaysHeader
