import { Input } from '../Input'
import { more_icon } from '../../assets/common'
import s from './index.module.css'

export const Item = ({ item, index, onClick }) =>
<div className={ s.Item } onClick={ onClick }>
  <div className={ s.id }>{ index + 1 }</div>
  <div className={ s.group }>
    <Input
      placeholder={ item.name }
      name="name"
      width={ 120 }
      disabled
    />
    <Input
      placeholder={ item.sum }
      name="sum"
      width={ 120 }
      disabled
    />
    <div className={ s.category }>{ item.category }</div>
  </div>
  <div className={ s.more }>{ more_icon }</div>
</div>
