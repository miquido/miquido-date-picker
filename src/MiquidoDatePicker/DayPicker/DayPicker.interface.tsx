import { IDaysEventsHandlers } from '../interfaces'
import { ITheme } from '../../themes/theme.interface'

export interface IPickDayProps {
  key?: number,
  days: object[],
  eventsHandlers: IDaysEventsHandlers,
  pastDaysAmount: number
  theme: ITheme
}

export default IPickDayProps
