/**
 * Validates raw form input for a new expense.
 * @param {{ title: string, amount: string }} input values as typed in the form
 * @returns {string | null} error message, or null when the input is valid
 */
export function validateExpense({ title, amount }) {
  if (title.trim() === '') {
    return 'Title is required'
  }

  // Number('') and Number('  ') are 0, so empty input is checked separately
  // to report it as "not a number" rather than "not greater than 0".
  const trimmedAmount = amount.trim()
  const value = Number(trimmedAmount)
  if (trimmedAmount === '' || !Number.isFinite(value)) {
    return 'Amount must be a number'
  }

  if (value <= 0) {
    return 'Amount must be greater than 0'
  }

  return null
}
