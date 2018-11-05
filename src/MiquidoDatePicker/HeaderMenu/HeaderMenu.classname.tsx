import { style } from 'typestyle'

export const wrapperClass = style({
  height: '50px',
  fontFamily: 'Rubik',
  fontSize: '1.4em',
  fontWeight: 500,
  letterSpacing: '0.5px',
  textAlign: 'center',
  color: '#444791',
  borderBottom: '1px solid rgba(196, 197, 202, 0.2)',
  backgroundColor: '#ffffff',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  justifyContent: 'space-between',
  alignContent: 'space-between',
  alignItems: 'center',
  padding: '0 20px',
  boxSizing: 'border-box',
  width: '100%'
})

export const prevMonth = style({
  cursor: 'pointer'
})

export const monthSelectPicker = style({
  cursor: 'pointer',
  margin: '0 auto',
  $nest: {
    'img': {
      width: '15px',
      height: '15px',
      transform: 'translateY(2px)'
    }
  }
})

export const nextMonth = style({
  cursor: 'pointer'
})

export const headerDisplayedYear = style({
  margin: '0 5px'
})
export const headerDisplayedMonth = style({
  margin: '0 5px'
})
export const headerDisplayedIcon = style({
  margin: '0 5px'
})
