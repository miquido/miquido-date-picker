import { style } from 'typestyle'
import * as React from 'react'

import dropDownIcon from './../img/dropIcon.svg'
import rightArrow from './../img/rightArrow.svg'
import leftArrow from './../img/leftArrow.svg'

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
    fontFamily: 'Roboto',
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
  // const wrapperClass = style({
  //   height: '50px',
  //   fontFamily: 'Rubik',
  //   fontSize: '1.4em',
  //   fontWeight: 500,
  //   letterSpacing: '0.5px',
  //   textAlign: 'center',
  //   color: '#444791',
  //   borderBottom: '1px solid rgba(196, 197, 202, 0.2)',
  //   backgroundColor: '#ffffff',
  //   display: 'flex',
  //   flexDirection: 'row',
  //   flexWrap: 'nowrap',
  //   justifyContent: 'space-between',
  //   alignContent: 'space-between',
  //   alignItems: 'center',
  //   padding: '0 20px',
  //   boxSizing: 'border-box',
  //   width: '100%'
  // })

  const prevMonth = style({
    cursor: 'pointer',
    position: 'absolute',
    top: '50%',
    left: '50px',
    transform: 'translateX(-50%)'
  })
  const monthSelectPicker = style({
    cursor: 'pointer',
    margin: '0 auto',
    $nest: {
      'img': {
        width: '15px',
        height: '15px',
        transform: 'translateY(2px)'
      }
    }
  })
  const nextMonth = style({
    cursor: 'pointer',
    position: 'absolute',
    top: '50%',
    right: '50px',
    transform: 'translateX(-50%)'
  })
  return (
    <div className={wrapperClass}>
      <div className={prevMonth} onClick={props.prevMonth}><img src={leftArrow} alt=''/></div>
      <div className={monthSelectPicker}>
        <span onClick={props.switchToMonthSelect}>{props.displayMonth}</span>
        &nbsp;
        <span onClick={props.switchToYearSelect}>{props.displayYear} <img src={dropDownIcon} alt=''/></span>
      </div>
      <div className={nextMonth} onClick={props.nextMonth}><img src={rightArrow} alt=''/></div>
    </div>
  )
}

export default HeaderMenu
