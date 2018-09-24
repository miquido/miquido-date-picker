import * as React from 'react'
import { shallow } from 'enzyme'
import { tripGateTheme } from '../../themes/tripgate/tripgate_theme'
import DayPicker from './DayPicker'

describe('DayPicker', () => {

  const mock = {
    days: [],
    eventsHandlers: {
      mouseUpHandler: jest.fn(x => undefined),
      mouseDownHandler: jest.fn(x => undefined),
      mouseOverHandler: jest.fn(x => undefined),
      clickHandler: jest.fn(x => undefined)
    },
    pastDaysAmount: 3,
    theme: tripGateTheme,
    selectedYear: 2018,
    selectedMonthIndex: 10
  }
  const wrapper = shallow(<DayPicker {...mock} />)
  const component = wrapper.find('div')


  it('should render DayPicker', () => {
    expect(component.exists()).toBe(true)
    expect(component.exists()).toBe(true)
  })

})
