import { useState, useEffect } from 'react'
import { observer, inject } from 'mobx-react'
import { Input } from '../Input'
import { Select } from '../Select'
import { Button } from '../Button'
import s from './index.module.css'

export const CreateItem = inject('expensessStore')(observer(({ expensessStore }) =>
{
  const [categories, set_categories] = useState([])
  const [category, set_category] = useState(null)
  const [is_castom, set_is_castom] = useState(false)
  const [item_data, set_item_data] = useState({ name: "", sum: 0 })

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

  const create_item = () =>
  {
    console.log("category: ", category)
    console.log("item data: ", item_data)
    set_category(null)
    set_item_data({ name: "", sum: 0 })
  }

  useEffect(() =>
  {
    const tem_categories = [ "sport", "eat" ]
    set_categories([ ...tem_categories, "other" ])
  }, [])

  return (
    <div className={ s.container }>
      <div className={ s.inp_container }>
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
      <Button
        title="create"
        onClick={ create_item }
      />
    </div>
  )
}))
