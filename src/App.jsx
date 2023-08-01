import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { NavTabs } from './components/NavTabs'
import { ItemsList } from './components/ItemsList'
import s from './App.module.css'

export const App = () =>
{
  const tabs_list = [
    { id: 0, name: "expensess", active: true },
    { id: 1, name: "benefits", active: false },
  ]

  const [tabs, set_tabs] = useState(tabs_list)

  const tab_click = id =>
  {
    if (tabs[id].active) return
    set_tabs(tabs.map(tab => ({ ...tab, active: tab.id === id })))
  }

  return (
    <div className={ s.container }>
      <NavTabs tabs_list={ tabs } onClick={ tab_click } />
      { tabs_list.map(tab => tab.active && <ItemsList key={ uuid() } list_name={ tab.name } />) }
    </div>
  )
}
