import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { cssRaw } from 'typestyle'

import MiquidoDatePicker from './MiquidoDatePicker/MiquidoDatePicker'
// import { tripGateTheme } from './themes/tripgate/tripgate_theme'

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
  @TODO:add comments
  @TODO:change selection type by props ( single -> range )
  @TODO:change selection on input typing
  @TODO:add prop to block picking past dates
  @TODO: next month in december should change year
  @TODO: add losing when user click outside
  @TODO: add browser edges detection
  @TODO: add prop to pick date format?
  @TODO: callback (onSelect)
  @TODO: allow year to be changed from past
  @TODO: error handling
  @TODO: switch props for context

   theme={tripGateTheme}
 */
ReactDOM.render(
  <MiquidoDatePicker>
    <input type='text' value={''}/>
  </MiquidoDatePicker>,
  document.getElementById('root') as HTMLElement
)
