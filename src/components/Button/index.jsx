import s from './index.module.css'

export const Button = ({ title, color, bg_color, border_bottom, icon, reverse, onClick, disabled }) =>
<button
  className={ s.Button }
  style={{
    color: color ?? "black",
    backgroundColor: bg_color ?? "white",
    flexDirection: reverse ? "row-reverse" : "row",
    justifyContent: icon ? "space-between" : "center",
    borderRadius: border_bottom ? 0 : 15,
    ...( border_bottom ? { borderBottom: "2px solid black" } : { border: "2px solid black" } )
  }}
  onClick={ onClick }
  disabled={ disabled }
>
  <div className={ s.title }>{ title }</div>
  { icon && <div className={ s.icon }>{ icon }</div> }
</button>
