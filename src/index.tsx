import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { cssRaw } from 'typestyle'

import MiquidoDatePicker from './MiquidoDatePicker/MiquidoDatePicker'
import { tripGateTheme } from './themes/tripgate/tripgate_theme'

cssRaw(`
@import url('https://fonts.googleapis.com/css?family=Rubik:300,400,500,700');
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');

.picker-enter {
  opacity: 0.01;
  transform: scale(0.9) translateY(50%);
}
.picker-enter-active {
  opacity: 1;
  transform: scale(1) translateY(0%);
  transition: all 300ms ease-out;
}
.picker-exit {
  opacity: 1;
  transform: scale(1) translateY(0%);
}
.picker-exit-active {
  opacity: 0.01;
  transform: scale(0.9) translateY(50%);
  transition: all 300ms ease-out;
}
`)

/*
  @TODO:change selection on input typing
  @TODO:add prop to block picking past dates
  @TODO: add browser edges detection
  @TODO: add prop to pick date format?
  @TODO: callback (onSelect)
  @TODO: allow year to be changed from past
  @TODO: error handling
  @TODO: switch props for context

   theme={tripGateTheme}
   singleSelection={true}
 */
ReactDOM.render(
  <div><MiquidoDatePicker selectCallback={(val) => console.log('new value: ' + JSON.stringify(val))}>
    <input type='text' value={''} />
  </MiquidoDatePicker><MiquidoDatePicker theme={tripGateTheme}>
    <input type='text' value={''} />
  </MiquidoDatePicker><MiquidoDatePicker singleSelection={true}>
    <input type='text' value={''} />
  </MiquidoDatePicker></div>,
  document.getElementById('root') as HTMLElement
)

// export default from './DayPicker'
// export tripgate from './themes/tripgate/tripgate_theme'
