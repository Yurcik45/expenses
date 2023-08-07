import { useState } from 'react'
import { observer } from 'mobx-react'
import { Input } from '../Input'
import { Button } from '../Button'
import { edit_icon, save_icon, trash_icon } from '../../assets/common'
import s from './index.module.css'

export const Item = observer(({ item, index, onSave, onDelete }) =>
{
  const [editing_item, set_editing_item] = useState(null)

  const change = (id, event) =>
  {
    const { name, value } = event.target
    set_editing_item({ ...editing_item, [name]: name === "sum" ? +value : value })
  }

  const want_change = () =>
  {
    set_editing_item({ ...item })
  }

  const save = () =>
  {
    onSave(editing_item)
    set_editing_item(null)
  }
  
  return (
    <div className={ s.Item }>
      <div className={ s.id }>{ index + 1 }</div>
      <div className={ s.group }>
        <Input
          placeholder={ item.name }
          name="name"
          value={ editing_item === null ? item.name : editing_item.name }
          onChange={ event => change(item.id, event) }
          width={ 120 }
          disabled={ editing_item === null }
        />
        <Input
          placeholder={ item.sum }
          name="sum"
          value={ editing_item === null ? item.sum : editing_item.sum }
          onChange={ event => change(item.id, event) }
          width={ 50 }
          centered
          disabled={ editing_item === null }
        />
      </div>
      <div className={ s.group }>
        <div
          className={ s.edit_icon }
          onClick={ editing_item === null ? want_change : save }
        >
          { editing_item === null ? edit_icon : save_icon }
        </div>
        <div className={ s.trash_icon } onClick={ () => onDelete(item.id) } >{ trash_icon }</div>
      </div>
    </div>
  )
})
