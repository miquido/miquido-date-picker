import { style } from 'typestyle'
import * as React from 'react'
import { dayNames } from '../consts'

const DaysHeader = () => {
  // const baseClass = style({
  //   height: '40px',
  //   fontSize: '12px',
  //   fontWeight: 500,
  //   color: '#333333',
  //   display: 'flex',
  //   flexDirection: 'row',
  //   flexWrap: 'nowrap',
  //   justifyContent: 'space-around',
  //   alignContent: 'space-between',
  //   alignItems: 'center',
  //   backgroundColor: '#ffffff',
  //   borderBottom: 'rgba(196, 197, 202, 0.2)',
  //   padding: '0 20px',
  //   fontFamily: 'Rubik',
  //   boxSizing: 'border-box',
  //   width: '100%'
  // })
  const baseClass = style({
    height: '40px',
    fontSize: '12px',
    fontWeight: 400,
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
    fontFamily: 'Roboto',
    boxSizing: 'border-box',
    width: '100%',
    maxWidth: '250px',
    margin: '0 auto'
  })
  // const itemClass = style({
  //   width: '35px',
  //   height: '35px',
  //   textAlign: 'center'
  // })

  const itemClass = style({
    width: '30px',
    height: '25px',
    textAlign: 'center',
    fontFamily: 'Roboto',
    margin: '0 3px'
  })

  const daysHeader = dayNames.map((day: string, index: number) => {
    return <div key={index} className={itemClass}>{day}</div>
  })

  return (
    <div className={baseClass}>
      {daysHeader}
    </div>
  )
}

export default DaysHeader
