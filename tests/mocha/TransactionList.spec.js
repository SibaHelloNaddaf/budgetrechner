import { expect } from 'chai'
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

  it('stellt alle übergebenen Transaktionen dar', () => {
    const wrapper = mount(TransactionList, {
      props: {
        transactions,
      },
    })

    const items = wrapper.findAll('.transaction-item')
    const text = wrapper.text()

    expect(items).to.have.lengthOf(2)
    expect(text).to.include('Gehalt')
    expect(text).to.include('Einnahme')
    expect(text).to.include('2.500,00')
    expect(text).to.include('Miete')
    expect(text).to.include('Ausgabe')
    expect(text).to.include('900,00')
    expect(wrapper.get('.transaction-count').text()).to.equal('2')
  })

  it('zeigt bei einer leeren Liste den Leerzustand an', () => {
    const wrapper = mount(TransactionList, {
      props: {
        transactions: [],
      },
    })

    expect(wrapper.get('.empty-state').text()).to.equal(
      'Noch keine Transaktionen vorhanden.',
    )
    expect(wrapper.get('.transaction-count').text()).to.equal('0')
    expect(wrapper.find('.transaction-list').exists()).to.equal(false)
  })

  it('sendet beim Löschen die ID der ausgewählten Transaktion', async () => {
    const wrapper = mount(TransactionList, {
      props: {
        transactions,
      },
    })

    await wrapper
      .get('button[aria-label="Miete löschen"]')
      .trigger('click')

    const emittedEvents = wrapper.emitted('delete-transaction')

    expect(emittedEvents).to.have.lengthOf(1)
    expect(emittedEvents[0]).to.deep.equal([2])
  })
})
