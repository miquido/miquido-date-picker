import { IMonthEventsHandlers } from '../index'

export interface IMonth {
  selected?: boolean
  eventsHandlers?: IMonthEventsHandlers
  displayValue: string | number
  itemIndex: number
}
