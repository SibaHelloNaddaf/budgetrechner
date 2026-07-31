export function calculateTotalIncome(transactions) {
  return transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0)
}

export function calculateTotalExpenses(transactions) {
  return transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0)
}

export function calculateBalance(transactions) {
  return calculateTotalIncome(transactions) - calculateTotalExpenses(transactions)
}

export function validateTransaction(transaction) {
  return (
    typeof transaction?.description === 'string' &&
    transaction.description.trim() !== '' &&
    typeof transaction.amount === 'number' &&
    Number.isFinite(transaction.amount) &&
    transaction.amount > 0 &&
    (transaction.type === 'income' || transaction.type === 'expense')
  )
}
