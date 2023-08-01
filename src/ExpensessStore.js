import { makeObservable, observable, action } from 'mobx';

class ExpensessStore {
  expensess = [];
  benefits = [];

  constructor() {
    makeObservable(this, {
      expensess: observable,
      benefits: observable,
      addExpense: action,
      addBenefit: action,
      editExpense: action,
      editBenefit: action,
      deleteExpense: action,
      deleteBenefit: action,
    })
  }

  addExpense = (name, sum) => {
    this.expensess.push({ name, sum });
  };

  addBenefit = (name, sum) => {
    this.benefits.push({ name, sum })
  }

  _editItem = (type, id, name, sum) => {
    this[type] = this[type].map(item => item.id === id ? ({ ...item, name, sum }) : item)
  }

  _deleteItem = (type, id) => {
    this[type] = this[type].filter(item => item.id !== id)
  }

  editExpense = (id, name, sum) => _editItem("expensess", id, name, sum)
  editBenefit = (id, name, sum) => _editItem("benefits", id, name, sum)

  deleteExpense = id => _deleteItem("expensess", id)
  deleteBenefit = id => _deleteItem("benefits", id)

}

const expensessStore = new ExpensessStore()
export default expensessStore
