import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { cssRaw } from 'typestyle';
import MiquidoDatePicker from './MiquidoDatePicker/MiquidoDatePicker';
// import { tripGateTheme } from './themes/tripgate/tripgate_theme'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faArrowRight, faCaretDown } from '@fortawesome/free-solid-svg-icons';
// import {
//   IDefaultValue
// } from './MiquidoDatePicker/interfaces'
// import { ITheme } from './themes/theme.interface'
// import { pickingOptions, selectMethods } from './MiquidoDatePicker/enums'
library.add(faArrowLeft);
library.add(faArrowRight);
library.add(faCaretDown);
cssRaw("\n@import url('https://fonts.googleapis.com/css?family=Rubik:300,400,500,700');\n@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');\n\n.picker-enter {\n  opacity: 0.01;\n  transform: scale(0.9) translateY(50%);\n}\n.picker-enter-active {\n  opacity: 1;\n  transform: scale(1) translateY(0%);\n  transition: all 300ms ease-out;\n}\n.picker-exit {\n  opacity: 1;\n  transform: scale(1) translateY(0%);\n}\n.picker-exit-active {\n  opacity: 0.01;\n  transform: scale(0.9) translateY(50%);\n  transition: all 300ms ease-out;\n}\n");
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
export default ReactDOM.render(React.createElement(React.Fragment, null,
    React.createElement(MiquidoDatePicker, { onSelect: console.log, onError: console.error, restrictions: {
            min: new Date('2019-12-01')
        } })), document.getElementById('root'));
//# sourceMappingURL=test_index.js.map