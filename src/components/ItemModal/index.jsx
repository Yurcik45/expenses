import { useState } from 'react'
import { Input } from '../Input'
import { Button } from '../Button'
import { close_icon, edit_icon, save_icon, trash_icon } from '../../assets/common'
import g from '../../App.module.css'
import s from './index.module.css'

export const ItemModal = ({ item, onClose, onSave, onDelete }) =>
{
  const [editing_item, set_editing_item] = useState(null)

  const change = event  =>
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
    <div className={ g.modal }>
      <div className={ s.container }>
        <div className={ s.close } onClick={ onClose }>
          <div />
          <div className={ s.category }>category: { item.category }</div>
          { close_icon }
        </div>
        <Input
          placeholder={ item.name }
          name="name"
          value={ editing_item ? editing_item.name : null }
          onChange={ change }
          width={ "90%" }
          disabled={ editing_item === null }
        />
        <Input
          placeholder={ item.sum }
          name="sum"
          value={ editing_item ? editing_item.sum : null }
          onChange={ change }
          width={ 150 }
          centered
          disabled={ editing_item === null }
        />
        <textarea
          className={ s.area }
          placeholder={ item.description }
          name="description"
          value={ editing_item ? editing_item.description : null }
          onChange={ change }
          disabled={ editing_item === null }
        />
        <div className={ s.group }>
          <Button
            title={ editing_item ? "save" : "edit" }
            icon={ editing_item ? save_icon : edit_icon }
            onClick={ editing_item ? save : want_change }
          />
          <Button
            title={ "delete" }
            icon={ trash_icon }
            onClick={ () => onDelete(item.id) }
          />
        </div>
      </div>
    </div>
  )
}
