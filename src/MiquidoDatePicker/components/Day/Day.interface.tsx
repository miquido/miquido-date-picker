import { IDaysEventsHandlers } from '../../interfaces'
import { ITheme } from '../../../themes/theme.interface'

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
  theme: ITheme | undefined
}
