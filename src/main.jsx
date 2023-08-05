import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'mobx-react'
import expensesStore from './ExpensesStore'
import { App } from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider expensesStore={ expensesStore }>
    <App />
  </Provider>
)
