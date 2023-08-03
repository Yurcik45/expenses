import { useState, useRef } from 'react'
import { v4 as uuid } from 'uuid'
import ClickAwayListener from 'react-click-away-listener'
import { select_arrow_icon } from '../../assets/common'
import s from './index.module.css'

export const Select = ({ label, items, selected_item, onClick }) =>
{
  const [active, set_active] = useState(false)
  const selectRef = useRef(null);

  const current = selectRef?.current !== null ? selectRef.current : {};

  const close = () => set_active(false);

  const select = item  =>
  {
    setValue(item)
    close()
  }

  console.log("active: ", active)

  return (
    <ClickAwayListener onClickAway={ close }>
      <div
        className={ `${ s.container } ${ active ? s.container_active : "" }}` }
        ref={ selectRef }
        onClick={ () => set_active(!active) }
      >
        { label && <div className={ s.label }>{ label }</div> }
        <div className={ s.main_item }>{ selected_item ?? "categories" }</div>
        <div className={ active ? s.icon_reverse : s.icon }>{ select_arrow_icon }</div>
        { active && <div
          className={ s.select_container }
          style={{
            top: current["offsetTop"] + current["offsetHeight"] - 2,
            left: current["offsetLeft"],
            width: current["offsetWidth"] - 2,
          }}
        >
          { items.map(item => <div key={ uuid() } className={ s.item } onClick={ () => onClick(item) } >
              { item }
            </div>)
          }
        </div>}
      </div>
    </ClickAwayListener>
  )
}
