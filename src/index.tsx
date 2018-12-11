import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { cssRaw } from 'typestyle'

import MiquidoDatePicker from './MiquidoDatePicker/MiquidoDatePicker'
import { tripGateTheme } from './themes/tripgate/tripgate_theme'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowLeft, faArrowRight, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import {
  IDefaultValue
} from './MiquidoDatePicker/interfaces'
// import { ITheme } from './themes/theme.interface'
// import { pickingOptions, selectMethods } from './MiquidoDatePicker/enums'

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

// class TestInjection extends React.Component {
//   render () {
//     return (
//       <div>test injection</div>
//     )
//   }
// }

console.log(tripGateTheme)

interface DuoProps {
}

export interface DuoState {
  startDateObj?: IDefaultValue | null
}

class DuoDate extends React.Component <DuoProps, DuoState> {
  constructor (props: any) {
    super(props)
    this.state = {
      startDateObj: null
    }

    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect (value: any) {
    this.setState({
      startDateObj: {
        start: new Date(value.year, value.month - 1, value.start),
        display: new Date(value.year, value.month - 1, value.start)
      }
    })
  }

  render () {
    return (
      <div>
        <MiquidoDatePicker onSelect={this.handleSelect}
                           theme={tripGateTheme}
                           singleSelection={true}
                           placeholder={'DD/MM/YYYY'}
                           showOnlyStart={true}
                           {...(this.state.startDateObj ? { defaultValue: this.state.startDateObj } : undefined)}
        />
        <MiquidoDatePicker
          theme={tripGateTheme}
          {...(this.state.startDateObj ? { defaultValue: this.state.startDateObj } : undefined)}
          disabled={!Boolean(this.state.startDateObj)}
          placeholder={'DD/MM/YYYY'}
          showOnlyEnd={true}
          {...(this.state.startDateObj ? { restrictions: { min: this.state.startDateObj.start } } : undefined)}
          open={Boolean(this.state.startDateObj)}
        />
      </div>
    )
  }
}

export default ReactDOM.render(
  <>
    <MiquidoDatePicker
      // restrictions={{
      //   min: new Date(2018, 9, 6),
      //   max: new Date(2018, 11, 24)
      // }}
      defaultValue={{
        start: new Date(2018, 11, 5),
        end: new Date(2018, 11, 5),
        display: new Date(2018, 11)
      }}
      singleSelection={true}
      inputClass={'testingclass123'}
    />
    <DuoDate/>
    {/*<MiquidoDatePicker*/}
    {/*defaultValue={{*/}
    {/*start: new Date(2018, 11, 5),*/}
    {/*display: new Date(2018, 11)*/}
    {/*}}*/}
    {/*/>*/}
    {/*<MiquidoDatePicker*/}
    {/*restrictions={{*/}
    {/*min: new Date(2018, 10, 8),*/}
    {/*max: new Date(2018, 10, 22)*/}
    {/*}}*/}
    {/*inputClass={'testingclass123'}*/}
    {/*/>*/}
    {/*<MiquidoDatePicker selectCallback={(val) => console.log('new value: ' + JSON.stringify(val))}>*/}
    {/*<input type='text' value={''}/>*/}
    {/*</MiquidoDatePicker>*/}
    {/*<div style={{ position: 'absolute', top: '70vh', right: 0 }}>*/}
    {/*<MiquidoDatePicker theme={tripGateTheme}*/}
    {/*beforeHeader={<TestInjection/>}*/}
    {/*beforeDayNamesRow={<TestInjection/>}*/}
    {/*beforeBody={<TestInjection/>}*/}
    {/*beforeFooter={<TestInjection/>}*/}
    {/*beforeEnd={<TestInjection/>}>*/}
    {/*<input type='text' value={''}/>*/}
    {/*</MiquidoDatePicker>*/}
    {/*</div>*/}
    {/*<div style={{ position: 'absolute', top: '5vh', right: 0 }}>*/}
    {/*<MiquidoDatePicker theme={tripGateTheme}/>*/}
    {/*</div>*/}
    {/*<MiquidoDatePicker singleSelection={true}>*/}
    {/*<input type='text' value={''}/>*/}
    {/*</MiquidoDatePicker>*/}
  </>,
  document.getElementById('root') as HTMLElement
)
