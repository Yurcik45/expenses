import { observer } from 'mobx-react'
import { Input } from '../Input'
import { Button } from '../Button'
import { trash_icon } from '../../assets/common'
import s from './index.module.css'

export const Item = observer(({ item, is_editing, onWantChange, onChange, onSave, onDelete }) =>
  <div className={ s.Item }>
    <div className={ s.id }>{ item.id }</div>
    <Input
      placeholder={ item.name }
      name="name"
      value={ is_editing  ? item.name : null }
      onChange={ event => onChange(item.id, event) }
      width={ 120 }
      disabled={ !is_editing }
    />
    <Input
      placeholder={ item.sum }
      name="sum"
      value={ is_editing  ? item.sum : null }
      onChange={ event => onChange(item.id, event) }
      width={ 50 }
      centered
      disabled={ !is_editing }
    />
    <Button
      title={ is_editing ? "save" : "edit" }
      onClick={ () => (is_editing ? onSave : onWantChange)(item) }
    />
    <div className={ s.trash } onClick={ onDelete } >{ trash_icon }</div>
  </div>
)
