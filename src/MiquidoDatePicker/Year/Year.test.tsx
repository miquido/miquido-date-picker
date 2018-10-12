import * as React from 'react'
import { shallow } from 'enzyme'
import Year from './Year'
import { tripGateTheme } from '../../themes/tripgate/tripgate_theme'

describe('Year', () => {
  const mock = {
    months: [],
    theme: tripGateTheme,
    displayValue: 24,
    eventsHandlers: {
      mouseUpHandler: jest.fn(x => undefined),
      mouseDownHandler: jest.fn(x => undefined),
      mouseOverHandler: jest.fn(x => undefined),
      clickHandler: jest.fn(x => undefined)
    },
    itemIndex: 23
  }

  const wrapper = shallow(<Year {...mock} />)
  const component = wrapper.find('div')

  it('should render Year', () => {
    expect(component.exists()).toBe(true)
  })
})
