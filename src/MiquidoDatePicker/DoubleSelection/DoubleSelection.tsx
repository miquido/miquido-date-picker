import SingleSelection from '../SingleSelection/SingleSelection'
import * as React from 'react'
import { IDefaultValue, Props, State } from '../interfaces'
import { tripGateTheme } from '../../themes/tripgate/tripgate_theme'

interface DuoProps extends Props {
}

export interface DuoState extends State {
  startDateObj?: IDefaultValue | null
  startOpen: boolean
  endOpen: boolean
}

class DoubleSelection extends React.Component <DuoProps, DuoState> {
  constructor (props: any) {
    super(props)
    // @ts-ignore
    this.state = {
      startDateObj: null,
      startOpen: false,
      endOpen: false
    }

    this.handleSelect = this.handleSelect.bind(this)
    this.openStart = this.openStart.bind(this)
    this.openEnd = this.openEnd.bind(this)
    this.closeAll = this.closeAll.bind(this)
  }

  handleSelect (value: any) {
    this.setState({
      startDateObj: {
        start: new Date(value.year, value.month - 1, value.start),
        end: new Date(value.year, value.month - 1, value.start),
        display: new Date(value.year, value.month - 1, value.start)
      },
      startOpen: false,
      endOpen: true
    })
  }

  openStart () {
    this.setState({
      startOpen: true,
      endOpen: false
    })
  }

  openEnd () {
    this.setState({
      startOpen: false,
      endOpen: true
    })
  }

  closeAll () {
    this.setState({
      startOpen: false,
      endOpen: false
    })
  }

  render () {
    const { restrictions, ...propsForPickers } = this.props // remove children from props
    const endRestrictions = () => {
      if (restrictions && restrictions.end) {
        return this.state.startDateObj ? {
          min: this.state.startDateObj.start,
          max: restrictions.end.max
        } : { ...restrictions.end }
      } else if (this.state.startDateObj) {
        return {
          min: this.state.startDateObj.start
        }
      }
      return undefined
    }
    return (
      <div>
        <SingleSelection
          {...propsForPickers}
          onSelect={this.handleSelect}
          theme={tripGateTheme}
          type={'single'}
          placeholder={'DD/MM/YYYY'}
          showOnlyStart={true}
          {...(restrictions ? { restrictions: restrictions.start } : undefined)}
          {...(this.state.startDateObj ? { defaultValue: this.state.startDateObj } : undefined)}
          open={this.state.startOpen}
          close={this.state.endOpen}
          onClick={this.openStart}
        />
        <SingleSelection
          {...propsForPickers}
          theme={tripGateTheme}
          {...(this.state.startDateObj ? { defaultValue: this.state.startDateObj } : undefined)}
          disabled={!Boolean(this.state.startDateObj)}
          placeholder={'DD/MM/YYYY'}
          showOnlyEnd={true}
          restrictions={endRestrictions()}
          open={this.state.endOpen}
          close={this.state.startOpen}
          onClick={this.openEnd}
          onSelect={this.closeAll}
        />
      </div>
    )
  }
}

export default DoubleSelection
