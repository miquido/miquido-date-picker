import { style } from 'typestyle'

export const baseClass = style({
  height: '40px',
  fontSize: '12px',
  fontWeight: 500,
  color: '#333333',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  justifyContent: 'space-around',
  alignContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  borderBottom: 'rgba(196, 197, 202, 0.2)',
  padding: '0 20px',
  fontFamily: 'Rubik',
  boxSizing: 'border-box',
  width: '100%'
})

export const itemClass = style({
  width: '35px',
  height: '35px',
  textAlign: 'center'
})
