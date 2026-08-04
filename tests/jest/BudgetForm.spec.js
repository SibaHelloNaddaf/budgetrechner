import { mount } from '@vue/test-utils'

import BudgetForm from '../../src/components/BudgetForm.vue'

describe('BudgetForm', () => {
  test('sendet bei gültigen Eingaben eine neue Transaktion', async () => {
    const wrapper = mount(BudgetForm)

    await wrapper.get('#transaction-description').setValue('Gehalt')
    await wrapper.get('#transaction-amount').setValue('2500')
    await wrapper.get('#transaction-type').setValue('income')
    await wrapper.get('form').trigger('submit')

    const emittedEvents = wrapper.emitted('add-transaction')

    expect(emittedEvents).toHaveLength(1)
    expect(emittedEvents[0][0]).toEqual({
      description: 'Gehalt',
      amount: 2500,
      type: 'income',
    })
  })

  test('setzt das Formular nach einer gültigen Eingabe zurück', async () => {
    const wrapper = mount(BudgetForm)

    await wrapper.get('#transaction-description').setValue('Gehalt')
    await wrapper.get('#transaction-amount').setValue('2500')
    await wrapper.get('#transaction-type').setValue('income')
    await wrapper.get('form').trigger('submit')

    expect(wrapper.get('#transaction-description').element.value).toBe('')
    expect(wrapper.get('#transaction-amount').element.value).toBe('')
    expect(wrapper.get('#transaction-type').element.value).toBe('expense')
  })

  test('zeigt bei ungültigen Eingaben eine Fehlermeldung an', async () => {
    const wrapper = mount(BudgetForm)

    await wrapper.get('#transaction-description').setValue('')
    await wrapper.get('#transaction-amount').setValue('0')
    await wrapper.get('form').trigger('submit')

    expect(wrapper.get('[role="alert"]').text()).toBe(
      'Bitte gib eine Beschreibung, einen Betrag größer als 0 und einen gültigen Typ an.',
    )
    expect(wrapper.emitted('add-transaction')).toBeUndefined()
  })
})
