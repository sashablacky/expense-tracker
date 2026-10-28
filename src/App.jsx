import { useState } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState([])

  function handleAdd(expense) {
    // Newest first
    setExpenses((prev) => [expense, ...prev])
  }

  return (
    <main className="app">
      <h1>Expense Tracker</h1>
      <ExpenseForm onAdd={handleAdd} />
      <ExpenseList expenses={expenses} />
    </main>
  )
}

export default App
