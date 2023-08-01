import s from './index.module.css'

export const Button = ({ title, color, bg_color, icon, reverse, onClick, disabled }) =>
<button
  className={ s.Button }
  styles={{
    color: color ?? "black",
    backgroundColor: bg_color ?? "white",
    flexDirection: reverse ? "row-reverse" : "row"
  }}
  onClick={ onClick }
  disabled={ disabled }
>
  <div>{ title }</div>
  { icon && <div>{ icon }</div> }
</button>
