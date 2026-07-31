<script setup>
import { computed, ref } from 'vue'

import BudgetForm from '@/components/BudgetForm.vue'
import BudgetSummary from '@/components/BudgetSummary.vue'
import TransactionList from '@/components/TransactionList.vue'
import {
  calculateBalance,
  calculateTotalExpenses,
  calculateTotalIncome,
} from '@/utils/budgetCalculations'

const transactions = ref([])
const nextTransactionId = ref(1)

const totalIncome = computed(() => calculateTotalIncome(transactions.value))
const totalExpenses = computed(() => calculateTotalExpenses(transactions.value))
const balance = computed(() => calculateBalance(transactions.value))

function addTransaction(transaction) {
  transactions.value.push({
    ...transaction,
    id: nextTransactionId.value,
  })

  nextTransactionId.value += 1
}

function deleteTransaction(id) {
  transactions.value = transactions.value.filter((transaction) => transaction.id !== id)
}
</script>

<template>
  <main class="app-shell">
    <header class="app-header">
      <p class="app-eyebrow">Finanzen im Blick</p>
      <h1>Budgetrechner</h1>
      <p class="app-intro">Erfasse deine Einnahmen und Ausgaben übersichtlich an einem Ort.</p>
    </header>

    <div class="app-grid">
      <BudgetForm @add-transaction="addTransaction" />
      <BudgetSummary
        :total-income="totalIncome"
        :total-expenses="totalExpenses"
        :balance="balance"
      />
    </div>

    <TransactionList :transactions="transactions" @delete-transaction="deleteTransaction" />
  </main>
</template>

<style>
:root {
  color: #182230;
  background: #f3f6fa;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing: border-box;
}

body {
  min-width: 320px;
  min-height: 100vh;
  margin: 0;
  background: radial-gradient(circle at top left, rgb(37 99 235 / 10%), transparent 34rem), #f3f6fa;
}

button,
input,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

.app-shell {
  width: min(100% - 2rem, 70rem);
  margin: 0 auto;
  padding: 3.5rem 0;
}

.app-header {
  max-width: 42rem;
  margin-bottom: 2rem;
}

.app-eyebrow {
  margin: 0 0 0.5rem;
  color: #2563eb;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.app-header h1 {
  margin: 0;
  color: #0f172a;
  font-size: clamp(2.25rem, 6vw, 3.75rem);
  line-height: 1;
  letter-spacing: -0.05em;
}

.app-intro {
  margin: 1rem 0 0;
  color: #64748b;
  font-size: 1.05rem;
  line-height: 1.7;
}

.app-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(20rem, 0.9fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 48rem) {
  .app-shell {
    width: min(100% - 1.25rem, 70rem);
    padding: 2rem 0;
  }

  .app-grid {
    grid-template-columns: 1fr;
  }
}
</style>
