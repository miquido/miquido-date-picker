import { IMonthObject, IRestrictions } from '../../interfaces'
import { ITheme } from '../../../themes/theme.interface'

export interface IMonthPicker {
  months: IMonthObject[]
  selected?: boolean
  eventsHandlers?: object
  theme: ITheme
  restrictions?: IRestrictions
  displayedYear: number
}
