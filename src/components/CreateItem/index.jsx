import { useState, useEffect } from 'react'
import { observer, inject } from 'mobx-react'
import { Input } from '../Input'
import { Select } from '../Select'
import { Button } from '../Button'
import s from './index.module.css'

export const CreateItem = inject('expensessStore')(observer(({ expensessStore, onAdd, onCancel }) =>
{
  const [categories, set_categories] = useState([])
  const [category, set_category] = useState(null)
  const [is_castom, set_is_castom] = useState(false)
  const [item_data, set_item_data] = useState({ name: "", sum: 0, description: "" })

  const change_item_data = event =>
  {
    const { name, value } = event.target
    set_item_data({ ...item_data, [name]: name === "sum" ? +value : value })
  }

  const select_category = item =>
  {
    set_category(item)
    set_is_castom(item === "other")
  }

  useEffect(() =>
  {
    const tem_categories = [ "sport", "eat" ]
    set_categories([ ...tem_categories, "other" ])
  }, [])

  return (
    <div className={ s.container }>
      <div className={ s.actions_container }>
        <Input
          placeholder="name"
          name="name"
          value={ item_data.name }
          onChange={ change_item_data }
          width={ 120 }
        />
        <Input
          placeholder="sum"
          name="sum"
          value={ item_data.sum }
          onChange={ change_item_data }
          width={ 120 }
        />
      </div>
      <Input
        placeholder="description"
        name="description"
        value={ item_data.description }
        onChange={ change_item_data }
        width={ 345 }
      />
      <Select
        items={ categories }
        selected_item={ category }
        onClick={ select_category }
      />
      { is_castom &&
        <Input
          placeholder="category"
          name="category"
          value={ category }
          onChange={ e => set_category(e.target.value) }
          width={ 120 }
        />
      }
      <div className={ s.actions_container }>
        <Button
          title="create"
          onClick={ onAdd }
        />
        <Button
          title="cancel"
          onClick={ onCancel }
        />
      </div>
    </div>
  )
}))
