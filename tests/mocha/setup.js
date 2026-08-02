import { JSDOM } from 'jsdom'

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost/',
})

const { window } = dom

Object.defineProperty(globalThis, 'window', {
  value: window,
  configurable: true,
})

Object.defineProperty(globalThis, 'document', {
  value: window.document,
  configurable: true,
})

Object.defineProperty(globalThis, 'navigator', {
  value: window.navigator,
  configurable: true,
})

globalThis.Node = window.Node
globalThis.Element = window.Element
globalThis.HTMLElement = window.HTMLElement
globalThis.SVGElement = window.SVGElement
globalThis.getComputedStyle = window.getComputedStyle.bind(window)

// Weitere DOM-Eigenschaften übernehmen.
// atob und btoa werden bewusst nicht überschrieben.
for (const property of Object.getOwnPropertyNames(window)) {
  if (property === 'atob' || property === 'btoa' || property in globalThis) {
    continue
  }

  Object.defineProperty(globalThis, property, Object.getOwnPropertyDescriptor(window, property))
}
