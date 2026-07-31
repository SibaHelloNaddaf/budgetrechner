<script setup>
defineProps({
  totalIncome: {
    type: Number,
    required: true,
  },
  totalExpenses: {
    type: Number,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
})

const currencyFormatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
})

function formatCurrency(amount) {
  return currencyFormatter.format(amount)
}
</script>

<template>
  <section class="panel" aria-labelledby="budget-summary-heading">
    <h2 id="budget-summary-heading">Übersicht</h2>
    <p class="section-description">Deine aktuelle finanzielle Zusammenfassung.</p>

    <dl class="summary-list">
      <div class="summary-item summary-item--income">
        <dt>Gesamteinnahmen</dt>
        <dd>{{ formatCurrency(totalIncome) }}</dd>
      </div>

      <div class="summary-item summary-item--expense">
        <dt>Gesamtausgaben</dt>
        <dd>{{ formatCurrency(totalExpenses) }}</dd>
      </div>

      <div class="summary-item summary-item--balance">
        <dt>Aktueller Saldo</dt>
        <dd>{{ formatCurrency(balance) }}</dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.panel {
  height: 100%;
  padding: 1.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 1.25rem;
  background: rgb(255 255 255 / 92%);
  box-shadow: 0 1rem 2.5rem rgb(15 23 42 / 7%);
}

h2 {
  margin: 0;
  color: #0f172a;
  font-size: 1.35rem;
}

.section-description {
  margin: 0.5rem 0 1.5rem;
  color: #64748b;
  line-height: 1.5;
}

.summary-list {
  display: grid;
  gap: 0.9rem;
  margin: 0;
}

.summary-item {
  padding: 1rem 1.1rem;
  border: 1px solid;
  border-radius: 0.85rem;
}

.summary-item dt {
  margin-bottom: 0.35rem;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.summary-item dd {
  margin: 0;
  font-size: clamp(1.35rem, 4vw, 1.75rem);
  font-weight: 800;
  letter-spacing: -0.03em;
}

.summary-item--income {
  border-color: #bbf7d0;
  color: #15803d;
  background: #f0fdf4;
}

.summary-item--expense {
  border-color: #fecaca;
  color: #b91c1c;
  background: #fef2f2;
}

.summary-item--balance {
  border-color: #bfdbfe;
  color: #1d4ed8;
  background: #eff6ff;
}

@media (max-width: 30rem) {
  .panel {
    padding: 1.25rem;
    border-radius: 1rem;
  }
}
</style>
