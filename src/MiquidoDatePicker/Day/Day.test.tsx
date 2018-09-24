import * as React from 'react'
import { shallow } from 'enzyme'
import Day from './Day'
import { tripGateTheme } from '../../themes/tripgate/tripgate_theme'

describe('Day', () => {
  const mockPropsAllTrue = {
    key: 'string',
    displayValue: 'display value',
    itemIndex: 12,
    selected: true,
    today: true,
    start: true,
    end: true,
    disabled: true,
    theme: tripGateTheme
  }
  const mockPropsAllFalse = {
    key: 'string',
    displayValue: 'display value',
    itemIndex: 12,
    selected: false,
    today: false,
    start: false,
    end: false,
    disabled: false,
    theme: tripGateTheme
  }
  const wrapper = shallow(<Day {...mockPropsAllTrue} />)
  const wrapperFalse = shallow(<Day {...mockPropsAllFalse} />)
  const component = wrapper.find('div')
  const componentFalse = wrapperFalse.find('div')

  it('should render Day', () => {
    expect(component.exists()).toBe(true)
    expect(componentFalse.exists()).toBe(true)
  })

  it('should have base classname', () => {
    expect(component.hasClass(tripGateTheme.dayItem)).toBe(true)
  })

  it('should have classname for selected', () => {
    expect(component.hasClass(tripGateTheme.selected.day)).toBe(true)
    expect(componentFalse.hasClass(tripGateTheme.selected.day)).toBe(false)
  })

  it('should have classname for today', () => {
    expect(component.hasClass(tripGateTheme.status.today)).toBe(true)
    expect(componentFalse.hasClass(tripGateTheme.status.today)).toBe(false)
  })

  it('should have classname for selection end', () => {
    expect(component.hasClass(tripGateTheme.status.selectionEnd)).toBe(true)
    expect(componentFalse.hasClass(tripGateTheme.status.selectionEnd)).toBe(false)
  })

  it('should have classname for selection start', () => {
    expect(component.hasClass(tripGateTheme.status.selectionStart)).toBe(true)
    expect(componentFalse.hasClass(tripGateTheme.status.selectionStart)).toBe(false)
  })

  it('should have classname for disabled', () => {
    expect(component.hasClass(tripGateTheme.status.disabled)).toBe(true)
    expect(componentFalse.hasClass(tripGateTheme.status.disabled)).toBe(false)
  })

  it('should have content from props', () => {
    expect(component.text()).toEqual(mockPropsAllTrue.displayValue)
  })
})
