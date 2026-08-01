import {
  calculateTotalIncome,
  calculateTotalExpenses,
  calculateBalance,
  validateTransaction,
} from '../../src/utils/budgetCalculations.js'

describe('budgetCalculations', () => {
  const transactions = [
    {
      id: 1,
      description: 'Gehalt',
      amount: 2500,
      type: 'income',
    },
    {
      id: 2,
      description: 'Miete',
      amount: 900,
      type: 'expense',
    },
    {
      id: 3,
      description: 'Nebenjob',
      amount: 400,
      type: 'income',
    },
    {
      id: 4,
      description: 'Lebensmittel',
      amount: 250,
      type: 'expense',
    },
  ]

  test('berechnet die gesamten Einnahmen korrekt', () => {
    expect(calculateTotalIncome(transactions)).toBe(2900)
  })

  test('berechnet die gesamten Ausgaben korrekt', () => {
    expect(calculateTotalExpenses(transactions)).toBe(1150)
  })

  test('berechnet den Kontostand korrekt', () => {
    expect(calculateBalance(transactions)).toBe(1750)
  })

  test('erkennt eine gültige Transaktion', () => {
    const transaction = {
      description: 'Gehalt',
      amount: 2500,
      type: 'income',
    }

    expect(validateTransaction(transaction)).toBe(true)
  })
})
