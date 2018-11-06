import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { cssRaw } from 'typestyle'

import MiquidoDatePicker from './MiquidoDatePicker/MiquidoDatePicker'
import { tripGateTheme } from './themes/tripgate/tripgate_theme'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowLeft, faArrowRight, faCaretDown } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowLeft)
library.add(faArrowRight)
library.add(faCaretDown)
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

class TestInjection extends React.Component {
  render () {
    return (
      <div>test injection</div>
    )
  }
}

ReactDOM.render(
  <>
    <MiquidoDatePicker selectCallback={(val) => console.log('new value: ' + JSON.stringify(val))} defaultValue={{ start: 18, end: 19, month: 5, year: 2017 }}>
      <input type='text' value={''}/>
    </MiquidoDatePicker>
    <div style={{ position: 'absolute', top: '70vh', right: 0 }}>
      <MiquidoDatePicker theme={tripGateTheme}
                         beforeHeader={ <TestInjection /> }
                         beforeDayNamesRow = { <TestInjection /> }
                         beforeBody={ <TestInjection /> }
                         beforeFooter={ <TestInjection /> }
                         beforeEnd={ <TestInjection /> }>
        <input type='text' value={''}/>
      </MiquidoDatePicker>
    </div>
    <div style={{ position: 'absolute', top: '5vh', right: 0 }}>
      <MiquidoDatePicker theme={tripGateTheme} />
    </div>
    <MiquidoDatePicker singleSelection={true}>
      <input type='text' value={''}/>
    </MiquidoDatePicker>
  </>,
  document.getElementById('root') as HTMLElement
)
