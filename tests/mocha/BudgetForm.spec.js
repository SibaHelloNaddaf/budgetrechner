import { expect } from 'chai'
import { mount } from '@vue/test-utils'

import BudgetForm from '../../src/components/BudgetForm.vue'

describe('BudgetForm', () => {
  it('sendet bei gültigen Eingaben eine neue Transaktion', async () => {
    const wrapper = mount(BudgetForm)

    await wrapper.get('#transaction-description').setValue('Gehalt')
    await wrapper.get('#transaction-amount').setValue('2500')
    await wrapper.get('#transaction-type').setValue('income')
    await wrapper.get('form').trigger('submit')

    const emittedEvents = wrapper.emitted('add-transaction')

    expect(emittedEvents).to.have.lengthOf(1)
    expect(emittedEvents[0][0]).to.deep.equal({
      description: 'Gehalt',
      amount: 2500,
      type: 'income',
    })
  })

  it('setzt das Formular nach einer gültigen Eingabe zurück', async () => {
    const wrapper = mount(BudgetForm)

    await wrapper.get('#transaction-description').setValue('Gehalt')
    await wrapper.get('#transaction-amount').setValue('2500')
    await wrapper.get('#transaction-type').setValue('income')
    await wrapper.get('form').trigger('submit')

    expect(wrapper.get('#transaction-description').element.value).to.equal('')
    expect(wrapper.get('#transaction-amount').element.value).to.equal('')
    expect(wrapper.get('#transaction-type').element.value).to.equal('expense')
  })

  it('zeigt bei ungültigen Eingaben eine Fehlermeldung an', async () => {
    const wrapper = mount(BudgetForm)

    await wrapper.get('#transaction-description').setValue('')
    await wrapper.get('#transaction-amount').setValue('0')
    await wrapper.get('form').trigger('submit')

    const alert = wrapper.get('[role="alert"]')

    expect(alert.text()).to.equal(
      'Bitte gib eine Beschreibung, einen Betrag größer als 0 und einen gültigen Typ an.',
    )
    expect(wrapper.emitted('add-transaction')).to.equal(undefined)
  })
})
