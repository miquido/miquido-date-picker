import * as React from 'react'
import { monthSelectPicker, nextMonth, prevMonth, wrapperClass } from './HeaderMenu.classname'
import { getClassFor } from '../functions'
import { IHeaderMenu } from './HeaderMenu.interface'

const HeaderMenu = (props: IHeaderMenu) => {

  return (
    <div className={getClassFor({ key: 'headerMenu', theme: props.theme, defaultClass: wrapperClass })}>
      <div className={getClassFor({ key: 'prevMonthBtn', theme: props.theme, defaultClass: prevMonth })}
           onClick={props.prevMonth}>&nbsp;</div>
      <div className={getClassFor({ key: 'monthSelectBtn', theme: props.theme, defaultClass: monthSelectPicker })}>
        <span onClick={props.switchToMonthSelect}>{props.displayMonth}</span>
        &nbsp;
        <span onClick={props.switchToYearSelect}>{props.displayYear}</span>
      </div>
      <div className={getClassFor({ key: 'nextMonthBtn', theme: props.theme, defaultClass: nextMonth })}
           onClick={props.nextMonth}>&nbsp;</div>
    </div>
  )
}

export default HeaderMenu
