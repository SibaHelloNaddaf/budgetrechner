<script setup>
import { ref } from 'vue'

import { validateTransaction } from '@/utils/budgetCalculations'

const emit = defineEmits(['add-transaction'])

const description = ref('')
const amount = ref('')
const type = ref('expense')
const errorMessage = ref('')

function resetForm() {
  description.value = ''
  amount.value = ''
  type.value = 'expense'
  errorMessage.value = ''
}

function handleSubmit() {
  const transaction = {
    description: description.value,
    amount: Number(amount.value),
    type: type.value,
  }

  if (!validateTransaction(transaction)) {
    errorMessage.value =
      'Bitte gib eine Beschreibung, einen Betrag größer als 0 und einen gültigen Typ an.'
    return
  }

  emit('add-transaction', transaction)
  resetForm()
}
</script>

<template>
  <section class="panel" aria-labelledby="budget-form-heading">
    <h2 id="budget-form-heading">Transaktion hinzufügen</h2>
    <p class="section-description">Trage eine neue Einnahme oder Ausgabe ein.</p>

    <form class="budget-form" @submit.prevent="handleSubmit">
      <div class="form-field">
        <label for="transaction-description">Beschreibung</label>
        <input id="transaction-description" v-model="description" name="description" type="text" />
      </div>

      <div class="form-field">
        <label for="transaction-amount">Betrag</label>
        <input
          id="transaction-amount"
          v-model="amount"
          name="amount"
          type="number"
          min="0"
          step="0.01"
        />
      </div>

      <div class="form-field">
        <label for="transaction-type">Typ</label>
        <select id="transaction-type" v-model="type" name="type">
          <option value="income">Einnahme</option>
          <option value="expense">Ausgabe</option>
        </select>
      </div>

      <p v-if="errorMessage" class="form-error" role="alert">{{ errorMessage }}</p>

      <button class="submit-button" type="submit">Transaktion hinzufügen</button>
    </form>
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

.budget-form {
  display: grid;
  gap: 1.1rem;
}

.form-field {
  display: grid;
  gap: 0.45rem;
}

label {
  color: #334155;
  font-size: 0.9rem;
  font-weight: 700;
}

input,
select {
  width: 100%;
  min-height: 2.9rem;
  padding: 0.7rem 0.85rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.7rem;
  color: #0f172a;
  background: #fff;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease;
}

input:hover,
select:hover {
  border-color: #94a3b8;
}

input:focus,
select:focus {
  border-color: #2563eb;
  outline: none;
  box-shadow: 0 0 0 3px rgb(37 99 235 / 15%);
}

.form-error {
  margin: 0;
  padding: 0.8rem 0.9rem;
  border: 1px solid #fecaca;
  border-radius: 0.7rem;
  color: #b91c1c;
  background: #fef2f2;
  font-size: 0.9rem;
  line-height: 1.5;
}

.submit-button {
  min-height: 2.9rem;
  padding: 0.75rem 1rem;
  border: 0;
  border-radius: 0.7rem;
  color: #fff;
  background: #2563eb;
  font-weight: 750;
  box-shadow: 0 0.5rem 1rem rgb(37 99 235 / 20%);
  transition:
    background 160ms ease,
    transform 160ms ease,
    box-shadow 160ms ease;
}

.submit-button:hover {
  background: #1d4ed8;
  box-shadow: 0 0.65rem 1.25rem rgb(37 99 235 / 28%);
  transform: translateY(-1px);
}

.submit-button:focus-visible {
  outline: 3px solid rgb(37 99 235 / 25%);
  outline-offset: 2px;
}

@media (max-width: 30rem) {
  .panel {
    padding: 1.25rem;
    border-radius: 1rem;
  }
}
</style>
