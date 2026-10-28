import { formatAmount } from '../utils/formatAmount'

/**
 * One row of the expense list.
 *
 * Props:
 * - expense: { id, title, amount, category } to display.
 *
 * State: none.
 */
function ExpenseItem({ expense }) {
  return (
    <li className="expense-item" data-cy="expense-item">
      <span className="expense-title">{expense.title}</span>
      <span className="expense-category">{expense.category}</span>
      <span className="expense-amount">{formatAmount(expense.amount)}</span>
    </li>
  )
}

export default ExpenseItem
