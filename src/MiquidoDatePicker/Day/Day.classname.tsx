import { style } from 'typestyle'

export const dayClass = style({
  width: '35px',
  height: '35px',
  fontSize: '12px',
  fontWeight: 300,
  lineHeight: '35px',
  textAlign: 'center',
  userSelect: 'none',
  cursor: 'pointer',
  $nest: {
    '&:hover': {
      color: '#333333',
      backgroundColor: '#efefef'
    }
  }
})

export const selectionStartClass = style({
  borderRadius: '2px',
  backgroundColor: '#ff5b9e',
  color: '#ffffff',
  fontWeight: 500
})

export const selectionEndClass = style({
  borderRadius: '2px',
  backgroundColor: '#ff5b9e',
  color: '#ffffff',
  fontWeight: 500,
  $nest: {
    '&&': {
      borderRadius: '2px',
      backgroundColor: '#ff5b9e',
      color: '#ffffff',
      fontWeight: 500
    }
  }
})

export const selectedDayClass = style({
  color: '#333333',
  backgroundColor: 'rgba(255, 91, 158, .5)',
  $nest: {
    '&:hover': {
      color: '#333333',
      backgroundColor: 'rgba(255, 91, 158, .5)'
    }
  }
})

export const todayClass = style({
  color: '#ff5b9e'
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
