import { expect } from 'chai'

import {
  calculateBalance,
  calculateTotalExpenses,
  calculateTotalIncome,
  validateTransaction,
} from '../../src/utils/budgetCalculations.js'

describe('budgetCalculations', () => {
  const transactions = [
    { id: 1, description: 'Gehalt', amount: 2500, type: 'income' },
    { id: 2, description: 'Miete', amount: 900, type: 'expense' },
    { id: 3, description: 'Nebenjob', amount: 400, type: 'income' },
    { id: 4, description: 'Lebensmittel', amount: 250, type: 'expense' },
  ]

  it('summiert nur income-transaktionen korrekt', () => {
    expect(calculateTotalIncome(transactions)).to.equal(2900)
  })

  it('summiert nur expense-transaktionen korrekt', () => {
    expect(calculateTotalExpenses(transactions)).to.equal(1150)
  })

  it('gibt 0 zurück für eine leere transaktionsliste', () => {
    expect(calculateBalance([])).to.equal(0)
  })

  it('gibt 0 zurück, wenn keine einnahmen vorhanden sind', () => {
    const onlyExpenses = [{ id: 1, description: 'Miete', amount: 900, type: 'expense' }]
    expect(calculateTotalIncome(onlyExpenses)).to.equal(0)
  })

  it('gibt 0 zurück, wenn keine ausgaben vorhanden sind', () => {
    const onlyIncome = [{ id: 1, description: 'Gehalt', amount: 2500, type: 'income' }]
    expect(calculateTotalExpenses(onlyIncome)).to.equal(0)
  })

  it('liefert einen negativen saldo bei höheren ausgaben', () => {
    const transactionsWithLoss = [
      { id: 1, description: 'Gehalt', amount: 1000, type: 'income' },
      { id: 2, description: 'Miete', amount: 1200, type: 'expense' },
    ]
    expect(calculateBalance(transactionsWithLoss)).to.equal(-200)
  })

  it('akzeptiert eine gültige income-transaktion', () => {
    expect(validateTransaction({ description: 'Gehalt', amount: 2500, type: 'income' })).to.equal(true)
  })

  it('akzeptiert eine gültige expense-transaktion', () => {
    expect(validateTransaction({ description: 'Miete', amount: 900, type: 'expense' })).to.equal(true)
  })

  it('lehnt eine leere oder nur aus leerzeichen bestehende beschreibung ab', () => {
    expect(validateTransaction({ description: '   ', amount: 2500, type: 'income' })).to.equal(false)
  })

  it('lehnt ungültige betragwerte wie NaN, Infinity, <= 0 oder string ab', () => {
    expect(validateTransaction({ description: 'Gehalt', amount: NaN, type: 'income' })).to.equal(false)
    expect(validateTransaction({ description: 'Gehalt', amount: Infinity, type: 'income' })).to.equal(false)
    expect(validateTransaction({ description: 'Gehalt', amount: 0, type: 'income' })).to.equal(false)
    expect(validateTransaction({ description: 'Gehalt', amount: -50, type: 'income' })).to.equal(false)
    expect(validateTransaction({ description: 'Gehalt', amount: '2500', type: 'income' })).to.equal(false)
  })

  it('lehnt einen ungültigen typ ab', () => {
    expect(validateTransaction({ description: 'Gehalt', amount: 2500, type: 'transfer' })).to.equal(false)
  })
})
