import * as React from 'react'
import { pickingOptions, selectMethods } from './enums'
import { ITheme } from '../themes/theme.interface'

export interface IDaysEventsHandlers {
  mouseUpHandler: (index: number) => void
  mouseDownHandler: (index: number) => void
  mouseOverHandler: (index: number) => void
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
  start: Date
  end?: Date
  display: Date
}

export interface IRestrictions {
  min?: Date
  max?: Date
}

export interface Props {
  children?: React.ReactElement<any>
  theme?: ITheme
  node?: React.RefObject<any>
  singleSelection?: boolean
  onSelect?: (value: object) => void
  defaultValue?: IDefaultValue | undefined
  beforeHeader?: React.ReactNode
  beforeDayNamesRow?: React.ReactNode
  beforeBody?: React.ReactNode
  beforeFooter?: React.ReactNode
  beforeEnd?: React.ReactNode
  restrictions?: IRestrictions
  inputClass?: string
  disabled?: boolean
  placeholder?: string
  showOnlyStart?: boolean
  showOnlyEnd?: boolean
  open?: boolean
  name?: string
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

export interface ISelectionCheck {
  selectedStart: Date
  selectedEnd?: Date
  currentView: Date
}

// extends IDefaultValue ?
export interface ISelectedDate {
  start: Date | null
  end?: Date | null
  display: Date | null
}
