<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// Flat illustration of me at my desk. Loops between "typing" (hands tap, code fills the screen)
// and "thinking" (hands rest, head tilts up, thought bubble pops). Pauses when off screen.
const TYPE_MS = 5200
const THINK_MS = 2600
const TICK_MS = 70
const MAX_ROWS = 7
const LINE_X = 416
const ROW_Y = 162
const ROW_H = 13
const COLORS = ['#F58A5E', '#8DB4FF', '#8FD6A6', '#F4EFE6', '#FFC857']

// Code "shape": indent level + segments [width, colour]
const LINES = [
  { i: 0, s: [[26, 0], [38, 1], [14, 3]] },
  { i: 1, s: [[22, 2], [48, 3]] },
  { i: 1, s: [[34, 1], [18, 0], [26, 3]] },
  { i: 2, s: [[40, 4], [24, 3]] },
  { i: 2, s: [[16, 0], [44, 1]] },
  { i: 1, s: [[10, 3]] },
  { i: 0, s: [[10, 3]] },
  { i: 0, s: [] },
  { i: 0, s: [[28, 0], [30, 2], [12, 3]] },
  { i: 1, s: [[46, 1], [20, 4]] },
  { i: 1, s: [[26, 3], [34, 0]] },
  { i: 0, s: [[10, 3]] },
]
const lineWidth = (l) => l.s.reduce((sum, [w]) => sum + w + 4, 0)

const rows = ref([])
const thinking = ref(false)
const paused = ref(false)
const root = ref(null)
let nextId = 0
let lineIdx = 0
let tickTimer
let phaseTimer
let io
const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function pushRow(full = false) {
  const def = LINES[lineIdx++ % LINES.length]
  rows.value.push({ id: nextId++, def, typed: full ? lineWidth(def) : 0 })
  if (rows.value.length > MAX_ROWS) rows.value.shift()
}

function tick() {
  if (thinking.value) return
  const last = rows.value[rows.value.length - 1]
  if (!last || last.typed >= lineWidth(last.def)) pushRow()
  else last.typed += 5
}

function phase(next) {
  thinking.value = next
  phaseTimer = setTimeout(() => phase(!next), next ? THINK_MS : TYPE_MS)
}

function start() {
  if (reduce || tickTimer) return
  paused.value = false
  tickTimer = setInterval(tick, TICK_MS)
  phase(false)
}
function stop() {
  clearInterval(tickTimer)
  clearTimeout(phaseTimer)
  tickTimer = null
  paused.value = true
}

onMounted(() => {
  for (let k = 0; k < 4; k++) pushRow(true)
  if (reduce) { paused.value = true; return }
  io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()))
  io.observe(root.value)
})
onBeforeUnmount(() => { stop(); io?.disconnect() })

const rendered = computed(() =>
  rows.value.map((r, idx) => {
    let x = LINE_X + r.def.i * 10
    const segs = r.def.s.map(([w, c]) => {
      const seg = { x, w: Math.max(0, Math.min(w, r.typed - (x - LINE_X - r.def.i * 10))), c: COLORS[c] }
      x += w + 4
      return seg
    })
    const end = LINE_X + r.def.i * 10 + Math.min(r.typed, lineWidth(r.def))
    return { id: r.id, y: ROW_Y + idx * ROW_H, segs, end }
  }),
)
const cursor = computed(() => {
  const last = rendered.value[rendered.value.length - 1]
  return last ? { x: last.end, y: last.y } : { x: LINE_X, y: ROW_Y }
})
</script>

