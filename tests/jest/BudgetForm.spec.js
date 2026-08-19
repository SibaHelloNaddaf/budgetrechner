import { mount } from '@vue/test-utils'
import { budgetCalculations } from '@/utils/budgetCalculations'
import BudgetForm from '@/components/BudgetForm.vue'

describe('BudgetForm', () => {
  it('emittiert add-transaction mit korrekten daten bei gültigen eingaben', async () => {
    const wrapper = mount(BudgetForm)

    await wrapper.get('#transaction-description').setValue('Gehalt')
    await wrapper.get('#transaction-amount').setValue('2500')
    await wrapper.get('#transaction-type').setValue('income')
    await wrapper.get('form').trigger('submit')

    expect(wrapper.emitted('add-transaction')).toHaveLength(1)
    expect(wrapper.emitted('add-transaction')[0][0]).toEqual({
      description: 'Gehalt',
      amount: 2500,
      type: 'income',
    })
  })

  it('setzt formularfelder nach erfolgreichem submit zurück', async () => {
    const wrapper = mount(BudgetForm)

    await wrapper.get('#transaction-description').setValue('Gehalt')
    await wrapper.get('#transaction-amount').setValue('2500')
    await wrapper.get('#transaction-type').setValue('income')
    await wrapper.get('form').trigger('submit')

    expect(wrapper.get('#transaction-description').element.value).toBe('')
    expect(wrapper.get('#transaction-amount').element.value).toBe('')
    expect(wrapper.get('#transaction-type').element.value).toBe('expense')
  })

  it('zeigt fehlermeldung und emittiert nichts bei ungültiger eingabe', async () => {
    const wrapper = mount(BudgetForm)

    await wrapper.get('#transaction-description').setValue('')
    await wrapper.get('#transaction-amount').setValue('0')
    await wrapper.get('form').trigger('submit')

    expect(wrapper.get('[role="alert"]').text()).toBe(
      'Bitte gib eine Beschreibung, einen Betrag größer als 0 und einen gültigen Typ an.',
    )
    expect(wrapper.emitted('add-transaction')).toBeUndefined()
  })

  it('erlaubt den wechsel des typs und setzt ihn nach submit zurück auf expense', async () => {
    const wrapper = mount(BudgetForm)

    await wrapper.get('#transaction-type').setValue('income')
    expect(wrapper.get('#transaction-type').element.value).toBe('income')

    await wrapper.get('#transaction-description').setValue('Gehalt')
    await wrapper.get('#transaction-amount').setValue('2500')
    await wrapper.get('form').trigger('submit')

    expect(wrapper.get('#transaction-type').element.value).toBe('expense')
  })

  it('setzt eine vorhandene fehlermeldung nach gültigem submit zurück', async () => {
    const wrapper = mount(BudgetForm)

    await wrapper.get('#transaction-description').setValue('')
    await wrapper.get('#transaction-amount').setValue('0')
    await wrapper.get('form').trigger('submit')
    expect(wrapper.get('[role="alert"]').text()).toContain('Bitte gib eine Beschreibung')

    await wrapper.get('#transaction-description').setValue('Gehalt')
    await wrapper.get('#transaction-amount').setValue('2500')
    await wrapper.get('#transaction-type').setValue('income')
    await wrapper.get('form').trigger('submit')

    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  })

  it('mockt validateTransaction und zeigt fehlermeldung bei fehlgeschlagenem stub', async () => {
    const validateTransactionSpy = jest.spyOn(budgetCalculations, 'validateTransaction').mockReturnValue(false)
    const wrapper = mount(BudgetForm)

    await wrapper.get('#transaction-description').setValue('Gehalt')
    await wrapper.get('#transaction-amount').setValue('2500')
    await wrapper.get('#transaction-type').setValue('income')
    await wrapper.get('form').trigger('submit')

    expect(validateTransactionSpy).toHaveBeenCalledTimes(1)
    expect(wrapper.get('[role="alert"]').text()).toBe(
      'Bitte gib eine Beschreibung, einen Betrag größer als 0 und einen gültigen Typ an.',
    )
    expect(wrapper.emitted('add-transaction')).toBeUndefined()

    validateTransactionSpy.mockRestore()
  })
})
