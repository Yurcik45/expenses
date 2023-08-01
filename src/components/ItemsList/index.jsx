import { useState } from 'react'
import { observer, inject } from 'mobx-react'
import { v4 as uuid } from 'uuid'
import { Item } from '../Item'
import s from './index.module.css'

export const ItemsList = ({ list_name }) => inject('expensessStore')(observer(({ expensessStore }) =>
{
  console.group("--- ItemsList ---")
  console.log("list_name prop: ", list_name)
  console.groupEnd()

  const [editing_item, set_editing_item] = useState(null)

  const change = (id, event) =>
  {
    const { name, value } = event.target
    console.log("edit list item", { list_name, editing_id, id, name, value })
    // .. change item on mobx store
    expensessStore[ list_name === "expensess" ? "editExpensess" : "editBenefits" ](id, name, value)
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
    { local_items.map(item =>
      <Item
        key={ uuid() }
        item={ item }
        is_edit={ editng_item?.id === item.id }
        onWantChange={ set_editing_item }
        onChange={ change }
        onSave={ save }
        onDelete={ delete_el }
      />
    ) }
   </div>
  )
}))
