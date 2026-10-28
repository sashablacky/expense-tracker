/**
 * Formats a money amount with exactly 2 decimal places, no currency symbol
 * and no thousands separator (e.g. 1500 -> "1500.00").
 * @param {number} amount
 * @returns {string}
 */
export function formatAmount(amount) {
  return amount.toFixed(2)
}
