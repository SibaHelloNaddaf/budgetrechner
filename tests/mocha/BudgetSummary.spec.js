import { expect } from 'chai'
import { mount } from '@vue/test-utils'

import BudgetSummary from '../../src/components/BudgetSummary.vue'

describe('BudgetSummary', () => {
  it('formatiert positive betragwerte korrekt', () => {
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

  it('zeigt 0 werte als 0,00 € an', () => {
    const wrapper = mount(BudgetSummary, {
      props: {
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0,
      },
    })

    const text = wrapper.text()
    expect(text).to.match(/0,00\s*€/u)
  })

  it('zeigt negativen saldo mit minuszeichen im euroformat', () => {
    const wrapper = mount(BudgetSummary, {
      props: {
        totalIncome: 100,
        totalExpenses: 300,
        balance: -200,
      },
    })

    expect(wrapper.text()).to.match(/-200,00\s*€/u)
  })

  it('zeigt alle drei summary-items mit korrekten labels', () => {
    const wrapper = mount(BudgetSummary, {
      props: {
        totalIncome: 1000,
        totalExpenses: 500,
        balance: 500,
      },
    })

    const text = wrapper.text()
    expect(text).to.include('Gesamteinnahmen')
    expect(text).to.include('Gesamtausgaben')
    expect(text).to.include('Aktueller Saldo')
  })
})
