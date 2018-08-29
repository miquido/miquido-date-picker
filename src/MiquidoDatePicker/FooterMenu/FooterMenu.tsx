import { style } from 'typestyle'
import * as React from 'react'
import { IFooterMenu } from './FooterMenu.interface'

const FooterMenu = (props: IFooterMenu) => {
  const { clear, save } = props
  const menuClass = style({
    height: '40px',
    fontSize: '12px',
    fontWeight: 500,
    color: '#333333',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTop: '1px solid rgba(196, 197, 202, 0.2)',
    padding: '0 20px',
    fontFamily: 'Rubik'
  })

  const btnSecondary = style({
    fontSize: '12px',
    fontWeight: 300,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#c4c5ca',
    textDecoration: 'none'
  })

  const btnMain = style({
    fontSize: '12px',
    fontWeight: 500,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#333333',
    textDecoration: 'none'
  })

  return (
    <div className={menuClass}>
      <a href='#' className={btnSecondary} onClick={clear}>Clear dates</a>
      <a href='#' className={btnMain} onClick={save}>Apply</a>
    </div>
  )
}

export default FooterMenu
