import { IMonthEventsHandlers } from '../interfaces'

export interface IMonth {
  selected?: boolean
  eventsHandlers?: IMonthEventsHandlers
  displayValue: string | number
  itemIndex: number
}
