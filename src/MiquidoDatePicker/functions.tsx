import { IDayObject } from './interfaces'
import { cssRaw } from 'typestyle'

export const selectDate = (day: IDayObject) => ({ ...day, selected: true })

export const unselectDate = (day: IDayObject) => {
  const selectedObj = day
  selectedObj.selected = false
  return selectedObj
}

export const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate()
}

export const generateCalendar = (month: number, year: number) => {
  const now = new Date()

  const daysInMonth = getDaysInMonth(month, year)
  const daysArray = []

  for (let i = 0; i < daysInMonth; i++) {
    const dayObj: IDayObject = {
      displayValue: i + 1,
      selected: false,
      today: false,
      start: false,
      end: false,
      itemIndex: i
    }
    dayObj.today = (i + 1) === now.getDate() && year === now.getFullYear() && month === now.getMonth()
    daysArray.push(Object.assign({}, dayObj))
  }
  return daysArray
}

export const getFirstMondayIndex = (month: number, year: number) => {
  return new Date(year, month, 0).getDay()
}

export const defaultClassNameShouldBeOverwritten = (theme: object | undefined, key: string) => {
  return theme && theme.hasOwnProperty(key) && theme[key]
}

interface IGetClassObject {
  key: string
  theme?: object
  defaultClass: string
}

export const getClassFor = (args: IGetClassObject): string => {
  const { key, theme, defaultClass } = args
  if (theme && defaultClassNameShouldBeOverwritten(theme, key)) {
    return theme[key]
  } else {
    return defaultClass
  }
}

export const getDisplayValue = (days: IDayObject[], index: number) => {
  return days[index] && days[index].displayValue
}

export const asembleDate = (startDay: number, endDay: number, monthIndex: number, year: number, daysArray: IDayObject[]) => {
  if (startDay > endDay) [startDay, endDay] = [endDay, startDay]

  const monthNumberFromIndex = monthIndex + 1
  if (startDay === endDay) {
    return `${year}/${monthNumberFromIndex}/${getDisplayValue(daysArray, startDay)}`
  }
  return `${getDisplayValue(daysArray, startDay)} - ${getDisplayValue(daysArray, endDay)}`
    + `/${monthNumberFromIndex}/${year}`
}

export const setRawStyles = () => {
  return cssRaw(`
.picker-enter {
  opacity: 0.01;
  transform: scale(0.9) translateY(50%);
}
.picker-enter-active {
  opacity: 1;
  transform: scale(1) translateY(0%);
  transition: all 300ms ease-out;
}
.picker-exit {
  opacity: 1;
  transform: scale(1) translateY(0%);
}
.picker-exit-active {
  opacity: 0.01;
  transform: scale(0.9) translateY(50%);
  transition: all 300ms ease-out;
}
`)
}
