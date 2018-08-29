import { style } from 'typestyle'
import * as React from 'react'

interface IHeaderMenu {
  displayMonth: string,
  displayYear: number,
  switchToYearSelect: () => void,
  switchToMonthSelect: () => void
  nextMonth: () => void
  prevMonth: () => void
}

const HeaderMenu = (props: IHeaderMenu) => {
  const wrapperClass = style({
    height: '50px',
    fontFamily: 'Rubik',
    fontSize: '1.4em',
    fontWeight: 500,
    letterSpacing: '0.5px',
    textAlign: 'center',
    color: '#444791',
    borderBottom: '1px solid rgba(196, 197, 202, 0.2)',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    boxSizing: 'border-box',
    width: '100%'
  })

  const prevMonth = style({
    cursor: 'pointer'
  })
  const monthSelectPicker = style({
    cursor: 'pointer'
  })
  const nextMonth = style({
    cursor: 'pointer'
  })
  return (
    <div className={wrapperClass}>
      <div className={prevMonth} onClick={props.prevMonth}>&lt;</div>
      <div className={monthSelectPicker}>
        <span onClick={props.switchToMonthSelect}>{props.displayMonth}</span>
        &nbsp;
        <span onClick={props.switchToYearSelect}>{props.displayYear}</span>
      </div>
      <div className={nextMonth} onClick={props.nextMonth}>&gt;</div>
    </div>
  )
}

export default HeaderMenu
