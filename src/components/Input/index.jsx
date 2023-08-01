import s from './index.module.css'

export const Input = ({ placeholder, value, onChange, disabled }) =>
<input
  className={ s.Input }
  placeholder={ placeholder }
  value={ value }
  onChange={ onChange }
  disabled={ disabled }
/>
