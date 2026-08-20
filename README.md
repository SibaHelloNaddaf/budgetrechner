# Budgetrechner – Bachelorarbeit

Dieses Repository enthält den im Rahmen der Bachelorarbeit
„Vergleich von Testing-Frameworks für Web-Frontend-Architekturen“
entwickelten Vue-3-Budget-Prototypen sowie die dazugehörigen automatisierten
Tests.

## Technische Umgebung

- Node.js 22.23.1
- npm 10.9.8
- Vue 3
- Vite

## Testvarianten

Für den Vergleich wurden zwei Testvarianten umgesetzt:

- `test/jest` – Tests mit Jest
- `test/mocha-chai` – Tests mit Mocha und Chai sowie Sinon für Mocking

Beide Varianten umfassen fachlich identische Testfälle:

- 11 Unit-Tests
- 16 Component-Tests
- insgesamt 27 Testfälle je Testvariante

## Projektstruktur

- `src/` – Quellcode des Vue-3-Budget-Prototyps
- `tests/jest/` – Jest-Testdateien im Branch `test/jest`
- `tests/mocha/` – Mocha-/Chai-Testdateien im Branch `test/mocha-chai`
- `scripts/measure.js` – Skript zur externen Performance-Messung
- `docs/` – ergänzende Dokumentation der Performance-Messung

## Installation

Die beiden Testvarianten befinden sich in getrennten Git-Branches.
Zunächst wird der gewünschte Branch ausgecheckt. Anschließend werden die
jeweiligen Abhängigkeiten installiert.

### Jest

```bash
git checkout test/jest
npm ci
```

### Mocha/Chai

```bash
git checkout test/mocha-chai
npm ci
```

## Tests ausführen

### Jest

```bash
git checkout test/jest
npm ci
npm run test:jest
```

Erwartetes Ergebnis:

```
Test Suites: 4 passed, 4 total
Tests:       27 passed, 27 total
```

### Mocha/Chai

```bash
git checkout test/mocha-chai
npm ci
npm run test:mocha
```

Erwartetes Ergebnis:

```
27 passing
```

## Anwendung starten

Nach der Installation der Abhängigkeiten kann der Vue-3-Budget-Prototyp
mit folgendem Befehl gestartet werden:

```bash
npm run dev
```

## Performance-Messung

Für die externe Messung der Testausführungszeiten wurde das Skript
`scripts/measure.js` verwendet.

Die Messung kann für die jeweilige Testvariante mit folgenden Befehlen
durchgeführt werden.

### Jest

```bash
node scripts/measure.js test:jest 10 --warmup
```

### Mocha/Chai

```bash
node scripts/measure.js test:mocha 10 --warmup
```

Die ausführliche Dokumentation der Messmethodik, Einzelmessungen und
Ergebnisse befindet sich unter:
[docs/PERFORMANCE_MEASUREMENT.md](docs/PERFORMANCE_MEASUREMENT.md)

## Projektkontext

Das Repository gehört zur Bachelorarbeit im Studiengang Wirtschaftsinformatik
an der Hochschule für Technik und Wirtschaft Berlin (HTW Berlin).

Die Untersuchung bezieht sich auf den entwickelten Vue-3-Budget-Prototypen,
die implementierten 27 Testfälle je Testvariante und den in der
Bachelorarbeit beschriebenen Versuchsaufbau.


