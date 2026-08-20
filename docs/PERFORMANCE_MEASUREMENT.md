# Performance-Messung: Jest vs. Mocha/Chai

Dokumentation von Methodik, Werkzeugen und Ergebnissen des Performancevergleichs im Rahmen der Bachelorarbeit.

## Was wurde untersucht?

Verglichen wurde die Ausführungsgeschwindigkeit der beiden Testvarianten Jest sowie Mocha in Kombination mit Chai anhand fachlich identischer Testfälle für denselben Vue-3-Budgetrechner.

Gemessen wurde die Wall-Clock-Zeit vollständiger Testsuite-Durchläufe. Beide Varianten umfassten vier Testsuiten mit insgesamt 27 Testfällen.

## Projekt und Umgebung

- Projekt: `budgetrechner` (Vue 3 + Vite)
- Branches: `test/jest` und `test/mocha-chai`
- Mess-Skript: `scripts/measure.js`

## Zeitpunkt

Die finalen Messungen wurden am 20.08.2026 durchgeführt. Beide Messreihen wurden in derselben Sitzung unter denselben grundlegenden Systembedingungen durchgeführt, um eine möglichst gute Vergleichbarkeit sicherzustellen.

## Methodik

1. Entsprechenden Branch auswählen (`test/jest` bzw. `test/mocha-chai`).
2. Abhängigkeiten mit `npm ci` installieren.
3. Kontrolllauf durchführen und prüfen, dass alle 27 Tests erfolgreich ausgeführt werden.
4. Performance-Messung mit `process.hrtime.bigint()` über das Skript `scripts/measure.js`.

Für jede Testvariante wurden durchgeführt:

- ein ungewerteter Aufwärmlauf
- zehn gemessene vollständige Testsuite-Durchläufe

Jeder Lauf startet die Testsuite über das jeweilige npm-Skript in einem eigenen Kindprozess mit `spawnSync`. Dadurch werden neben der eigentlichen Testausführung auch der Start der Testumgebung sowie das Laden und Auflösen benötigter Module berücksichtigt.

### Jest

```bash
node scripts/measure.js test:jest 10 --warmup
```

### Mocha/Chai

```bash
node scripts/measure.js test:mocha 10 --warmup
```

## Ergebnisse (10 Läufe je Testvariante, in Sekunden)

| Kennwert | Jest | Mocha/Chai |
|---|---:|---:|
| Mittelwert | 0,886 | 0,851 |
| Median | 0,879 | 0,853 |
| Minimum | 0,848 | 0,829 |
| Maximum | 0,988 | 0,865 |
| Standardabweichung | 0,037 | 0,011 |

### Einzelmessungen Jest (`test/jest`, ms)

861.73 · 847.51 · 988.18 · 895.56 · 878.04 · 893.37 · 880.31 · 862.98 · 883.78 · 873.44

### Einzelmessungen Mocha/Chai (`test/mocha-chai`, ms)

865.03 · 854.43 · 849.80 · 864.71 · 858.53 · 846.75 · 852.55 · 829.32 · 834.70 · 858.93

## Qualitätssicherung

- Vor jeder Messreihe frische Installation (`npm ci`) und Kontrolllauf
  (27/27 Tests bestanden).
- Aufwärmlauf pro Messreihe, um Kaltstart-Effekte (Modul-/Dateisystem-Cache)
  nicht in die Wertung einzubeziehen.
- Keine automatische Ausreißer-Entfernung; Streuung wird über Median und
  Standardabweichung transparent gemacht.

## Einordnung

Mocha/Chai wies in der finalen Messreihe sowohl beim Mittelwert als auch beim Median geringere Laufzeiten als Jest auf. Die mittlere Laufzeit betrug 0,886 Sekunden für Jest und 0,851 Sekunden für Mocha/Chai. Die absolute Differenz lag damit bei rund 0,035 Sekunden. Bezogen auf den Mittelwert der Mocha-/Chai-Variante lag die durchschnittliche Laufzeit von Jest rund 4,1 % höher.

Auch die Streuung fiel bei Mocha/Chai geringer aus. Die Standardabweichung betrug dort 0,011 Sekunden gegenüber 0,037 Sekunden bei Jest.

Für den untersuchten Versuchsaufbau ergibt sich damit ein leichter Laufzeitvorteil der Mocha-/Chai-Variante. Aufgrund des geringen absoluten Unterschieds und des begrenzten Untersuchungsumfangs lässt sich daraus jedoch kein allgemeiner Performancevorteil für andere Projekte ableiten.

## Bekannte Einschränkungen

- Messungen erfolgten auf einem einzelnen Entwicklungsrechner (macOS),
  keine dedizierte, isolierte Messumgebung.
- Hintergrundprozesse (z. B. Dateisystem-Watcher) können einzelne Läufe
  beeinflussen.
- Die Anzahl von zehn Messläufen je Testvariante ist für weitergehende
  statistische Aussagen begrenzt.
