import { mount } from '@vue/test-utils'

import BudgetSummary from '../../src/components/BudgetSummary.vue'

describe('BudgetSummary', () => {
  test('zeigt Einnahmen, Ausgaben und Saldo im deutschen Euroformat an', () => {
    const wrapper = mount(BudgetSummary, {
      props: {
        totalIncome: 2500,
        totalExpenses: 600.5,
        balance: 1899.5,
      },
    })

    const text = wrapper.text()

    expect(text).toContain('Gesamteinnahmen')
    expect(text).toContain('2.500,00')
    expect(text).toContain('Gesamtausgaben')
    expect(text).toContain('600,50')
    expect(text).toContain('Aktueller Saldo')
    expect(text).toContain('1.899,50')
  })
})
