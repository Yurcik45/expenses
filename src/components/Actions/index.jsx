import { add_expensess_icon, add_benefit_icon } from '../../assets/common'
import { Button } from '../Button'
import s from './index.module.css'

export const Actions = ({ type, onAdd }) =>
<div className={ s.container }>
  <Button
    title={ "add" + " " + type }
    onClick={ () => onAdd(type) }
    icon={ type === "expensess" ? add_expensess_icon : add_benefit_icon }
    border_bottom
  />
 </div>
