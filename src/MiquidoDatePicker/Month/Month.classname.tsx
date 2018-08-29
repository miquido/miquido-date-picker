import { style } from 'typestyle'

// export const monthClass = style({
//   width: '55px',
//   height: '35px',
//   fontSize: '12px',
//   fontWeight: 300,
//   lineHeight: '35px',
//   textAlign: 'center',
//   userSelect: 'none',
//   cursor: 'pointer',
//   margin: '17px 6px',
//   $nest: {
//     '&:hover': {
//       color: '#333333',
//       backgroundColor: '#efefef',
//       borderRadius: '2px'
//     }
//   }
// })

export const monthClass = style({
  width: '55px',
  height: '29px',
  fontSize: '12px',
  fontWeight: 300,
  lineHeight: '29px',
  textAlign: 'center',
  userSelect: 'none',
  cursor: 'pointer',
  margin: '14px 6px',
  $nest: {
    '&:hover': {
      color: '#333333',
      backgroundColor: '#ffc800',
      borderRadius: '6px'
    }
  }
})
//
// export const selectedMonthClass = style({
//   color: '#ffffff',
//   backgroundColor: '#ff5b9e',
//   fontWeight: 400,
//   borderRadius: '2px',
//   $nest: {
//     '&:hover': {
//       color: '#ffffff',
//       backgroundColor: '#ff5b9e',
//       borderRadius: '2px'
//     }
//   }
// })

export const selectedMonthClass = style({
  color: '#ffffff',
  backgroundColor: '#ffc800',
  fontWeight: 400,
  borderRadius: '6px',
  $nest: {
    '&:hover': {
      color: '#ffffff',
      backgroundColor: '#ffc800',
      borderRadius: '6px'
    }
  }
})
