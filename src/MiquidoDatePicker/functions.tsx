import { IDayObject, ISelectedDate } from './interfaces'
import { cssRaw } from 'typestyle'

export const selectDate = (day: IDayObject) => ({ ...day, selected: true })

export const unselectDate = (day: IDayObject) => ({ ...day, selected: false })

export const disableDay = (day: IDayObject) => ({ ...day, disabled: true })

export const enableDay = (day: IDayObject) => ({ ...day, disabled: false })

export const getDaysInMonth = (monthIndex: number, year: number) => {
  return new Date(year, monthIndex + 1, 0).getDate()
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
      itemIndex: i,
      date: new Date(year, month, i + 1)
    }
    dayObj.today = (i + 1) === now.getDate() && year === now.getFullYear() && month === now.getMonth()
    daysArray.push(Object.assign({}, dayObj))
  }
  return daysArray
}

export const getFirstMondayIndex = (monthIndex: number, year: number) => {
  const date = new Date()
  date.setFullYear(year)
  date.setMonth(monthIndex)
  date.setDate(1)

  while (date.getDay() !== 1) {
    date.setDate(date.getDate() + 1)
  }
  return date.getDate() - 1
}

export const defaultClassNameShouldBeOverwritten = (theme: object | undefined, key: string) => {
  return Boolean(theme && theme.hasOwnProperty(key) && theme[key])
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

// @TODO is this function need or incompleate?  should it be renamed to single selection ?
export const assembleDate = (startDay: number, endDay: number | undefined, monthIndex: number, year: number) => {
  if (endDay) {
    if (startDay > endDay) [startDay, endDay] = [endDay, startDay]

    const monthNumberFromIndex = monthIndex + 1
    if (startDay === endDay) {
      let precedeZeroDay = ''
      let precedeZeroMonth = ''
      if (startDay < 10) {
        precedeZeroDay = '0'
      }
      if (monthNumberFromIndex < 10) {
        precedeZeroMonth = '0'
      }
      return `${precedeZeroDay}${startDay}/${precedeZeroMonth}${monthNumberFromIndex}/${year}`
    }
  }
  return ''
}
// @TODO add reversing dates if end is before start
export const assembleMultiSelectDate = (startDate: Date, endDate: Date) => {
  const startDay = startDate.getDate()
  const startMonth = startDate.getMonth() + 1
  const startYear = startDate.getFullYear()

  const endDay = endDate.getDate()
  const endMonth = endDate.getMonth() + 1
  const endYear = endDate.getFullYear()

  let precedeZeroDayStart = startDay < 10 ? '0' : ''
  let precedeZeroMonthStart = startMonth < 10 ? '0' : ''
  let precedeZeroDayEnd = endDay < 10 ? '0' : ''
  let precedeZeroMonthEnd = endMonth < 10 ? '0' : ''

  return (`${precedeZeroDayStart}${startDay}/${precedeZeroMonthStart}${startMonth}/${startYear}-${precedeZeroDayEnd}${endDay}/${precedeZeroMonthEnd}${endMonth}/${endYear}`
  )
}
export const assembleDateForStartOnly = (startDate: Date) => {
  const startDay = startDate.getDate() + 1
  const startMonth = startDate.getMonth() + 1
  const startYear = startDate.getFullYear()

  let precedeZeroDay = startDay < 10 ? '0' : ''
  let precedeZeroMonth = startMonth < 10 ? '0' : ''

  return `${precedeZeroDay}${startDay}/${precedeZeroMonth}${startMonth}/${startYear}`
}
export const assembleDateForEndOnly = (endDate: Date) => {
  const endDay = endDate.getDate() + 1
  const endMonth = endDate.getMonth() + 1
  const endYear = endDate.getFullYear()

  let precedeZeroDay = endDay < 10 ? '0' : ''
  let precedeZeroMonth = endMonth < 10 ? '0' : ''

  return `${precedeZeroDay}${endDay}/${precedeZeroMonth}${endMonth}/${endYear}`
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

export const checkVisibleCalendarForSelection = (
  selectionCheck: ISelectedDate,
  displayedMonthIndex: number,
  displayedYear: number
) => {
  const { start, end } = selectionCheck
  const displayedStart = new Date(displayedYear, displayedMonthIndex, 1)
  // +1 to get next month then get last day from previous by setting day to 0
  const displayedEnd = new Date(displayedYear, displayedMonthIndex + 1, 0)

  return ((start as Date).getTime() >= displayedStart.getTime() && ((end as Date).getTime()) <= displayedEnd.getTime())
}

export const getLastDayOfAMonth = (year: number, monthIndex: number) => {
  return new Date(year, monthIndex + 1, 0).getDate()
}

// const getMonthsToSelect = (start: number, end: number) => {
//   if (start === end) return 1
//   if (start > end) {
//     // end is in next year
//     return 12 - start + end
//   }
//   return Math.abs(start - end)
// }

export const isNumeric = (n: any) => {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

export const charWasDeleted = (previousStr: string, currentStr: string) => {
  return currentStr < previousStr
}

export const isValidaDayFormat = (testValue: string | number, daysInMonth: number, pattern = 'DD') => {
  if (testValue.toString().length !== pattern.length || testValue.toString().length === 0) return false
  if (!isNumeric(testValue)) return false
  return !(parseInt(testValue as string, 10) > daysInMonth || parseInt(testValue as string, 10) < 1)
}

export const isValidMonthFormat = (testValue: string | number, pattern = 'MM') => {
  if (testValue.toString().length !== pattern.length) return false
  if (!isNumeric(testValue)) return false
  return !(parseInt(testValue as string, 10) > 12 || parseInt(testValue as string, 10) < 1)
}

export const isValidYearFormat = (testValue: string | number, pattern = 'YYYY') => {
  if (testValue.toString().length !== pattern.length) return false
  return isNumeric(testValue)
}

export const isValidDate = (date: any, pattern = 'DD/MM/YYYY') => {
  const separator = pattern.match(/\W/) as Array<any>
  const patternParts = pattern.split(separator[0])
  const dateParts = date.split(separator)
  const dayIndex = patternParts.indexOf('DD')
  const monthIndex = patternParts.indexOf('MM')
  const yearIndex = patternParts.indexOf('YYYY')

  return (
    isValidaDayFormat(dateParts[dayIndex],
      getDaysInMonth(dateParts[monthIndex], dateParts[yearIndex])) &&
    isValidMonthFormat(dateParts[monthIndex]) &&
    isValidYearFormat(dateParts[yearIndex])
  )
}

export const replaceCharInText = (position: number, text: string, replaceChar: string) => {
  if (isNumeric(position) && position <= text.length) {
    return text.substring(0, position - 1) + replaceChar + text.substring(position)
  }
  return text
}
//
// export const compareObjects = (o1: object, o2: object) => {
//   return JSON.stringify(o1) !== JSON.stringify(o2)
// }
