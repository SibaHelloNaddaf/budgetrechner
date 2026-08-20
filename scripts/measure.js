// Performance-Mess-Skript gemäß Bachelorarbeit Abschnitt 4.4.3
// Misst die Wall-Clock-Zeit vollständiger Testsuite-Durchläufe mit process.hrtime.bigint().
//
// Nutzung:
//   node scripts/measure.js <npm-script> <anzahl-messlaeufe> [--warmup]
//
// Beispiele:
//   node scripts/measure.js test:jest 10 --warmup
//   node scripts/measure.js test:mocha 10 --warmup

import { spawnSync } from 'node:child_process'

const [, , npmScript, countArg, warmupFlag] = process.argv

if (!npmScript || !countArg) {
  console.error('Usage: node scripts/measure.js <npm-script> <anzahl-messlaeufe> [--warmup]')
  process.exit(1)
}

const count = Number.parseInt(countArg, 10)
const doWarmup = warmupFlag === '--warmup'

function runOnce() {
  const start = process.hrtime.bigint()
  const result = spawnSync('npm', ['run', npmScript], {
    stdio: 'ignore',
    shell: false,
  })
  const end = process.hrtime.bigint()

  if (result.status !== 0) {
    throw new Error(`Testlauf fehlgeschlagen (exit code ${result.status}) fuer Skript "${npmScript}"`)
  }

  const durationMs = Number(end - start) / 1e6
  return durationMs
}

if (doWarmup) {
  console.log(`Aufwaermlauf (wird nicht gewertet) fuer "${npmScript}" ...`)
  runOnce()
}

const durations = []
for (let i = 1; i <= count; i++) {
  const ms = runOnce()
  durations.push(ms)
  console.log(`Lauf ${i}/${count}: ${ms.toFixed(2)} ms`)
}

function mean(values) {
  return values.reduce((a, b) => a + b, 0) / values.length
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

function stddev(values) {
  const m = mean(values)
  const variance = values.reduce((sum, v) => sum + (v - m) ** 2, 0) / values.length
  return Math.sqrt(variance)
}

const summary = {
  script: npmScript,
  runs: durations.length,
  mean: mean(durations),
  median: median(durations),
  min: Math.min(...durations),
  max: Math.max(...durations),
  stddev: stddev(durations),
}

console.log('\n--- Zusammenfassung ---')
console.log(JSON.stringify(summary, null, 2))
