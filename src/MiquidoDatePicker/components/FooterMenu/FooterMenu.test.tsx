import * as React from 'react'
import { shallow } from 'enzyme'
import FooterMenu from './FooterMenu'

describe('FooterMenu', () => {
  const mock = {
    clear: jest.fn(x => undefined),
    save: jest.fn(x => undefined)
  }

  const wrapper = shallow(<FooterMenu {...mock} />)
  const component = wrapper.find('div')

  it('should render FooterMenu', () => {
    expect(component.exists()).toBe(true)
    expect(component.exists()).toBe(true)
  })
})
