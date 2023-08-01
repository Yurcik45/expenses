import { v4 as uuid } from 'uuid'
import s from './index.module.css'

export const NavTabs = ({ tabs_list, onClick }) =>
<div className={ s.TabsContainer }>
  { tabs_list.map(tab =>
    <div
      key={ uuid() }
      className={ s.TabItem + " " + `${ tab.active ? s.active : "" }` }
      style={{ width: `${100 / tabs_list.length}%` }}
      onClick={ () => onClick(tab.id) }
    >{ tab.name }</div> )
  }
</div>


