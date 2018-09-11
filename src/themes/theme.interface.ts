export interface IStatusOptions {
  today: string
  disabled: string
  selectionStart: string
  selectionEnd: string
}

export interface ISelectable {
  day: string
  month: string
  year: string
}

export interface ITheme {
  pickerWrapper?: string
  picker?: string
  headerMenu?: string
  prevMonthBtn?: string
  nextMonthBtn?: string
  monthSelectBtn?: string
  footerWrapper?: string
  daysHeaderWrapper?: string
  daysHeaderItem?: string
  saveBtn?: string
  clearBtn?: string
  yearPicker?: string
  yearItem?: string
  monthPicker?: string
  monthItem?: string
  dayPicker?: string
  dayItem?: string
  selected?: ISelectable
  status?: IStatusOptions
}
