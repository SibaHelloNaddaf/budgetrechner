import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'

import { compileScript, parse } from '@vue/compiler-sfc'

export async function load(url, context, nextLoad) {
  if (!url.endsWith('.vue')) {
    return nextLoad(url, context)
  }

  const filename = fileURLToPath(url)
  const source = await readFile(filename, 'utf8')

  const { descriptor, errors } = parse(source, {
    filename,
  })

  if (errors.length > 0) {
    throw new Error(
      `Die Vue-Komponente ${filename} konnte nicht verarbeitet werden:\n${errors.join('\n')}`,
    )
  }

  const id = createHash('sha256').update(filename).digest('hex').slice(0, 8)

  const compiled = compileScript(descriptor, {
    id,
    inlineTemplate: true,
  })

  return {
    format: 'module',
    source: compiled.content,
    shortCircuit: true,
  }
}
