import * as React from 'react'
import { style } from 'typestyle'
import { IYearEventsHandlers } from '../interfaces'

interface IYear {
  displayValue: number | string
  selected?: boolean
  eventsHandlers: IYearEventsHandlers
  itemIndex: number
}

const Year = (props: IYear) => {

  // const baseClass = style({
  //   width: '49px',
  //   height: '29px',
  //   fontSize: '12px',
  //   fontWeight: 300,
  //   lineHeight: '29px',
  //   textAlign: 'center',
  //   userSelect: 'none',
  //   cursor: 'pointer',
  //   margin: '17px 6px',
  //   boxSizing: 'border-box',
  //   $nest: {
  //     '&:hover': {
  //       color: '#333333',
  //       backgroundColor: '#efefef',
  //       borderRadius: '2px'
  //     }
  //   }
  // })
  const baseClass = style({
    width: '49px',
    height: '29px',
    fontSize: '12px',
    fontWeight: 300,
    lineHeight: '29px',
    textAlign: 'center',
    userSelect: 'none',
    cursor: 'pointer',
    margin: '14px 6px',
    boxSizing: 'border-box',
    $nest: {
      '&:hover': {
        color: '#333333',
        backgroundColor: '#ffc800',
        borderRadius: '6px'
      }
    }
  })
  // const selectedClass = style({
  //   backgroundColor: '#ff5b9e',
  //   fontWeight: 400,
  //   color: '#ffffff',
  //   borderRadius: '2px'
  // })
  const selectedClass = style({
    backgroundColor: '#ffc800',
    fontWeight: 400,
    color: '#ffffff',
    borderRadius: '6px'
  })
  const className = baseClass + ' ' + (props.selected ? selectedClass : '')
  return (
    <div className={className}
         onClick={(_) => props.eventsHandlers && props.eventsHandlers.clickHandler(+props.displayValue)}
         onContextMenu={(_) => props.eventsHandlers && props.eventsHandlers.clickHandler(+props.displayValue)}
    >
      {props.displayValue}
    </div>
  )
}

export default Year
