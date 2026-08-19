import { mount } from '@vue/test-utils'
import TransactionList from '@/components/TransactionList.vue'

describe('TransactionList', () => {
  const transactions = [
    { id: 1, description: 'Gehalt', amount: 2500, type: 'income' },
    { id: 2, description: 'Miete', amount: 900, type: 'expense' },
  ]

  it('rendert mehrere transaktionen und zeigt die richtige anzahl', () => {
    const wrapper = mount(TransactionList, {
      props: { transactions },
    })

    expect(wrapper.findAll('.transaction-item')).toHaveLength(2)
    expect(wrapper.get('.transaction-count').text()).toBe('2')
  })

  it('weist jeder transaktion die richtige klasse für income oder expense zu', () => {
    const wrapper = mount(TransactionList, {
      props: { transactions },
    })

    expect(wrapper.get('.transaction-item--income').text()).toContain('Gehalt')
    expect(wrapper.get('.transaction-item--expense').text()).toContain('Miete')
  })

  it('zeigt typen als Einnahme bzw. Ausgabe an', () => {
    const wrapper = mount(TransactionList, {
      props: { transactions },
    })

    expect(wrapper.text()).toContain('Einnahme')
    expect(wrapper.text()).toContain('Ausgabe')
  })

  it('zeigt leeren zustand und keine liste bei leerer transaktionsliste', () => {
    const wrapper = mount(TransactionList, {
      props: { transactions: [] },
    })

    expect(wrapper.get('.empty-state').text()).toBe('Noch keine Transaktionen vorhanden.')
    expect(wrapper.get('.transaction-count').text()).toBe('0')
    expect(wrapper.find('.transaction-list').exists()).toBe(false)
  })

  it('emittiert delete-transaction mit der richtigen id beim löschen', async () => {
    const wrapper = mount(TransactionList, {
      props: { transactions },
    })

    await wrapper.get('button[aria-label="Miete löschen"]').trigger('click')

    expect(wrapper.emitted('delete-transaction')).toHaveLength(1)
    expect(wrapper.emitted('delete-transaction')[0][0]).toBe(2)
  })

  it('aktualisiert liste und zähler, wenn props.transactions geändert werden', async () => {
    const wrapper = mount(TransactionList, {
      props: { transactions },
    })

    expect(wrapper.get('.transaction-count').text()).toBe('2')
    expect(wrapper.findAll('.transaction-item')).toHaveLength(2)

    await wrapper.setProps({
      transactions: [
        ...transactions,
        { id: 3, description: 'Kino', amount: 50, type: 'expense' },
      ],
    })

    expect(wrapper.get('.transaction-count').text()).toBe('3')
    expect(wrapper.findAll('.transaction-item')).toHaveLength(3)
  })
})
