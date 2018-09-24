import { IDayObject } from './interfaces'

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
    console.log('now', now, now.getDate())
    dayObj.today = (i + 1) === now.getDate()
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
    return `${getDisplayValue(daysArray, startDay)}` + `/${monthNumberFromIndex}/${year}`
  }
  return `${getDisplayValue(daysArray, startDay)} - ${getDisplayValue(daysArray, endDay)}`
    + `/${monthNumberFromIndex}/${year}`
}
