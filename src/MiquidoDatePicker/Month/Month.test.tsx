import * as React from 'react'
import { shallow } from 'enzyme'
import Month from './Month'
import { tripGateTheme } from '../../themes/tripgate/tripgate_theme'

describe('Month', () => {
  const mock = {
    displayValue: 'may',
    itemIndex: 4,
    theme: tripGateTheme
  }

  const wrapper = shallow(<Month {...mock} />)
  const component = wrapper.find('div')

  it('should render Month', () => {
    expect(component.exists()).toBe(true)
    expect(component.exists()).toBe(true)
  })
})
