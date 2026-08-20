# Budgetrechner – Bachelorarbeit

Dieses Repository enthält den im Rahmen der Bachelorarbeit
„Vergleich von Testing-Frameworks für Web-Frontend-Architekturen“
entwickelten Vue-3-Budget-Prototyp sowie die dazugehörigen automatisierten
Tests.

## Testvarianten

Für den Vergleich wurden zwei Testvarianten umgesetzt:

- `test/jest` – Tests mit Jest
- `test/mocha-chai` – Tests mit Mocha und Chai sowie Sinon für Mocking

Beide Varianten umfassen fachlich identische Testfälle:

- 11 Unit-Tests
- 16 Component-Tests
- insgesamt 27 Testfälle je Testvariante

## Installation

Nach dem Wechsel in den gewünschten Branch:

```bash
npm ci
```

## Tests ausführen

### Jest

```bash
git checkout test/jest
npm ci
npm run test:jest
```

### Mocha/Chai

```bash
git checkout test/mocha-chai
npm ci
npm test
```

## Anwendung starten

```bash
npm run dev
```

## Performance-Messung

Für die externe Messung der Testausführungszeiten wurde das Skript
`scripts/measure.js` verwendet.

Die ausführliche Dokumentation der Messmethodik und Messergebnisse befindet
sich unter: [docs/PERFORMANCE_MEASUREMENT.md](docs/PERFORMANCE_MEASUREMENT.md)

## Projektkontext

Das Repository gehört zur Bachelorarbeit im Studiengang
Wirtschaftsinformatik an der Hochschule für Technik und Wirtschaft Berlin
(HTW Berlin). Die Untersuchung bezieht sich auf den entwickelten
Vue-3-Budget-Prototyp und den in der Bachelorarbeit beschriebenen
Versuchsaufbau.

