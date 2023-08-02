import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { observer, inject } from 'mobx-react'
import { NavTabs } from './components/NavTabs'
import { Actions } from './components/Actions'
import { ItemsList } from './components/ItemsList'
import s from './App.module.css'

export const App = inject('expensessStore')(observer(({ expensessStore }) =>
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

  const add_item = type =>
  {
    const is_expense = type === "expensess"
    expensessStore[ is_expense ? "addExpense" : "addBenefit" ](uuid(), is_expense ? "new exp" : "new ben", 0)
  } 

  return (
    <div className={ s.container }>
      <NavTabs tabs_list={ tabs } onClick={ tab_click } />
      <Actions type={ tabs.find(t => t.active).name } onAdd={ add_item } />
      { tabs.map(tab => tab.active && <ItemsList key={ uuid() } list_name={ tab.name } />) }
    </div>
  )
}))
