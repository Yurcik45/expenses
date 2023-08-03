import { observer } from 'mobx-react'
import { Input } from '../Input'
import { Button } from '../Button'
import { edit_icon, trash_icon } from '../../assets/common'
import s from './index.module.css'

export const Item = observer(({ item, index, is_editing, onWantChange, onChange, onSave, onDelete }) =>
  <div className={ s.Item }>
    <div className={ s.id }>{ index + 1 }</div>
    <div className={ s.group }>
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
    </div>
    <div className={ s.group }>
      <div className={ s.edit_icon } onClick={ () => (is_editing ? onSave : onWantChange)(item) } >{ edit_icon }</div>
      <div className={ s.trash_icon } onClick={ () => onDelete(item.id) } >{ trash_icon }</div>
    </div>
  </div>
)
