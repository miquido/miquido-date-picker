import { IDaysEventsHandlers } from '../interfaces'

export interface IPickDayProps {
  key?: number,
  days: object[],
  eventsHandlers: IDaysEventsHandlers,
  pastDaysAmount: number
}

export default IPickDayProps
