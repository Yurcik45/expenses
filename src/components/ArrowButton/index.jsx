import { left_arrow, right_arrow } from '../../assets/arrows'
import s from './index.module.css'

export const ArrowButton = ({ title, reverse, onClick }) =>
<div
  className={ s.ArrowButton }
  styles={{ flexDirection: reverse ? "row-reverse" : "row" }}
>
  <div>{ title }</div>
  <div>{ reverse ? right_arrow : left_arrow }</div>
</div>
