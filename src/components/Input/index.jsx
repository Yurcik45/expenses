import s from './index.module.css'

export const Input = ({ placeholder, name, value, onChange, centered, width, disabled }) =>
<input
  className={ s.Input }
  style={{
    width: width ?? "100%",
    textAlign: centered ? "center" : "initial"
  }}
  placeholder={ placeholder }
  name={ name }
  value={ value }
  onChange={ onChange }
  disabled={ disabled }
/>