<template>
  <svg
    ref="root"
    viewBox="0 0 640 480"
    class="scene h-auto w-full"
    :class="{ thinking, paused }"
    role="img"
    aria-label="Illustration of Nasrul typing code at his desk, stopping now and then to think"
  >
    <defs>
      <clipPath id="win"><rect x="474" y="28" width="142" height="102" rx="4" /></clipPath>
      <clipPath id="screen"><rect x="404" y="149" width="157" height="112" rx="5" /></clipPath>
    </defs>

    <!-- Rug -->
    <ellipse cx="330" cy="464" rx="220" ry="18" fill="#F7A57C" />

    <!-- Wall: window -->
    <rect x="468" y="22" width="154" height="114" rx="8" fill="#FFFDF8" />
    <g clip-path="url(#win)">
      <rect x="474" y="28" width="142" height="102" fill="#BCD6F6" />
      <circle cx="590" cy="52" r="12" fill="#FFD27A" />
      <g class="clouds">
        <g fill="#FFFFFF">
          <ellipse cx="500" cy="70" rx="20" ry="8" /><ellipse cx="512" cy="64" rx="12" ry="8" />
          <ellipse cx="560" cy="100" rx="24" ry="8" /><ellipse cx="572" cy="93" rx="13" ry="9" />
          <ellipse cx="660" cy="70" rx="20" ry="8" /><ellipse cx="672" cy="64" rx="12" ry="8" />
          <ellipse cx="720" cy="100" rx="24" ry="8" /><ellipse cx="732" cy="93" rx="13" ry="9" />
        </g>
      </g>
      <path d="M474 130 L520 96 L556 120 L590 90 L616 112 L616 130 Z" fill="#8FB3E8" />
    </g>
    <rect x="543" y="28" width="4" height="102" fill="#FFFDF8" />
    <rect x="474" y="77" width="142" height="4" fill="#FFFDF8" />

    <!-- Wall: posters -->
    <g transform="rotate(-4 370 76)">
      <rect x="330" y="44" width="80" height="64" rx="3" fill="#2A4BD7" />
      <circle cx="394" cy="60" r="7" fill="#FFC857" />
      <path d="M336 102 L358 72 L372 88 L384 74 L404 102 Z" fill="#DCE6FF" />
      <path d="M352 80 L358 72 L364 80 Z" fill="#FFFFFF" />
    </g>
    <g transform="rotate(6 440 92)">
      <rect x="420" y="72" width="40" height="40" rx="3" fill="#F26A3D" />
      <circle cx="440" cy="92" r="12" fill="#FFF3E8" />
      <circle cx="436" cy="89" r="1.6" fill="#1B2559" /><circle cx="444" cy="89" r="1.6" fill="#1B2559" />
      <path d="M435 95 Q440 99 445 95" stroke="#1B2559" stroke-width="1.6" fill="none" stroke-linecap="round" />
    </g>

    <!-- Wall: shelf, books, hanging plant -->
    <rect x="36" y="64" width="140" height="7" rx="3" fill="#2A4BD7" />
    <rect x="104" y="30" width="12" height="34" rx="2" fill="#F26A3D" />
    <rect x="118" y="36" width="10" height="28" rx="2" fill="#1B2559" />
    <rect x="130" y="26" width="13" height="38" rx="2" fill="#FFC857" />
    <rect x="145" y="40" width="11" height="24" rx="2" transform="rotate(12 150 52)" fill="#7FA8F0" />
    <path d="M44 64 L50 44 L82 44 L88 64 Z" fill="#F26A3D" />
    <g class="vines" fill="none" stroke="#3E9E5E" stroke-width="2.5" stroke-linecap="round">
      <path d="M54 50 Q40 90 50 130 Q56 150 46 170" />
      <path d="M66 52 Q72 96 64 136" />
      <path d="M78 50 Q96 80 88 112" />
      <g fill="#4DB36F" stroke="none">
        <ellipse cx="44" cy="92" rx="7" ry="4" transform="rotate(-30 44 92)" /><ellipse cx="53" cy="122" rx="7" ry="4" transform="rotate(30 53 122)" />
        <ellipse cx="46" cy="160" rx="7" ry="4" transform="rotate(-20 46 160)" /><ellipse cx="72" cy="104" rx="7" ry="4" transform="rotate(25 72 104)" />
        <ellipse cx="62" cy="134" rx="7" ry="4" transform="rotate(-25 62 134)" /><ellipse cx="94" cy="88" rx="7" ry="4" transform="rotate(35 94 88)" />
        <ellipse cx="86" cy="110" rx="7" ry="4" transform="rotate(-15 86 110)" /><ellipse cx="58" cy="60" rx="8" ry="4" transform="rotate(-10 58 60)" />
        <ellipse cx="76" cy="58" rx="8" ry="4" transform="rotate(15 76 58)" />
      </g>
    </g>

    <!-- Desk -->
    <rect x="354" y="314" width="12" height="150" rx="2" fill="#2A4BD7" />
    <rect x="520" y="314" width="110" height="150" rx="5" fill="#2A4BD7" />
    <g fill="#FFFDF8">
      <rect x="530" y="324" width="90" height="40" rx="4" /><rect x="530" y="372" width="90" height="40" rx="4" /><rect x="530" y="420" width="90" height="36" rx="4" />
    </g>
    <g fill="#2A4BD7">
      <rect x="563" y="342" width="24" height="5" rx="2.5" /><rect x="563" y="390" width="24" height="5" rx="2.5" /><rect x="563" y="436" width="24" height="5" rx="2.5" />
    </g>
    <rect x="340" y="300" width="300" height="14" rx="4" fill="#FFFDF8" />
    <rect x="344" y="312" width="292" height="4" rx="2" fill="#E8D8BE" />

    <!-- Monitor -->
    <ellipse cx="482" cy="299" rx="32" ry="4" fill="#2D3A73" />
    <rect x="476" y="266" width="12" height="34" fill="#2D3A73" />
    <rect x="395" y="140" width="175" height="130" rx="10" fill="#1B2559" />
    <rect x="404" y="149" width="157" height="112" rx="5" fill="#222D63" />
    <g clip-path="url(#screen)">
      <circle cx="412" cy="155" r="2" fill="#F26A3D" /><circle cx="419" cy="155" r="2" fill="#FFC857" /><circle cx="426" cy="155" r="2" fill="#8FD6A6" />
      <g v-for="(r, idx) in rendered" :key="r.id" class="row" :style="{ transform: `translateY(${r.y}px)` }">
        <rect x="408" y="0" width="4" height="5" rx="1" fill="#3A4680" />
        <rect v-for="(s, k) in r.segs" :key="k" :x="s.x" y="0" :width="s.w" height="5" rx="2.5" :fill="s.c" />
      </g>
      <rect class="cursor" :x="cursor.x + 2" :y="cursor.y - 1" width="2" height="7" fill="#FFFFFF" />
    </g>

    <!-- Desk items -->
    <rect x="384" y="291" width="92" height="9" rx="3" fill="#2D3A73" />
    <rect x="388" y="293" width="84" height="2" rx="1" fill="#46548F" />
    <ellipse cx="496" cy="296" rx="7" ry="4" fill="#2D3A73" />
    <g class="steam" fill="none" stroke="#C9BBA4" stroke-width="2" stroke-linecap="round">
      <path d="M538 262 Q534 254 538 246 Q542 238 538 230" />
      <path d="M548 264 Q544 256 548 248 Q552 240 548 232" />
    </g>
    <rect x="532" y="270" width="22" height="30" rx="4" fill="#F26A3D" />
    <path d="M554 278 Q564 278 564 286 Q564 294 554 294" fill="none" stroke="#F26A3D" stroke-width="4" />
    <!-- Lamp -->
    <path class="glow" d="M590 196 L560 300 L634 300 L612 196 Z" fill="#FFE3A3" opacity="0.35" />
    <ellipse cx="612" cy="298" rx="18" ry="5" fill="#F26A3D" />
    <path d="M612 296 L624 226 L598 190" fill="none" stroke="#F26A3D" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M584 182 L612 176 L606 206 Z" fill="#F26A3D" />

    <!-- Chair -->
    <rect x="222" y="226" width="38" height="146" rx="17" fill="#2A4BD7" />
    <rect x="292" y="380" width="10" height="58" fill="#3A4270" />
    <path d="M297 438 L246 452 M297 438 L350 452 M297 438 L300 458" stroke="#3A4270" stroke-width="7" stroke-linecap="round" />
    <circle cx="246" cy="456" r="6" fill="#1B2559" /><circle cx="350" cy="456" r="6" fill="#1B2559" /><circle cx="300" cy="461" r="6" fill="#1B2559" />

    <!-- Far leg -->
    <path d="M262 338 L382 340 Q394 356 382 372 L262 370 Z" fill="#B48D63" />
    <path d="M366 360 L390 360 L387 446 L369 446 Z" fill="#B48D63" />
    <path d="M362 444 L390 444 Q406 446 408 458 L362 459 Z" fill="#2A2F45" />

    <rect x="236" y="364" width="124" height="18" rx="9" fill="#2A4BD7" />

    <!-- Body (breathes) -->
    <g class="body">
      <!-- Near leg -->
      <path d="M268 344 L396 346 Q410 364 396 382 L268 378 Z" fill="#C9A37A" />
      <path d="M380 368 L404 368 L400 448 L382 448 Z" fill="#C9A37A" />
      <path d="M374 446 L404 446 Q422 448 424 461 L374 462 Z" fill="#2A2F45" />
      <rect x="374" y="459" width="50" height="4" rx="2" fill="#FFFFFF" />

      <!-- Far arm -->
      <path d="M300 262 L326 306" stroke="#74472D" stroke-width="18" stroke-linecap="round" />
      <g class="forearm far">
        <path d="M326 306 L390 292" stroke="#74472D" stroke-width="15" stroke-linecap="round" />
        <circle cx="394" cy="290" r="8.5" fill="#74472D" />
      </g>

      <!-- Torso: jersey -->
      <path d="M262 246 Q290 234 318 250 Q330 282 324 308 L320 352 Q292 368 262 362 Q250 300 262 246 Z" fill="#1B2559" />
      <path d="M262 246 Q252 300 262 362 L276 362 Q268 300 274 248 Z" fill="#FFFFFF" />
      <path d="M300 238 L310 244 L296 300 L288 298 Z" fill="#F26A3D" />
      <text x="278" y="342" font-family="Outfit Variable, sans-serif" font-weight="800" font-size="22" fill="#FFFFFF">20</text>
      <rect x="262" y="350" width="60" height="10" rx="4" fill="#F26A3D" />

      <!-- Head (tilts up while thinking) -->
      <g class="head">
        <rect x="279" y="220" width="16" height="26" rx="6" fill="#74472D" />
        <circle cx="292" cy="196" r="31" fill="#8B5A3C" />
        <path d="M321 190 Q328 196 322 202" fill="#8B5A3C" />
        <ellipse cx="279" cy="200" rx="6" ry="8" fill="#74472D" />
        <g class="eyes">
          <ellipse class="eye" cx="309" cy="192" rx="2.6" ry="3.4" fill="#1B1210" />
          <path d="M303 183 Q309 180 314 183" stroke="#2A1D19" stroke-width="2.2" fill="none" stroke-linecap="round" />
        </g>
        <path class="mouth" d="M303 210 Q310 215 316 209" stroke="#3B2117" stroke-width="2.2" fill="none" stroke-linecap="round" />
        <g fill="#2A1D19">
          <circle cx="268" cy="206" r="9" /><circle cx="262" cy="192" r="12" /><circle cx="265" cy="176" r="12" />
          <circle cx="276" cy="166" r="13" /><circle cx="292" cy="161" r="13" /><circle cx="307" cy="164" r="12" />
          <circle cx="318" cy="172" r="9" /><circle cx="276" cy="186" r="9" /><circle cx="285" cy="176" r="10" />
          <circle cx="300" cy="173" r="9" />
        </g>
      </g>

      <!-- Near arm -->
      <path d="M308 268 L340 314" stroke="#8B5A3C" stroke-width="19" stroke-linecap="round" />
      <path d="M304 258 L318 282" stroke="#1B2559" stroke-width="24" stroke-linecap="round" />
      <path d="M314 276 L322 290" stroke="#F26A3D" stroke-width="24" stroke-linecap="butt" />
      <g class="forearm near">
        <path d="M340 314 L408 294" stroke="#8B5A3C" stroke-width="16" stroke-linecap="round" />
        <circle cx="412" cy="292" r="9" fill="#8B5A3C" />
      </g>
    </g>

    <!-- Thought bubble -->
    <g class="bubble">
      <circle class="dot d1" cx="262" cy="146" r="4" fill="#FFFFFF" stroke="#E6D5BA" stroke-width="2" />
      <circle class="dot d2" cx="248" cy="130" r="6" fill="#FFFFFF" stroke="#E6D5BA" stroke-width="2" />
      <g class="cloud">
        <g fill="#E6D5BA" transform="translate(0 4)">
          <ellipse cx="212" cy="104" rx="46" ry="30" /><circle cx="188" cy="88" r="16" /><circle cx="232" cy="84" r="18" />
        </g>
        <g fill="#FFFFFF">
          <ellipse cx="212" cy="104" rx="46" ry="30" /><circle cx="188" cy="88" r="16" /><circle cx="232" cy="84" r="18" />
        </g>
        <text x="212" y="112" text-anchor="middle" font-family="Geist Mono Variable, monospace" font-weight="600" font-size="22" fill="#1B2559">
          {<tspan fill="#F26A3D"> ? </tspan>}
        </text>
      </g>
    </g>
  </svg>
