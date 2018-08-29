import { IDaysEventsHandlers } from '../index'

export interface IPickDayProps {
  key?: number,
  days: object[],
  eventsHandlers: IDaysEventsHandlers
}

export default IPickDayProps
