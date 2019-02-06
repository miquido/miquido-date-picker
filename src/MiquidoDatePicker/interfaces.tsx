import * as React from 'react'
import { pickingOptions, selectMethods } from './enums'
import { ITheme } from '../themes/theme.interface'

export interface IDaysEventsHandlers {
  mouseUpHandler: (index: number) => void
  mouseDownHandler: (index: number) => void
  mouseOverHandler?: (index: number) => void
  clickHandler: (index: number) => void
}

export interface IMonthEventsHandlers {
  clickHandler: (index: number) => void
}

export interface IYearEventsHandlers {
  clickHandler: (index: number) => void
}

export interface IDayObject {
  displayValue: string | number
  selected: boolean
  today: boolean
  start: boolean
  end: boolean
  itemIndex: number
  date: Date
}

// TODO + readonly wywalic name ?
// TODO sprawdzic czy jest w ogole potrzebne
export interface IMonthObject {
  name: string
  itemIndex: number
  selected: boolean
  eventsHandlers: { clickHandler: (index: number) => void }
  theme: ITheme
}

export interface IYearObject {
  name: number
  selected: boolean
  itemIndex: number
  eventsHandlers: { clickHandler: (index: number) => void }
}

export interface IDefaultValue {
  start?: Date
  end?: Date
  display: Date
}

export interface IRestrictions {
  min?: Date
  max?: Date
}

export interface IDoubleRestrictions extends IRestrictions {
  start?: IRestrictions
  end?: IRestrictions
}

export interface Props {
  children?: React.ReactElement<any>
  theme?: ITheme
  node?: React.RefObject<any>
  type?: string
  onSelect?: (value: object) => void
  defaultValue?: IDefaultValue | undefined
  beforeHeader?: React.ReactNode
  beforeDayNamesRow?: React.ReactNode
  beforeBody?: React.ReactNode
  beforeFooter?: React.ReactNode
  beforeEnd?: React.ReactNode
  restrictions?: IDoubleRestrictions
  inputClass?: string
  disabled?: boolean
  placeholder?: string
  showOnlyStart?: boolean
  showOnlyEnd?: boolean
  open?: boolean
  close?: boolean
  name?: string
  onClick?: () => void
}

export interface State {
  isPickerVisible: boolean
  selectionStart: number | undefined
  selectionEnd: number | undefined
  selectMethod: selectMethods | undefined
  currentlyPicking: pickingOptions
  daysArray: IDayObject[]
  displayedMonth: string
  displayedMonthIndex: number
  displayedYear: number
  defaultValue?: IDefaultValue | undefined
  inputValue?: string | undefined
  userSelectedDaysBefore: boolean
  yearsList: IYearObject[]
  selectedDate: ISelectedDate
  disabled?: boolean | undefined
}

export interface SingleSelectionState {
  isPickerVisible: boolean
  currentlyPicking: pickingOptions
  displayedMonthIndex: number
  displayedYear: number
  defaultValue?: IDefaultValue | undefined
  inputValue?: string | undefined
  userSelectedDaysBefore: boolean
  yearsList: IYearObject[]
  selectedDate: ISelectedDate
  disabled?: boolean | undefined
  type?: string
  userForcedClose: boolean
}

export interface ISelectionCheck {
  selectedStart: Date
  selectedEnd?: Date
  currentView: Date
}

// extends IDefaultValue ?
export interface ISelectedDate {
  start?: Date | null
  end?: Date | null
  display: Date | null
}

export interface ISelectionObject {
  day?: number
  month?: number
  year?: number
  dateString?: string
  date?: Date
}
