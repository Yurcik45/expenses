import { useState } from 'react'
import { observer, inject } from 'mobx-react'
import { v4 as uuid } from 'uuid'
import { Item } from '../Item'
import s from './index.module.css'

export const ItemsList = inject('expensessStore')(observer(({ expensessStore, list_name }) =>
{
  const [editing_item, set_editing_item] = useState(null)

  console.group("--- ItemsList ---")
  console.log("list_name prop: ", list_name)
  console.log("items from storage: ", expensessStore[list_name])
  console.log("editing item: ", editing_item)
  console.groupEnd()

  const change = (id, event) =>
  {
    const { name, value } = event.target
    console.log("edit list item", { id, name, value })
    // .. change item on mobx store
    expensessStore[ list_name === "expensess" ? "editExpense" : "editBenefit" ](id, name, value)
  }

  const want_change = item =>
  {
    console.log("on want change item: ", { ...item })
    set_editing_item({ ...item })
  }

  const save = item =>
  {
    set_editing_item(null)
    // .. make request to update item globally
  }

  const delete_el = id =>
  {
    // .. delete item from mobx store
    expensessStore[ list_name === "expensess" ? "deleteExpense" : "deleteBenefit" ](id)
    // .. make request to delete item globally
  }

  return (
   <div className={ s.list }>
    { expensessStore[list_name].map(item =>
      <Item
        key={ uuid() }
        item={ item }
        is_editing={ editing_item?.id === item.id }
        onWantChange={ want_change }
        onChange={ change }
        onSave={ save }
        onDelete={ delete_el }
      />
    ) }
   </div>
  )
}))
