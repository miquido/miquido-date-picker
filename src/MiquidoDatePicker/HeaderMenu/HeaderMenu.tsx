import * as React from 'react'
import dropDownIcon from './../img/dropIcon.svg'
import rightArrow from './../img/rightArrow.svg'
import leftArrow from './../img/leftArrow.svg'
import { monthSelectPicker, nextMonth, prevMonth, wrapperClass } from './HeaderMenu.classname'
import { getClassFor } from '../functions'
import { IHeaderMenu } from './HeaderMenu.interface'

const HeaderMenu = (props: IHeaderMenu) => {
  return (
    <div className={getClassFor({ key: 'headerMenu', theme: props.theme, defaultClass: wrapperClass })}>
      <div className={getClassFor({ key: 'prevMonthBtn', theme: props.theme, defaultClass: prevMonth })}
           onClick={props.prevMonth}><img src={leftArrow} alt=''/></div>
      <div className={getClassFor({ key: 'monthSelectBtn', theme: props.theme, defaultClass: monthSelectPicker })}>
        <span onClick={props.switchToMonthSelect}>{props.displayMonth}</span>
        &nbsp;
        <span onClick={props.switchToYearSelect}>{props.displayYear} <img src={dropDownIcon} alt=''/></span>
      </div>
      <div className={getClassFor({ key: 'nextMonthBtn', theme: props.theme, defaultClass: nextMonth })}
           onClick={props.nextMonth}><img src={rightArrow} alt=''/></div>
    </div>
  )
}

export default HeaderMenu
