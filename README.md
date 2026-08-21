# Budgetrechner

Dieses Repository enthält den im Rahmen der Bachelorarbeit
„Vergleich von Testing-Frameworks für Web-Frontend-Architekturen“
entwickelten Budget-Prototypen.

Die Anwendung wurde mit Vue 3 und Vite umgesetzt und dient als gemeinsames
Untersuchungsobjekt für den Vergleich von Jest und Mocha/Chai.

## Technische Umgebung

- Node.js 22.23.1
- npm 10.9.8
- Vue 3
- Vite

## Branches

Für die beiden Testvarianten existieren getrennte Branches:

- `test/jest` – Testumgebung mit Jest
- `test/mocha-chai` – Testumgebung mit Mocha und Chai

Beide Varianten enthalten dieselben 27 fachlichen Testfälle:

- 11 Unit-Tests
- 16 Component-Tests

## Installation

Nach dem Klonen des Repositories müssen zunächst die Abhängigkeiten
installiert werden.

```bash
npm ci
```

## Anwendung starten

Die Vue-Anwendung wird mit folgendem Befehl gestartet:

```bash
npm run dev
```

Vite gibt anschließend die lokale Adresse der Anwendung aus, in der Regel:

```text
http://localhost:5173/
```

## Tests mit Jest

Im Branch `test/jest` können die Jest-Tests mit folgendem Befehl ausgeführt
werden:

```bash
npm run test:jest
```

Die Testsuite umfasst insgesamt 27 Tests.

## Tests mit Mocha und Chai

Im Branch `test/mocha-chai` können die Mocha-/Chai-Tests mit folgendem
Befehl ausgeführt werden:

```bash
npm run test:mocha
```

Auch diese Testsuite umfasst insgesamt 27 fachlich identische Tests.

## Projektstruktur

```text
src/
├── components/
│   ├── BudgetForm.vue
│   ├── BudgetSummary.vue
│   └── TransactionList.vue
├── utils/
│   └── budgetCalculations.js
├── App.vue
└── main.js
```

## Performance-Messung

Für den Performance-Vergleich wurde ein einheitliches externes Messverfahren
verwendet.

Weitere Informationen zur Durchführung der Messungen befinden sich unter:

`docs/PERFORMANCE_MEASUREMENT.md`

Das zugehörige Messskript befindet sich unter:

`scripts/measure.js`

## Kontext

Das Projekt wurde im Rahmen einer Bachelorarbeit im Studiengang
Wirtschaftsinformatik an der Hochschule für Technik und Wirtschaft Berlin
entwickelt.


