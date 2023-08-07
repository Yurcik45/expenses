import { makeObservable, observable, action } from 'mobx';
import { get_all, post_item, patch_item, delete_item, get_all_categories, post_category } from './requests'

class ExpensessStore {
  categories = [];
  expenses = [];
  benefits = [];

  constructor() {
    makeObservable(this, {
      categories: observable,
      expenses: observable,
      benefits: observable,
      addItem: action,
      editItem: action,
      deleteItem: action,
      initItems: action,
      initCategories: action,
    })
  }

  initItems = type =>
  {
    get_all(type).then(res => this[type] = res)
  }

  initCategories = () =>
  {
    get_all_categories().then(res => this.categories = res)
  }

  addItem = (type, data) =>
  {
    post_item(type, data).then(() => this.initItems(type))
    const category = data.category
    if (!category.includes('other') && [ ...this.categories.map(cat => cat.name) ].indexOf(category) === -1)
    {
      post_category({ name: data.category })
    }
  }

  editItem = (type, data) =>
  {
    patch_item(type, data).then(() => this.initItems(type))
  }

  deleteItem = (type, id) =>
  {
    delete_item(type, { id }).then(() => this.initItems(type))
  }

}

const expensesStore = new ExpensessStore()
export default expensesStore