</template>

<style scoped>
.scene * { transform-box: view-box; }

.row { transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1); }
.cursor { animation: blink 1s steps(1) infinite; }

/* Typing: forearms tap from the elbow, out of step */
.forearm { animation: tap 0.3s ease-in-out infinite alternate; }
.forearm.far { transform-origin: 326px 306px; }
.forearm.near { transform-origin: 340px 314px; animation-delay: -0.15s; }
.forearm { transition: transform 0.4s ease; }
.thinking .forearm { animation: none; transform: rotate(4deg); }

/* Breathing + head */
.body { animation: breathe 3.6s ease-in-out infinite; }
.head { transform-origin: 287px 238px; transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
.thinking .head { transform: rotate(-9deg); }
.eyes { transition: transform 0.4s ease; }
.thinking .eyes { transform: translate(1px, -2px); }
.eye { transform-box: fill-box; transform-origin: center; animation: eyeblink 4.6s infinite; }
.mouth { transform-box: fill-box; transform-origin: center; transition: transform 0.4s ease; }
.thinking .mouth { transform: scaleX(0.6) translateX(2px); }

/* Thought bubble pops while thinking */
.bubble > * { transform-box: fill-box; transform-origin: 80% 100%; opacity: 0; transform: scale(0.4); transition: opacity 0.25s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1); }
.thinking .bubble > * { opacity: 1; transform: scale(1); }
.thinking .bubble .d2 { transition-delay: 0.12s; }
.thinking .bubble .cloud { transition-delay: 0.24s; }

