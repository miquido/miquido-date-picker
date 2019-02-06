import { IDaysEventsHandlers, IRestrictions, ISelectedDate } from '../../interfaces'
import { ITheme } from '../../../themes/theme.interface'

export interface IPickDayProps {
  key?: number
  eventsHandlers: IDaysEventsHandlers,
  pastDaysAmount: number
  theme: ITheme
  selectedYear: number
  selectedMonthIndex: number
  selection?: ISelectedDate
  restrictions?: IRestrictions
}

export default IPickDayProps
