import { mount } from '@vue/test-utils'

import TransactionList from '../../src/components/TransactionList.vue'

describe('TransactionList', () => {
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
  ]

  test('stellt alle übergebenen Transaktionen dar', () => {
    const wrapper = mount(TransactionList, {
      props: {
        transactions,
      },
    })

    const items = wrapper.findAll('.transaction-item')
    const text = wrapper.text()

    expect(items).toHaveLength(2)
    expect(text).toContain('Gehalt')
    expect(text).toContain('Einnahme')
    expect(text).toContain('2.500,00')
    expect(text).toContain('Miete')
    expect(text).toContain('Ausgabe')
    expect(text).toContain('900,00')
    expect(wrapper.get('.transaction-count').text()).toBe('2')
  })

  test('zeigt bei einer leeren Liste den Leerzustand an', () => {
    const wrapper = mount(TransactionList, {
      props: {
        transactions: [],
      },
    })

    expect(wrapper.get('.empty-state').text()).toBe(
      'Noch keine Transaktionen vorhanden.',
    )
    expect(wrapper.get('.transaction-count').text()).toBe('0')
    expect(wrapper.find('.transaction-list').exists()).toBe(false)
  })

  test('sendet beim Löschen die ID der ausgewählten Transaktion', async () => {
    const wrapper = mount(TransactionList, {
      props: {
        transactions,
      },
    })

    await wrapper.get('button[aria-label="Miete löschen"]').trigger('click')

    const emittedEvents = wrapper.emitted('delete-transaction')

    expect(emittedEvents).toHaveLength(1)
    expect(emittedEvents[0]).toEqual([2])
  })
})
