import { IDaysEventsHandlers } from '../interfaces'

export interface Iday {
  key: string
  displayValue: string
  itemIndex: number
  selected?: boolean
  today?: boolean
  start?: boolean
  end?: boolean
  eventsHandlers?: IDaysEventsHandlers
  disabled?: boolean
}
