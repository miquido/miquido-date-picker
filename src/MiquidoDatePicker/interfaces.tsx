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
  start: number
  end: number
  month: number
  year: number
}

export interface Props {
  children: React.ReactElement<any>
  theme?: ITheme
  node?: React.RefObject<any>
  singleSelection?: boolean
  selectCallback?: (value: object) => void
  defaultValue?: IDefaultValue | undefined
  beforeHeader?: React.ReactNode
  beforeDayNamesRow?: React.ReactNode
  beforeBody?: React.ReactNode
  beforeFooter?: React.ReactNode
  beforeEnd?: React.ReactNode
}

export interface State {
  isPickerVisible: boolean
  selectionStart: number | undefined
  selectionEnd: number | undefined
  selectMethod: selectMethods | undefined
  currentlyPicking: pickingOptions
  daysArray: IDayObject[]
  selectedMonth: string
  selectedMonthIndex: number
  selectedYear: number
  defaultValue?: IDefaultValue | undefined
  inputValue?: string | undefined
  userSelectedDaysBefore: boolean
}
