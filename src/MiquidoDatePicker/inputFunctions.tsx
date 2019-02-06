import { checkIfDayIsNotAllowedForSelection, isValidDate } from './functions'
import { IRestrictions, ISelectionObject } from './interfaces'

export const setCorrectTypedValue = (typedValue: string, selectionEnd: number) => {
  if (/^[0-9]\//.test(typedValue)) {
    typedValue = `0${typedValue}`
  }
  if (/^[0-9]{2}\/[0-9]\//.test(typedValue)) {
    typedValue = `${typedValue.substr(0, 3)}0${typedValue.substr(3)}`
  }
  if (/^[0-9]{2}\/[0-9]/.test(typedValue) && typedValue[selectionEnd - 1] === '/') {
    typedValue = `${typedValue.substr(0, 3)}0${typedValue.substr(3)}`
  } else if (/^[0-9]{2}/.test(typedValue) && typedValue[selectionEnd - 1] === '/') {
    typedValue = typedValue
  } else if (/^[0-9]/.test(typedValue) && typedValue[selectionEnd - 1] === '/') {
    typedValue = `0${typedValue}`
  }
  return typedValue
}

export const parseDate = (value: string) => {
  const fixDay = (value: string) => {
    if (/^[4-9]/.test(value)) {
      return `0${value}`
    }
    return value
  }

  const fixIfDayEquals0 = (value: string) => {
    if (/^[0][0]/.test(value)) {
      return `${value.substr(1)}`
    }
    return value
  }

  const fixIfMonthEquals0 = (value: string) => {
    if (/^(.){2}[0][0]/.test(value)) {
      return `${value.substr(0, 2)}${value.substr(3)}`
    }
    return value
  }

  const setMonthIfInvalidDay = (value: string) => {
    if (/^[3][2-9]/.test(value)) {
      return `0${value.substr(0, 1)}0${value.substr(1, 1)}${value.substr(2)}`
    }
    return value
  }

  const fixMonth = (value: string) => {
    if (/^[0-9]{2}[1][3-9]/.test(value)) {
      return `${value.substr(0, 2)}0${value.substr(2)}`
    }
    if (/^[0-9]{2}[2-9]/.test(value)) {
      return `${value.substr(0, 2)}0${value.substr(2)}`
    }
    return value
  }

  const addSlashes = (value: string) => `${
    value.substr(0, 2)
    }${
    value.length > 2 ? '/' : ''
    }${
    value.substr(2, 2)
    }${
    value.length > 4 ? '/' : ''
    }${
    value.substr(4, 4)
    }`

  const clearDateString = (value: string) => value
    .split('/')
    .join('')
    .replace(/\D/g, '')

  let val = clearDateString(value)

  val = fixDay(val)
  val = fixIfDayEquals0(val)
  val = fixIfMonthEquals0(val)
  val = setMonthIfInvalidDay(val)
  val = fixMonth(val)

  return addSlashes(val)
}

export const newDateFromParsed = (parsedDate: string) => {
  const dateArray = parsedDate.split('/')
  const newDay = parseInt(dateArray[0], 10)
  const newMonth = parseInt(dateArray[1], 10)
  const newYear = parseInt(dateArray[2], 10)

  return {
    day: newDay,
    month: newMonth,
    year: newYear,
    dateString: parsedDate,
    date: new Date(newYear, newMonth - 1, newDay)
  }
}

export const isValidToSelect = (valueObj: ISelectionObject, restrictions: IRestrictions | undefined) => {
  if (!valueObj.day || !valueObj.month || !valueObj.year) return false
  if (valueObj.day <= 0) return false
  if (!isValidDate(valueObj.dateString)) return false
  return checkIfDayIsNotAllowedForSelection(restrictions, valueObj.date as Date)
}
