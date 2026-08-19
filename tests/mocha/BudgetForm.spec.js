import { expect } from 'chai'
import sinon from 'sinon'
import { mount } from '@vue/test-utils'

import { budgetCalculations } from '../../src/utils/budgetCalculations.js'
import BudgetForm from '../../src/components/BudgetForm.vue'

describe('BudgetForm', () => {
  it('sendet bei gültigen eingaben eine neue transaktion', async () => {
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

  it('setzt das formular nach einer gültigen eingabe zurück', async () => {
    const wrapper = mount(BudgetForm)

    await wrapper.get('#transaction-description').setValue('Gehalt')
    await wrapper.get('#transaction-amount').setValue('2500')
    await wrapper.get('#transaction-type').setValue('income')
    await wrapper.get('form').trigger('submit')

    expect(wrapper.get('#transaction-description').element.value).to.equal('')
    expect(wrapper.get('#transaction-amount').element.value).to.equal('')
    expect(wrapper.get('#transaction-type').element.value).to.equal('expense')
  })

  it('zeigt bei ungültigen eingaben eine fehlermeldung an und emittiert nicht', async () => {
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

  it('lässt den typ-select wechseln und setzt ihn nach submit zurück auf expense', async () => {
    const wrapper = mount(BudgetForm)

    await wrapper.get('#transaction-type').setValue('income')
    expect(wrapper.get('#transaction-type').element.value).to.equal('income')

    await wrapper.get('#transaction-description').setValue('Gehalt')
    await wrapper.get('#transaction-amount').setValue('2500')
    await wrapper.get('form').trigger('submit')

    expect(wrapper.get('#transaction-type').element.value).to.equal('expense')
  })

  it('setzt eine vorhandene fehlermeldung nach gültigem submit zurück', async () => {
    const wrapper = mount(BudgetForm)

    await wrapper.get('#transaction-description').setValue('')
    await wrapper.get('#transaction-amount').setValue('0')
    await wrapper.get('form').trigger('submit')
    expect(wrapper.get('[role="alert"]').text()).to.include('Bitte gib eine Beschreibung')

    await wrapper.get('#transaction-description').setValue('Gehalt')
    await wrapper.get('#transaction-amount').setValue('2500')
    await wrapper.get('#transaction-type').setValue('income')
    await wrapper.get('form').trigger('submit')

    expect(wrapper.find('[role="alert"]').exists()).to.equal(false)
  })

  it('mockt validateTransaction und zeigt fehlermeldung bei falscher rückgabe', async () => {
    const stub = sinon.stub(budgetCalculations, 'validateTransaction').returns(false)
    const wrapper = mount(BudgetForm)

    await wrapper.get('#transaction-description').setValue('Gehalt')
    await wrapper.get('#transaction-amount').setValue('2500')
    await wrapper.get('#transaction-type').setValue('income')
    await wrapper.get('form').trigger('submit')

    expect(stub.calledOnce).to.equal(true)
    expect(wrapper.get('[role="alert"]').text()).to.equal(
      'Bitte gib eine Beschreibung, einen Betrag größer als 0 und einen gültigen Typ an.',
    )
    expect(wrapper.emitted('add-transaction')).to.equal(undefined)

    stub.restore()
  })
})
