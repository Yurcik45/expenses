import { makeObservable, observable, action } from 'mobx';

class ExpensessStore {
  expensess = [
    { id: 0, name: "exp1", sum: 250 },
    { id: 1, name: "exp2", sum: 350 },
    { id: 2, name: "exp3", sum: 450 },
  ];
  benefits = [
    { id: 3, name: "ben1", sum: 550 },
    { id: 4, name: "ben2", sum: 650 },
    { id: 5, name: "ben3", sum: 750 },
  ];

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

  editExpense = (id, name, sum) => this._editItem("expensess", id, name, sum)
  editBenefit = (id, name, sum) => this._editItem("benefits", id, name, sum)

  deleteExpense = id => this._deleteItem("expensess", id)
  deleteBenefit = id => this._deleteItem("benefits", id)

}

const expensessStore = new ExpensessStore()
export default expensessStore
