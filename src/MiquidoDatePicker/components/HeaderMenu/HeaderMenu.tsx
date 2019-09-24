import * as React from 'react'
import {
  headerDisplayedIcon,
  headerDisplayedMonth,
  headerDisplayedYear,
  monthSelectPicker,
  nextMonth,
  prevMonth,
  wrapperClass
} from './HeaderMenu.classname'
import { getClassFor } from '../../functions'
import { IHeaderMenu } from './HeaderMenu.interface'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const HeaderMenu = (props: IHeaderMenu) => {

  return (
    <div className={getClassFor({ key: 'headerMenu', theme: props.theme, defaultClass: wrapperClass })}>
      {props.shoudlDisplayArrows && <div className={getClassFor({ key: 'prevMonthBtn', theme: props.theme, defaultClass: prevMonth })}
           onClick={props.prevMonth}><FontAwesomeIcon icon='arrow-left' size='sm'/></div>}
      <div className={getClassFor({ key: 'monthSelectBtn', theme: props.theme, defaultClass: monthSelectPicker })}>
        <span onClick={props.switchToMonthSelect}
              className={getClassFor({ key: 'headerDisplayedMonth', theme: props.theme, defaultClass: headerDisplayedMonth })}>
          {props.displayMonth}
          </span>
        <span onClick={props.switchToYearSelect}
              className={getClassFor({ key: 'headerDisplayedYear', theme: props.theme, defaultClass: headerDisplayedYear })}
        >
          {props.displayYear}
          <FontAwesomeIcon
            className={getClassFor({ key: 'headerDisplayedIcon', theme: props.theme, defaultClass: headerDisplayedIcon })}
            icon='caret-down' size='sm'/>
        </span>
      </div>
      {props.shoudlDisplayArrows && <div className={getClassFor({ key: 'nextMonthBtn', theme: props.theme, defaultClass: nextMonth })}
           onClick={props.nextMonth}><FontAwesomeIcon icon='arrow-right' size='sm'/></div>}
    </div>
  )
}

export default HeaderMenu
