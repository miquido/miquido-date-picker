import * as React from 'react'
import { shallow } from 'enzyme'
import YearPicker from './YearPicker'
import { tripGateTheme } from '../../../themes/tripgate/tripgate_theme'

describe('YearPicker', () => {
  const mock = {
    years: [],
    theme: tripGateTheme
  }

  const wrapper = shallow(<YearPicker {...mock} />)
  const component = wrapper.find('div')

  it('should render YearPicker', () => {
    expect(component.exists()).toBe(true)
  })
})
