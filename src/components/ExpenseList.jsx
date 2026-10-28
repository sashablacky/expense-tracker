import ExpenseItem from './ExpenseItem'

/**
 * List of expenses, rendered in the order given (App keeps newest first).
 *
 * Props:
 * - expenses: array of { id, title, amount, category }.
 *
 * State: none.
 */
function ExpenseList({ expenses }) {
  if (expenses.length === 0) {
    return <p className="empty">No expenses yet</p>
  }

  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
    </ul>
  )
}

export default ExpenseList
