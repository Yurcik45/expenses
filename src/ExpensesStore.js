import { makeObservable, observable, action } from 'mobx';

class ExpensessStore {
  expenses = [];
  benefits = [];

  constructor() {
    makeObservable(this, {
      expenses: observable,
      benefits: observable,
      addExpense: action,
      addBenefit: action,
      editExpense: action,
      editBenefit: action,
      deleteExpense: action,
      deleteBenefit: action,
    })
  }


  addExpense = (id, name, sum) => {
    this.expenses.push({ id, name, sum });
  };

  addBenefit = (id, name, sum) => {
    this.benefits.push({ id, name, sum })
  }

  _editItem = (type, id, name, sum) => {
    this[type] = this[type].map(item => item.id === id ? ({ ...item, name, sum }) : item)
  }

  _deleteItem = (type, id) => {
    this[type] = this[type].filter(item => item.id !== id)
  }

  editExpense = ({ id, name, sum }) => this._editItem("expenses", id, name, sum)
  editBenefit = ({ id, name, sum }) => this._editItem("benefits", id, name, sum)

  deleteExpense = id => this._deleteItem("expenses", id)
  deleteBenefit = id => this._deleteItem("benefits", id)

  initItems = (type, data) => this[type] = data

}

const expensesStore = new ExpensessStore()
export default expensesStore
