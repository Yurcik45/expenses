import { useState } from 'react'
import { observer, inject } from 'mobx-react'
import { v4 as uuid } from 'uuid'
import { Item } from '../Item'
import { ItemModal } from '../ItemModal'
import s from './index.module.css'

export const ItemsList = inject('expensesStore')(observer(({ expensesStore, list_name }) =>
{
  const [modal_item, set_modal_item] = useState(null)

  const reset_modal = () => set_modal_item(null)

  const save = item =>
  {
    expensesStore.editItem(list_name, item)
    reset_modal()
  }

  const delete_el = id =>
  {
    expensesStore.deleteItem(list_name, id)
    reset_modal()
  }

  return (
   <div className={ s.list }>
    { expensesStore[list_name].map((item, index) =>
      <Item
        key={ uuid() }
        item={ item }
        index={ index }
        onClick={ () => set_modal_item({ ...item }) }
      />
    ) }
    { modal_item &&
        <ItemModal
          item={ modal_item }
          onClose={ reset_modal }
          onSave={ save }
          onDelete={ delete_el }
        />
    }
   </div>
  )
}))
