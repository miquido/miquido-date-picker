import { IMonthEventsHandlers } from '../interfaces'
import { ITheme } from '../../themes/theme.interface'

export interface IMonth {
  selected?: boolean
  eventsHandlers?: IMonthEventsHandlers
  displayValue: string | number
  itemIndex: number
  theme: ITheme
}
