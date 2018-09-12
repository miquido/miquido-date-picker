import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { cssRaw } from 'typestyle'

import MiquidoDatePicker from './MiquidoDatePicker/MiquidoDatePicker'
import { tripGateTheme } from './themes/tripgate/tripgate_theme'

cssRaw(`
@import url('https://fonts.googleapis.com/css?family=Rubik:300,400,500,700');
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');
`)

/*
  @TODO:add comments
  @TODO:change selection type by props ( single -> range )
  @TODO:add animations
  @TODO:change selection on input typing
  @TODO:add prop to block picking past dates
  @TODO: next month in december should change year
  @TODO: add losing when usec click outside
  @TODO: add browser edges detection
  @TODO: add prop to pick date format?
 */
ReactDOM.render(
  <MiquidoDatePicker theme={tripGateTheme}>
    <input type='text' value={''}/>
  </MiquidoDatePicker>,
  document.getElementById('root') as HTMLElement
)
