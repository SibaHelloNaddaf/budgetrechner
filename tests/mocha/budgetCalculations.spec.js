import { expect } from 'chai'

import {
  calculateBalance,
  calculateTotalExpenses,
  calculateTotalIncome,
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

  it('berechnet die gesamten Einnahmen korrekt', () => {
    expect(calculateTotalIncome(transactions)).to.equal(2900)
  })

  it('berechnet die gesamten Ausgaben korrekt', () => {
    expect(calculateTotalExpenses(transactions)).to.equal(1150)
  })

  it('berechnet den Kontostand korrekt', () => {
    expect(calculateBalance(transactions)).to.equal(1750)
  })

  it('erkennt eine gültige Transaktion', () => {
    const transaction = {
      description: 'Gehalt',
      amount: 2500,
      type: 'income',
    }

    expect(validateTransaction(transaction)).to.equal(true)
  })
})
