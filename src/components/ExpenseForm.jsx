import { useState } from 'react'
import { CATEGORIES } from '../utils/categories'
import { validateExpense } from '../utils/validateExpense'

/**
 * Form for adding an expense.
 *
 * Props:
 * - onAdd(expense): called with { id, title, amount, category } for valid input only.
 *
 * State (local, form-only):
 * - title, amount: raw field values; cleared after a successful add, kept on error.
 * - category: selected category, defaults to the first one (Food).
 * - error: validation message shown under the form, or null.
 */
function ExpenseForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [error, setError] = useState(null)

  function handleSubmit(event) {
    event.preventDefault()

    const validationError = validateExpense({ title, amount })
    if (validationError) {
      setError(validationError)
      return
    }

    onAdd({
      id: crypto.randomUUID(),
      title: title.trim(),
      amount: Number(amount.trim()),
      category,
    })
    setTitle('')
    setAmount('')
    setError(null)
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit} noValidate>
      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          data-cy="title"
        />
      </label>

      <label>
        Amount
        <input
          type="text"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          data-cy="amount"
        />
      </label>

      <label>
        Category
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          data-cy="category"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <button type="submit" data-cy="add-expense">
        Add expense
      </button>

      {error && (
        <p className="error" role="alert" data-cy="error">
          {error}
        </p>
      )}
    </form>
  )
}

export default ExpenseForm
