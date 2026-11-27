// Export a showcase page to a full-length PNG and a one-page PDF using headless Chrome.
// Usage: node docs/showcase/export.mjs aerix   (needs Node 22+ and Chrome installed)
import { spawn } from 'node:child_process'
import { writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const name = process.argv[2]
if (!name) throw new Error('Pass a showcase folder name, e.g. aerix')
const dir = resolve('docs/showcase', name)
const chrome = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const port = 9333 + Math.floor(Math.random() * 500)

const proc = spawn(chrome, [
  '--headless=new', `--remote-debugging-port=${port}`, '--hide-scrollbars',
  `--user-data-dir=${mkdtempSync(join(tmpdir(), 'showcase-'))}`, '--window-size=1440,900', 'about:blank',
], { stdio: 'ignore' })

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let target
for (let i = 0; i < 50 && !target; i++) {
  await sleep(200)
  try { target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === 'page') } catch {}
}
const ws = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((r) => ws.addEventListener('open', r, { once: true }))
let id = 0
const pending = new Map()
const events = []
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data)
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id) } else events.push(m)
})
const send = (method, params = {}) => new Promise((res, rej) => {
  const n = ++id
  pending.set(n, (m) => (m.error ? rej(new Error(m.error.message)) : res(m.result)))
  ws.send(JSON.stringify({ id: n, method, params }))
})

await send('Page.enable')
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
await send('Page.navigate', { url: pathToFileURL(join(dir, 'index.html')).href })
for (let i = 0; i < 100 && !events.some((e) => e.method === 'Page.loadEventFired'); i++) await sleep(100)
await send('Runtime.evaluate', { expression: 'document.fonts.ready', awaitPromise: true })
await sleep(500)

const { result } = await send('Runtime.evaluate', { expression: 'Math.ceil(document.documentElement.scrollHeight)', returnByValue: true })
const height = result.value
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height, deviceScaleFactor: 2, mobile: false })
await sleep(300)
const shot = await send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: 1440, height, scale: 1 }, captureBeyondViewport: true })
writeFileSync(join(dir, `${name}-showcase.png`), Buffer.from(shot.data, 'base64'))

const pdf = await send('Page.printToPDF', {
  printBackground: true, paperWidth: 1440 / 96, paperHeight: height / 96,
  marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, pageRanges: '1',
})
writeFileSync(join(dir, `${name}-showcase.pdf`), Buffer.from(pdf.data, 'base64'))

// Section boundaries, used to slice the poster into portfolio images.
const { result: cuts } = await send('Runtime.evaluate', {
  expression: 'JSON.stringify([...document.querySelectorAll("[data-slice]")].map(e => ({ name: e.dataset.slice, top: Math.round(e.getBoundingClientRect().top + scrollY) })))',
  returnByValue: true,
})
writeFileSync(join(dir, 'slices.json'), JSON.stringify({ height, slices: JSON.parse(cuts.value) }, null, 2))

console.log(`${name}: ${height}px → ${name}-showcase.png, ${name}-showcase.pdf, slices.json`)
ws.close()
proc.kill()
process.exit(0)
