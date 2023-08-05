import { useState } from 'react'
import { observer, inject } from 'mobx-react'
import { v4 as uuid } from 'uuid'
import { Item } from '../Item'
import s from './index.module.css'

export const ItemsList = inject('expensesStore')(observer(({ expensesStore, list_name }) =>
{
  const [editing_item, set_editing_item] = useState(null)

  const change = (id, event) =>
  {
    const { name, value } = event.target
    set_editing_item({ ...editing_item, [name]: name === "sum" ? +value : value })
  }

  const want_change = item =>
  {
    set_editing_item({ ...item })
  }

  const save = item =>
  {
    // .. change item on mobx store
    expensesStore[ list_name === "expenses" ? "editExpense" : "editBenefit" ](editing_item)
    set_editing_item(null)
    // .. make request to update item globally
  }

  const delete_el = id =>
  {
    // .. delete item from mobx store
    expensesStore[ list_name === "expenses" ? "deleteExpense" : "deleteBenefit" ](id)
    // .. make request to delete item globally
  }

  const is_editing = id => editing_item?.id === id

  return (
   <div className={ s.list }>
    { expensesStore[list_name].map((item, index) =>
      <Item
        key={ uuid() }
        item={ is_editing(item.id) ? editing_item : item }
        index={ index }
        is_editing={ is_editing(item.id) }
        onWantChange={ want_change }
        onChange={ change }
        onSave={ save }
        onDelete={ delete_el }
      />
    ) }
   </div>
  )
}))
