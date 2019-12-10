import * as React from 'react'
import { shallow } from 'enzyme'
import DaysHeader from './DaysHeader'

describe('DaysHeader', () => {

  const wrapper = shallow(<DaysHeader/>)
  const component = wrapper.find('div')

  it('should render DaysHeader', () => {
    expect(component.exists()).toBe(true)
    expect(component.exists()).toBe(true)
  })
})
