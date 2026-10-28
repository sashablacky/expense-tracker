import { useState } from 'react'
import ExpenseForm from './components/ExpenseForm'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState([])

  function handleAdd(expense) {
    setExpenses((prev) => [...prev, expense])
  }

  return (
    <main className="app">
      <h1>Expense Tracker</h1>
      <ExpenseForm onAdd={handleAdd} />
    </main>
  )
}

export default App
