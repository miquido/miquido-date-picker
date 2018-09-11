import * as React from 'react'
import { shallow } from 'enzyme'
import * as classNames from './Day.classname'
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
    expect(component.hasClass(classNames.dayClass)).toBe(true)
  })

  it('should have classname for selected', () => {
    expect(component.hasClass(classNames.selectedDayClass)).toBe(true)
    expect(componentFalse.hasClass(classNames.selectedDayClass)).toBe(false)
  })

  it('should have classname for today', () => {
    expect(component.hasClass(classNames.todayClass)).toBe(true)
    expect(componentFalse.hasClass(classNames.todayClass)).toBe(false)
  })

  it('should have classname for selection end', () => {
    expect(component.hasClass(classNames.selectionEndClass)).toBe(true)
    expect(componentFalse.hasClass(classNames.selectionEndClass)).toBe(false)
  })

  it('should have classname for selection start', () => {
    expect(component.hasClass(classNames.selectionStartClass)).toBe(true)
    expect(componentFalse.hasClass(classNames.selectionStartClass)).toBe(false)
  })

  it('should have classname for disabled', () => {
    expect(component.hasClass(classNames.disabledClass)).toBe(true)
    expect(componentFalse.hasClass(classNames.disabledClass)).toBe(false)
  })

  it('should have content from props', () => {
    expect(component.text()).toEqual(mockPropsAllTrue.displayValue)
  })
})
