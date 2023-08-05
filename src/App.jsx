import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { observer, inject } from 'mobx-react'
import { NavTabs } from './components/NavTabs'
import { Actions } from './components/Actions'
import { ItemsList } from './components/ItemsList'
import { CreateItem } from './components/CreateItem'
import { get_all } from './requests'
import s from './App.module.css'

export const App = inject('expensesStore')(observer(({ expensesStore }) =>
{
  const tabs_list = [
    { id: 0, name: "expenses", active: true },
    { id: 1, name: "benefits", active: false },
  ]

  const [tabs, set_tabs] = useState(tabs_list)
  const [show_add, set_show_add] = useState(false)
  const [loading, set_loading] = useState(true)

  const tab_click = id =>
  {
    if (tabs[id].active) return
    set_tabs(tabs.map(tab => ({ ...tab, active: tab.id === id })))
  }

  const add_item = type =>
  {
    const is_expense = type === "expenses"
    expensesStore[ is_expense ? "addExpense" : "addBenefit" ](uuid(), is_expense ? "new exp" : "new ben", 0)
  } 

  const [select_items, set_select_items] = useState([{ id: 0, name: "test1" }, { id: 1, name: "test2" }])
  const [selected_item, set_selected_item] = useState(null)

  const on_select_item = item =>
  {
    console.log("on select item: ", item)
  }

  const active_tab = () => tabs.find(t => t.active)

  useEffect(() =>
  {
    get_all(active_tab().name)
      .then(res =>
       {
         console.log("get all result", res)
         set_loading(false)
         expensesStore.initItems(active_tab().name, res)
       })
  }, [tabs])

  if (loading) return (
    <div className={ s.container }>
      <div className={ s.loading }> loading ... </div>
    </div>
  )

  return (
    <div className={ s.container }>
      <NavTabs tabs_list={ tabs } onClick={ tab_click } />
      { show_add
        ? <CreateItem onAdd={ onAdd } onCancel={ () => set_show_add(false) } />
        : <Actions type={ active_tab().name } onAdd={ () => set_show_add(true) } />
      }
      { expensesStore[active_tab().name].length > 0
        ? tabs.map(tab => tab.active && <ItemsList key={ uuid() } list_name={ tab.name } />)
        : <div className={ s.embpy }>List is empty</div>
      }
    </div>
  )
}))
