import { style } from 'typestyle'

export const baseClass = style({
  width: '49px',
  height: '29px',
  fontSize: '12px',
  fontWeight: 300,
  lineHeight: '29px',
  textAlign: 'center',
  userSelect: 'none',
  cursor: 'pointer',
  margin: '17px 6px',
  boxSizing: 'border-box',
  $nest: {
    '&:hover': {
      color: '#333333',
      backgroundColor: '#efefef',
      borderRadius: '2px'
    }
  }
})

export const selectedClass = style({
  backgroundColor: '#ff5b9e',
  fontWeight: 400,
  color: '#ffffff',
  borderRadius: '2px'
})

export const disabledClass = style({
  color: '#c4c5ca',
  cursor: 'normal',
  $nest: {
    '&:hover': {
      color: '#c4c5ca',
      backgroundColor: 'transparent'
    }
  }
})