/* Ambient */
.clouds { animation: drift 18s linear infinite; }
.vines { transform-origin: 66px 50px; animation: sway 5s ease-in-out infinite alternate; }
.steam path { animation: steam 2.8s ease-in-out infinite; }
.steam path:nth-child(2) { animation-delay: -1.4s; }
.glow { animation: glow 4s ease-in-out infinite alternate; }

.paused *, .paused { animation-play-state: paused !important; }

@keyframes tap { from { transform: rotate(-2deg); } to { transform: rotate(2.5deg); } }
@keyframes breathe { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-1.5px); } }
@keyframes eyeblink { 0%, 94%, 100% { transform: scaleY(1); } 97% { transform: scaleY(0.1); } }
@keyframes blink { 50% { opacity: 0; } }
@keyframes drift { from { transform: translateX(0); } to { transform: translateX(-160px); } }
@keyframes sway { from { transform: rotate(-2.5deg); } to { transform: rotate(2.5deg); } }
@keyframes steam { 0% { opacity: 0; transform: translateY(6px); } 40% { opacity: 0.9; } 100% { opacity: 0; transform: translateY(-14px); } }
@keyframes glow { from { opacity: 0.25; } to { opacity: 0.45; } }

@media (prefers-reduced-motion: reduce) {
  .scene *, .scene { animation: none !important; transition: none !important; }
}
</style>
