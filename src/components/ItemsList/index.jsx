import { useState } from 'react'
import { observer, inject } from 'mobx-react'
import { v4 as uuid } from 'uuid'
import { Item } from '../Item'
import s from './index.module.css'

export const ItemsList = inject('expensesStore')(observer(({ expensesStore, list_name }) =>
{
  const save = item =>
  {
    console.log("save changed item: ", item)
    expensesStore.editItem(list_name, item)
  }

  const delete_el = id =>
  {
    console.log("delete item id: ", id)
    expensesStore.deleteItem(list_name, id)
  }

  const is_editing = id => editing_item?.id === id

  return (
   <div className={ s.list }>
    { expensesStore[list_name].map((item, index) =>
      <Item
        key={ uuid() }
        item={ item }
        index={ index }
        onSave={ save }
        onDelete={ delete_el }
      />
    ) }
   </div>
  )
}))
