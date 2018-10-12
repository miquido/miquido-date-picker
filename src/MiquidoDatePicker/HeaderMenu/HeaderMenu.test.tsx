import * as React from 'react'
import { shallow } from 'enzyme'
import HeaderMenu from './HeaderMenu'

describe('HeaderMenu', () => {
  const mock = {
    displayMonth: 'May',
    displayYear: 2018,
    switchToYearSelect: jest.fn(x => undefined),
    switchToMonthSelect: jest.fn(x => undefined),
    nextMonth: jest.fn(x => undefined),
    prevMonth: jest.fn(x => undefined)
  }

  const wrapper = shallow(<HeaderMenu {...mock} />)
  const component = wrapper.find('div')

  it('should render HeaderMenu', () => {
    expect(component.exists()).toBe(true)
    expect(component.exists()).toBe(true)
  })
})
