import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { cssRaw } from 'typestyle'

import MiquidoDatePicker from './MiquidoDatePicker/MiquidoDatePicker'

// cssRaw(`
// @import url('https://fonts.googleapis.com/css?family=Rubik:300,400,500,700');
// `)
cssRaw(`
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');
`)

ReactDOM.render(
  <MiquidoDatePicker><input type='text' value={''}/></MiquidoDatePicker>,
  document.getElementById('root') as HTMLElement
)
