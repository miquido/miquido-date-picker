import * as React from 'react'
import { IFooterMenu } from './FooterMenu.interface'
import { footerWrapper, saveBtn, clearBtn } from './FooterMenu.classname'
import { getClassFor } from '../functions'

const FooterMenu = (props: IFooterMenu) => {
  const { clear, save, theme } = props

  return (
    <div className={getClassFor({ key: 'footerWrapper', theme: theme, defaultClass: footerWrapper })}>
      {!(props.noButtons) &&
      <a href='#' className={getClassFor({ key: 'clearBtn', theme: theme, defaultClass: clearBtn })} onClick={clear}>Clear
        dates</a>}
      {!(props.noButtons) &&
      < a href='#' className={getClassFor({ key: 'saveBtn', theme: theme, defaultClass: saveBtn })}
          onClick={save}>Apply</a>}
    </div>
  )
}

export default FooterMenu
