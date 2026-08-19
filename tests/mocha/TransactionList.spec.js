import { expect } from 'chai'
import { mount } from '@vue/test-utils'

import TransactionList from '../../src/components/TransactionList.vue'

describe('TransactionList', () => {
  const transactions = [
    { id: 1, description: 'Gehalt', amount: 2500, type: 'income' },
    { id: 2, description: 'Miete', amount: 900, type: 'expense' },
  ]

  it('rendert mehrere transaktionen und zeigt die richtige anzahl', () => {
    const wrapper = mount(TransactionList, {
      props: { transactions },
    })

    expect(wrapper.findAll('.transaction-item')).to.have.lengthOf(2)
    expect(wrapper.get('.transaction-count').text()).to.equal('2')
  })

  it('weist jeder transaktion die richtige klasse für income oder expense zu', () => {
    const wrapper = mount(TransactionList, {
      props: { transactions },
    })

    expect(wrapper.get('.transaction-item--income').text()).to.include('Gehalt')
    expect(wrapper.get('.transaction-item--expense').text()).to.include('Miete')
  })

  it('zeigt typen als Einnahme bzw. Ausgabe an', () => {
    const wrapper = mount(TransactionList, {
      props: { transactions },
    })

    expect(wrapper.text()).to.include('Einnahme')
    expect(wrapper.text()).to.include('Ausgabe')
  })

  it('zeigt bei einer leeren liste den leerzustand und keine liste an', () => {
    const wrapper = mount(TransactionList, {
      props: { transactions: [] },
    })

    expect(wrapper.get('.empty-state').text()).to.equal('Noch keine Transaktionen vorhanden.')
    expect(wrapper.get('.transaction-count').text()).to.equal('0')
    expect(wrapper.find('.transaction-list').exists()).to.equal(false)
  })

  it('sendet beim löschen die id der ausgewählten transaktion', async () => {
    const wrapper = mount(TransactionList, {
      props: { transactions },
    })

    await wrapper.get('button[aria-label="Miete löschen"]').trigger('click')

    const emittedEvents = wrapper.emitted('delete-transaction')

    expect(emittedEvents).to.have.lengthOf(1)
    expect(emittedEvents[0]).to.deep.equal([2])
  })

  it('aktualisiert liste und zähler, wenn props.transactions per setProps geändert werden', async () => {
    const wrapper = mount(TransactionList, {
      props: { transactions },
    })

    expect(wrapper.get('.transaction-count').text()).to.equal('2')
    expect(wrapper.findAll('.transaction-item')).to.have.lengthOf(2)

    await wrapper.setProps({
      transactions: [
        ...transactions,
        { id: 3, description: 'Kino', amount: 50, type: 'expense' },
      ],
    })

    expect(wrapper.get('.transaction-count').text()).to.equal('3')
    expect(wrapper.findAll('.transaction-item')).to.have.lengthOf(3)
  })
})
