import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { cssRaw } from 'typestyle'

import MiquidoDatePicker from './MiquidoDatePicker/MiquidoDatePicker'
// import { tripGateTheme } from './themes/tripgate/tripgate_theme'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowLeft, faArrowRight, faCaretDown } from '@fortawesome/free-solid-svg-icons'
// import {
//   IDefaultValue
// } from './MiquidoDatePicker/interfaces'
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
//   constructor (props: any) {
//     super(props)
//     this.state = {
//       date: new Date(2018, 11),
//       start: new Date(2018, 11, 3),
//       end: new Date(2018, 11, 3),
//       inputClass: 'testingclass123'
//     }
//     setTimeout(() => this.setState({
//       date: new Date('01/01/2020'),
//       start: new Date('01/01/2020'),
//       end: new Date('01/01/2020'),
//       inputClass: 'updatedClass456'
//     }), 1000)
//   }
//
//   render () {
//     return (
//       <div><MiquidoDatePicker
//         defaultValue={{
//           // @ts-ignore
//           display: this.state.date,
//           // @ts-ignore
//           start: this.state.start,
//           // @ts-ignore
//           end: this.state.end
//         }}
//         type='single'
//         // @ts-ignore
//         inputClass={this.state.inputClass}
//         onSelect={console.log}
//         position='bottom'
//         positionHorizontal='left'
//         onOpen={(x) => console.log('open2', x)}
//       /></div>
//     )
//   }
// }

export default ReactDOM.render(
  <>
    <MiquidoDatePicker onSelect={console.log} onError={console.error} restrictions={{
      min: new Date('2019-12-01')
    }}
    />
    {/*<MiquidoDatePicker*/}
    {/*  restrictions={{*/}
    {/*    start: {*/}
    {/*      min: new Date(2018, 11, 4),*/}
    {/*      max: new Date(2020, 11, 24)*/}
    {/*    },*/}
    {/*    end: {*/}
    {/*      min: new Date(2018, 11, 3),*/}
    {/*      max: new Date(2025, 11, 15)*/}
    {/*    }*/}
    {/*  }}*/}
    {/*  defaultValue={{*/}
    {/*    start: new Date(2018, 11, 5),*/}
    {/*    end: new Date(2018, 11, 6),*/}
    {/*    display: new Date(2018, 11)*/}
    {/*  }}*/}
    {/*  type='double'*/}
    {/*  inputClass={'testingclass123'}*/}
    {/*  onSelect={console.log}*/}
    {/*/>*/}
    {/*<TestInjection/>*/}

    {/*<MiquidoDatePicker*/}
    {/*defaultValue={{*/}
    {/*start: new Date(2018, 11, 5),*/}
    {/*end: new Date(2018, 11, 5),*/}
    {/*display: new Date(2018, 11)*/}
    {/*}}*/}
    {/*singleSelection={true}*/}
    {/*inputClass={'testingclass123'}*/}
    {/*/>*/}
    {/*<MiquidoDatePicker
      defaultValue={{
        start: new Date(2018, 11, 5),
        end: new Date(2018, 11, 5),
        display: new Date(2018, 11)
      }}
      type='single'
      inputClass={'testingclass123'}
    />
    <MiquidoDatePicker
      restrictions={{
        min: new Date(2018, 11, 4),
        max: new Date(2018, 11, 24)
      }}
      defaultValue={{
        start: new Date(2018, 11, 5),
        end: new Date(2018, 11, 5),
        display: new Date(2018, 11)
      }}
      type='double'
      inputClass={'testingclass123'}
    />*/}
    {/*<MiquidoDatePicker />*/}
    {/*<DuoDate/>*/}
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
    {/*    <MiquidoDatePicker selectCallback={(val) => console.log('new value: ' + JSON.stringify(val))}>
    <input type='text' value={''}/>
    </MiquidoDatePicker>*/}
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
    {/*<MiquidoDatePicker position='bottom'*/}
    {/*                   positionHorizontal='left'/>*/}
    {/*</div>*/}
    {/*<MiquidoDatePicker singleSelection={true}>*/}
    {/*<p>asd</p>*/}
    {/*</MiquidoDatePicker>*/}
  </>,
  document.getElementById('root') as HTMLElement
)
