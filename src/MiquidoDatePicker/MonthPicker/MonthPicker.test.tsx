import * as React from 'react'
import { shallow } from 'enzyme'
import MonthPicker from './MonthPicker'
import { tripGateTheme } from '../../themes/tripgate/tripgate_theme'

describe('MonthPicker', () => {
  const mock = {
    months: [],
    theme: tripGateTheme
  }

  const wrapper = shallow(<MonthPicker {...mock} />)
  const component = wrapper.find('div')

  it('should render MonthPicker', () => {
    expect(component.exists()).toBe(true)
    expect(component.exists()).toBe(true)
  })
})
