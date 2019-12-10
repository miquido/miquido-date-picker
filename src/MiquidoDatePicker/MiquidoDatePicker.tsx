// TODO split singe and multi picker
// TODO refactor year list to be single current date
// TODO daysArray to render? -> poczatek koniec zaznaczenia , aktualny miesiac i rok
// TODO is today -> wyrzucic today z daysArray

// TODO split things that need to be only on init and on update
// TODO disabled from props ?
// TODO cache variables
// TODO make functions for condition checks

// TODO single source of truth for state ( remove selected )
// TODO month change animation
// TODO theme refactor?
// TODO daysArray indexy i display value sa potrzebne

// TODO - displayMonth
// TODO dont modify childrens?

import * as React from 'react'
import { Props, State } from './interfaces'
import SingleSelection from './SingleSelection/SingleSelection'
import DoubleSelection from './DoubleSelection/DoubleSelection'

class MiquidoDatePicker extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
  }

  Picker = (props: any) => {
    const type = props.type
    switch (type) {
      case 'single':
        return <SingleSelection {...this.props} />
      case 'double':
        return <DoubleSelection {...this.props} />
      // case 'multi': return <MultiSelection {...this.props} />
      default:
        return <SingleSelection {...this.props} />
    }
  }

  render () {
    return (
      <this.Picker type={this.props.type || 'single'}/>
    )
  }

}

export default MiquidoDatePicker
