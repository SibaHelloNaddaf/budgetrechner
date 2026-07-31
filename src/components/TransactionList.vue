<script setup>
defineProps({
  transactions: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['delete-transaction'])

const currencyFormatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
})

function formatCurrency(amount) {
  return currencyFormatter.format(amount)
}

function getTypeLabel(type) {
  return type === 'income' ? 'Einnahme' : 'Ausgabe'
}

function deleteTransaction(id) {
  emit('delete-transaction', id)
}
</script>

<template>
  <section class="transactions-panel" aria-labelledby="transaction-list-heading">
    <div class="section-header">
      <div>
        <h2 id="transaction-list-heading">Transaktionen</h2>
        <p>Alle erfassten Einnahmen und Ausgaben.</p>
      </div>
      <span class="transaction-count">{{ transactions.length }}</span>
    </div>

    <p v-if="transactions.length === 0" class="empty-state">Noch keine Transaktionen vorhanden.</p>

    <ul v-else class="transaction-list">
      <li
        v-for="transaction in transactions"
        :key="transaction.id"
        class="transaction-item"
        :class="`transaction-item--${transaction.type}`"
      >
        <div class="transaction-details">
          <strong>{{ transaction.description }}</strong>
          <span class="transaction-type">{{ getTypeLabel(transaction.type) }}</span>
        </div>
        <span class="transaction-amount">{{ formatCurrency(transaction.amount) }}</span>
        <button
          class="delete-button"
          type="button"
          :aria-label="`${transaction.description} löschen`"
          @click="deleteTransaction(transaction.id)"
        >
          Löschen
        </button>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.transactions-panel {
  padding: 1.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 1.25rem;
  background: rgb(255 255 255 / 92%);
  box-shadow: 0 1rem 2.5rem rgb(15 23 42 / 7%);
}

.section-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

h2 {
  margin: 0;
  color: #0f172a;
  font-size: 1.35rem;
}

.section-header p {
  margin: 0.5rem 0 0;
  color: #64748b;
  line-height: 1.5;
}

.transaction-count {
  display: grid;
  flex: 0 0 auto;
  width: 2.25rem;
  height: 2.25rem;
  place-items: center;
  border-radius: 999px;
  color: #1d4ed8;
  background: #dbeafe;
  font-size: 0.9rem;
  font-weight: 800;
}

.empty-state {
  margin: 0;
  padding: 2.5rem 1rem;
  border: 1px dashed #cbd5e1;
  border-radius: 0.85rem;
  color: #64748b;
  background: #f8fafc;
  text-align: center;
}

.transaction-list {
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.transaction-item {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-left-width: 4px;
  border-radius: 0.85rem;
  background: #fff;
}

.transaction-item--income {
  border-left-color: #22c55e;
}

.transaction-item--expense {
  border-left-color: #ef4444;
}

.transaction-details {
  display: grid;
  min-width: 0;
  gap: 0.3rem;
}

.transaction-details strong {
  overflow: hidden;
  color: #1e293b;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.transaction-type {
  width: fit-content;
  color: #64748b;
  font-size: 0.8rem;
  font-weight: 700;
}

.transaction-amount {
  color: #0f172a;
  font-weight: 800;
  white-space: nowrap;
}

.delete-button {
  padding: 0.55rem 0.8rem;
  border: 1px solid #fecaca;
  border-radius: 0.6rem;
  color: #b91c1c;
  background: #fff;
  font-size: 0.85rem;
  font-weight: 750;
  transition:
    color 160ms ease,
    background 160ms ease,
    border-color 160ms ease;
}

.delete-button:hover {
  border-color: #dc2626;
  color: #fff;
  background: #dc2626;
}

.delete-button:focus-visible {
  outline: 3px solid rgb(220 38 38 / 20%);
  outline-offset: 2px;
}

@media (max-width: 36rem) {
  .transactions-panel {
    padding: 1.25rem;
    border-radius: 1rem;
  }

  .transaction-item {
    grid-template-columns: minmax(0, 1fr) auto;
  }

  .delete-button {
    grid-column: 1 / -1;
    width: 100%;
  }
}
</style>
