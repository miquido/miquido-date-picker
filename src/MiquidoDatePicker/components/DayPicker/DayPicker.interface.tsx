import { IDaysEventsHandlers, IRestrictions } from '../../interfaces'
import { ITheme } from '../../../themes/theme.interface'

export interface IPickDayProps {
  key?: number
  eventsHandlers: IDaysEventsHandlers,
  pastDaysAmount: number
  theme: ITheme
  selectedYear: number
  selectedMonthIndex: number
  selection?: Date | undefined
  restrictions?: IRestrictions
}

export default IPickDayProps
