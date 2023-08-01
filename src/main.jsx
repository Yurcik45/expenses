import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'mobx-react'
import expensessStore from './ExpensessStore'
import { App } from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider expensessStore={ expensessStore }>
    <App />
  </Provider>
)
