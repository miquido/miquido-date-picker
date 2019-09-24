export interface IHeaderMenu {
  displayMonth: string,
  displayYear: number,
  switchToYearSelect: () => void,
  switchToMonthSelect: () => void
  nextMonth: () => void
  prevMonth: () => void
  theme?: object
  shoudlDisplayArrows?: boolean
}
