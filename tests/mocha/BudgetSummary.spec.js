import { expect } from 'chai'
import { mount } from '@vue/test-utils'

import BudgetSummary from '../../src/components/BudgetSummary.vue'

describe('BudgetSummary', () => {
  it('zeigt Einnahmen, Ausgaben und Saldo im deutschen Euroformat an', () => {
    const wrapper = mount(BudgetSummary, {
      props: {
        totalIncome: 2500,
        totalExpenses: 600.5,
        balance: 1899.5,
      },
    })

    const text = wrapper.text()

    expect(text).to.include('Gesamteinnahmen')
    expect(text).to.match(/2\.500,00\s*€/u)
    expect(text).to.include('Gesamtausgaben')
    expect(text).to.match(/600,50\s*€/u)
    expect(text).to.include('Aktueller Saldo')
    expect(text).to.match(/1\.899,50\s*€/u)
  })
})
