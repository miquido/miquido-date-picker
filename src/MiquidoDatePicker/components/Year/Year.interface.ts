import { IYearEventsHandlers } from '../../interfaces'
import { ITheme } from '../../../themes/theme.interface'

export interface IYear {
  displayValue: number | string
  selected?: boolean
  eventsHandlers: IYearEventsHandlers
  itemIndex: number
  theme: ITheme
}
