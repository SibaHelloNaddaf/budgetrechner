# Budgetrechner

Dieses Repository enthält den im Rahmen der Bachelorarbeit
„Vergleich von Testing-Frameworks für Web-Frontend-Architekturen“
entwickelten Vue-3-Budget-Prototypen.

Die Anwendung wurde mit Vue 3 und Vite umgesetzt und dient als gemeinsames
Untersuchungsobjekt für den Vergleich von Jest und Mocha/Chai.

## Technische Umgebung

- Node.js 22.23.1
- npm 10.9.8
- Vue 3
- Vite

## Testvarianten

Für den Vergleich wurden zwei getrennte Git-Branches verwendet:

- `test/jest` - Testumgebung mit Jest
- `test/mocha-chai` - Testumgebung mit Mocha und Chai

Beide Varianten enthalten dieselben 27 fachlichen Testfälle:

- 11 Unit-Tests
- 16 Component-Tests
- insgesamt 27 Testfälle je Testvariante

## Installation

Nach dem Wechsel in den gewünschten Branch werden die branchspezifischen
Abhängigkeiten mit folgendem Befehl installiert:

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

Zum Jest-Branch wechseln:

```bash
git checkout test/jest
npm ci
npm run test:jest
```

Die Jest-Testsuite umfasst insgesamt 27 Tests.

## Tests mit Mocha und Chai

Zum Mocha-/Chai-Branch wechseln:

```bash
git checkout test/mocha-chai
npm ci
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

Für den Performance-Vergleich wurde ein einheitliches externes Messverfahren verwendet.

Die Dokumentation der Performance-Messung sowie das zugehörige Messskript befinden sich in den beiden Test-Branches `test/jest` und `test/mocha-chai`.

Dort befinden sich:

- `docs/PERFORMANCE_MEASUREMENT.md` - Beschreibung der Messmethodik
- `scripts/measure.js` - Skript zur externen Laufzeitmessung
