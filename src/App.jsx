import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { observer, inject } from 'mobx-react'
import { NavTabs } from './components/NavTabs'
import { Actions } from './components/Actions'
import { ItemsList } from './components/ItemsList'
import { CreateItem } from './components/CreateItem'
import s from './App.module.css'

export const App = inject('expensessStore')(observer(({ expensessStore }) =>
{
  const tabs_list = [
    { id: 0, name: "expensess", active: true },
    { id: 1, name: "benefits", active: false },
  ]

  const [tabs, set_tabs] = useState(tabs_list)
  const [show_add, set_show_add] = useState(false)

  const tab_click = id =>
  {
    if (tabs[id].active) return
    set_tabs(tabs.map(tab => ({ ...tab, active: tab.id === id })))
  }

  const add_item = type =>
  {
    //const is_expense = type === "expensess"
    //expensessStore[ is_expense ? "addExpense" : "addBenefit" ](uuid(), is_expense ? "new exp" : "new ben", 0)
  } 

  const [select_items, set_select_items] = useState([{ id: 0, name: "test1" }, { id: 1, name: "test2" }])
  const [selected_item, set_selected_item] = useState(null)

  const on_select_item = item =>
  {
    console.log("on select item: ", item)
  }

  return (
    <div className={ s.container }>
      <NavTabs tabs_list={ tabs } onClick={ tab_click } />
      { show_add
        ? <CreateItem onCancel={ () => set_show_add(false) } />
        : <Actions type={ tabs.find(t => t.active).name } onAdd={ () => set_show_add(true) } />
      }
      { tabs.map(tab => tab.active && <ItemsList key={ uuid() } list_name={ tab.name } />) }
    </div>
  )
}))
