import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { observer, inject } from 'mobx-react'
import { NavTabs } from './components/NavTabs'
import { Actions } from './components/Actions'
import { ItemsList } from './components/ItemsList'
import { CreateItem } from './components/CreateItem'
import { serv } from './requests'
import s from './App.module.css'

export const App = inject('expensesStore')(observer(({ expensesStore }) =>
{
  const tabs_list = [
    { id: 0, name: "expenses", active: true },
    { id: 1, name: "benefits", active: false },
  ]

  const [tabs, set_tabs] = useState(tabs_list)
  const [show_add, set_show_add] = useState(false)
  const [is_online, set_is_online] = useState(false)

  const active_tab = () => tabs.find(t => t.active)

  const tab_click = id =>
  {
    if (tabs[id].active) return
    set_tabs(tabs.map(tab => ({ ...tab, active: tab.id === id })))
  }

  const add_item = data =>
  {
    expensesStore.addItem(active_tab().name, data)
    set_show_add(false)
  } 

  useEffect(() =>
  {
    try { fetch(serv).then(() => set_is_online(true)) }
    catch (err) { console.log("test back connection error: ", err) }
  }, [])

  useEffect(() =>
  {
    is_online && expensesStore.initItems(active_tab().name)
  }, [is_online, tabs])

  useEffect(() =>
  {
    is_online && expensesStore.initCategories()
  }, [is_online, show_add])

  console.group(" --- App --- ")
  console.log("active tab(): ", active_tab())
  console.log("expensesStore[active_tab().name]: ", expensesStore[active_tab().name])
  console.log(expensesStore.expenses)
  console.groupEnd()

  //if (loading) return (
  //  <div className={ s.container }>
  //    <div className={ s.loading }> loading ... </div>
  //  </div>
  //)

  return (
    <div className={ s.container }>
      <NavTabs tabs_list={ tabs } onClick={ tab_click } />
      { show_add
        ? <CreateItem onAdd={ add_item } onCancel={ () => set_show_add(false) } />
        : <Actions type={ active_tab().name } onAdd={ () => set_show_add(true) } />
      }
      { expensesStore[active_tab().name].length > 0
        ? tabs.map(tab => tab.active && <ItemsList key={ uuid() } list_name={ tab.name } />)
        : <div className={ s.embpy }>List is empty</div>
      }
    </div>
  )
}))
