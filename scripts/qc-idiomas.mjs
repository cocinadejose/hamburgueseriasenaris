#!/usr/bin/env node
/**
 * QC de idiomas — Hamburguesería Señarís (ACTUALIZACION-2027.md §8)
 *
 * Uso:
 *   node scripts/qc-idiomas.mjs <ruta-archivo-o-idioma> [más rutas...]
 *   node scripts/qc-idiomas.mjs ja/blog/apostle-santiago-festivals.html
 *   node scripts/qc-idiomas.mjs ja zh ko
 *
 * Comprueba, por archivo:
 *   1. §6.4 — scripts prohibidos según idioma (kana / hangul / han simplificado).
 *   2. Mojibake (sensible a mayúsculas: 'Ã' != 'ã'), U+FFFD y forma NFC.
 *   3. Restos de otro idioma (¿ ¡ en ja/zh/ko, cirílico siempre, ß fuera de de).
 *   4. hreflang: los 9 idiomas + x-default, y canonical recíproco entre archivos.
 *   5. Enlaces internos no rotos.
 *
 * Salida: `archivo:línea:columna: carácter: motivo` (una línea por hallazgo).
 * Criterio de cierre: 0 hallazgos (código de salida 0).
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const LANGS = ['es', 'en', 'fr', 'de', 'it', 'pt', 'ja', 'zh', 'ko'];
const ASIAN = new Set(['ja', 'zh', 'ko']);

/* ---------- scripts prohibidos por idioma ---------- */
const SCRIPT_RULES = [
  { name: 'hiragana', re: /\p{Script=Hiragana}/gu, allowed: 'ja', motivo: 'kana (prohibido fuera de ja)' },
  { name: 'katakana', re: /\p{Script=Katakana}/gu, allowed: 'ja', motivo: 'kana (prohibido fuera de ja)' },
  { name: 'hangul', re: /\p{Script=Hangul}/gu, allowed: 'ko', motivo: 'hangul (prohibido fuera de ko)' },
  { name: 'cyrillic', re: /\p{Script=Cyrillic}/gu, allowed: null, motivo: 'cirílico (prohibido siempre)' },
];

/* Han simplificado que NO existe ni en shinjitai japonés ni en hanja tradicional.
   (学, 国, 会, 体, 医, 台, 点, 号, 万, 与, 双, 尽, 来, 画, 条… son válidos en japonés: NO están aquí). */
const SIMPLIFIED_ONLY = new Set([
  '门', '关', '无', '于', '说', '见', '们', '这', '为', '经', '济', '语', '让', '认', '议', '论',
  '责', '货', '员', '单', '图', '团', '严', '书', '长', '问', '间', '闻', '风', '飞', '马', '鸟',
  '鱼', '龙', '车', '东', '业', '专', '贝', '观', '页', '归', '华', '现', '应', '报', '乐', '买',
  '卖', '场', '师', '从', '众', '优', '传', '电', '亲', '儿', '头', '层', '岁', '类', '时', '动',
  '务', '劳', '势', '处', '备', '复', '变', '发', '义', '识', '则', '购', '财', '败', '军', '农',
  '愿', '难', '际', '达', '进', '远', '运', '过', '还', '边', '乡', '习', '亚', '产', '众', '历',
]);

/* Mojibake: 'Ã'/'Â'/'â'/'å'/'ï' SEGUIDOS de carácter de control latin-1 (U+0080–U+00BF).
   Case-sensitive a propósito: la 'ã'/'â' legítimas de fr/pt no casan con este patrón. */
const MOJIBAKE = [
  [/[ÃÂâå][\u0080-\u00BF]/g, 'mojibake (UTF-8 leído como latin-1)'],
  [/ï»¿/g, 'BOM mojibake (ï»¿)'],
];

/* Nombres propios que NO se traducen: su 'ñ'/'í' es legítima (§11). */
const PROPER_NAMES = /Hamburgueser[íi]a\s*Se[ñn]ar[íi]s|Se[ñn]ar[íi]s|Peri[ñn]án|Mu[ñn]eira/g;

const findings = [];
const report = (file, line, col, char, reason) =>
  findings.push(`${relative(ROOT, file)}:${line}:${col}: ${char}: ${reason}`);

/* ---------- utilidades ---------- */
function langOf(file) {
  const hit = relative(ROOT, file).split(/[\\/]/).find((p) => LANGS.includes(p));
  if (hit) return hit;
  const m = readFileSync(file, 'utf8').match(/<html[^>]+lang="([a-zA-Z-]+)"/i);
  return m ? m[1].slice(0, 2).toLowerCase() : '';
}

function collect(target) {
  const abs = resolve(ROOT, target);
  if (!existsSync(abs)) throw new Error(`no existe: ${target}`);
  if (statSync(abs).isFile()) return [abs];
  const out = [];
  for (const entry of readdirSync(abs, { withFileTypes: true })) {
    const p = join(abs, entry.name);
    if (entry.isDirectory()) out.push(...collect(relative(ROOT, p)));
    else if (/\.html?$/i.test(entry.name)) out.push(p);
  }
  return out;
}

function allowedRanges(line) {
  const ranges = [];
  for (const m of line.matchAll(PROPER_NAMES)) ranges.push([m.index, m.index + m[0].length]);
  return ranges;
}
const inRange = (i, ranges) => ranges.some(([a, b]) => i >= a && i < b);

/* ---------- 1–3: scripts, mojibake, NFC ---------- */
function checkChars(file, lang, text) {
  text.split(/\r?\n/).forEach((line, idx) => {
    const n = idx + 1;
    const ranges = allowedRanges(line);

    for (const rule of SCRIPT_RULES) {
      if (rule.allowed && rule.allowed === lang) continue;
      for (const m of line.matchAll(new RegExp(rule.re.source, 'gu'))) {
        if (inRange(m.index, ranges)) continue;
        report(file, n, m.index + 1, m[0], rule.motivo);
      }
    }

    if (lang && lang !== 'zh') {
      for (let i = 0; i < line.length; i++) {
        if (SIMPLIFIED_ONLY.has(line[i]) && !inRange(i, ranges)) {
          report(file, n, i + 1, line[i], 'han simplificado (no existe en este idioma)');
        }
      }
    }

    for (const [re, motivo] of MOJIBAKE) {
      for (const m of line.matchAll(re)) report(file, n, m.index + 1, m[0], motivo);
    }

    for (let i = 0; i < line.length; i++) {
      if (line[i] === '\uFFFD') report(file, n, i + 1, 'U+FFFD', 'carácter de reemplazo');
    }

    if (ASIAN.has(lang)) {
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if ((ch === '¿' || ch === '¡') && !inRange(i, ranges)) {
          report(file, n, i + 1, ch, 'signo español en idioma asiático');
        }
      }
    }
    if (lang !== 'de') {
      for (let i = 0; i < line.length; i++) {
        if (line[i] === 'ß') report(file, n, i + 1, 'ß', 'carácter alemán fuera de de');
      }
    }

    const nfc = line.normalize('NFC');
    if (nfc !== line) {
      for (let i = 0; i < line.length; i++) {
        if (line[i] !== nfc[i]) report(file, n, i + 1, line[i], 'no está en forma NFC');
      }
    }
  });
}

/* ---------- 4: hreflang + canonical recíproco ---------- */
const canonicalCache = new Map();
function canonicalOf(file) {
  if (!canonicalCache.has(file)) {
    if (!existsSync(file)) canonicalCache.set(file, null);
    else {
      const m = readFileSync(file, 'utf8').match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i);
      canonicalCache.set(file, m ? m[1] : null);
    }
  }
  return canonicalCache.get(file);
}

function urlToFile(url) {
  const path = url.replace(/^https?:\/\/[^/]+/i, '').replace(/[?#].*$/, '').replace(/\/+$/, '');
  if (!path) return null;
  for (const c of [path, `${path}.html`, join(path, 'index.html')]) {
    const abs = resolve(ROOT, c.replace(/^\//, ''));
    if (existsSync(abs) && statSync(abs).isFile()) return abs;
  }
  return null;
}

function checkHreflang(file, text) {
  const hrefs = [...text.matchAll(/<link[^>]+rel="alternate"[^>]+hreflang="([^"]+)"[^>]+href="([^"]+)"/gi)];
  const map = new Map(hrefs.map((m) => [m[1].toLowerCase(), m[2]]));
  for (const l of [...LANGS, 'x-default']) {
    if (!map.has(l)) report(file, 1, 1, `hreflang=${l}`, 'falta el hreflang');
  }
  const canon = canonicalOf(file);
  const lang = langOf(file);
  const self = map.get(lang);
  if (self && canon && self !== canon) {
    report(file, 1, 1, 'canonical', `canonical (${canon}) distinto del hreflang propio (${self})`);
  }
  if (!map.has('x-default')) report(file, 1, 1, 'x-default', 'falta x-default');
  for (const l of LANGS) {
    const url = map.get(l);
    if (!url) continue;
    const target = urlToFile(url);
    if (!target) {
      report(file, 1, 1, `hreflang=${l}`, `no existe el archivo destino: ${url}`);
      continue;
    }
    const targetCanon = canonicalOf(target);
    if (targetCanon && targetCanon !== url) {
      report(file, 1, 1, `hreflang=${l}`, `canonical recíproco distinto en ${relative(ROOT, target)}`);
    }
  }
}

/* ---------- 4c: JSON-LD válido ---------- */
function checkJsonLd(file, text) {
  const blocks = [...text.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  blocks.forEach((b, i) => {
    try {
      JSON.parse(b[1]);
    } catch (e) {
      const line = text.slice(0, b.index).split(/\r?\n/).length;
      report(file, line, 1, `JSON-LD #${i + 1}`, `no es JSON válido: ${e.message}`);
    }
  });
}

/* ---------- 4b: etiquetas desbalanceadas ---------- */
const PAIRED_TAGS = ['div', 'span', 'td', 'tr', 'table', 'ul', 'ol', 'section', 'strong', 'em', 'video', 'style', 'script', 'nav', 'footer', 'main', 'a'];

function checkTags(file, text) {
  for (const tag of PAIRED_TAGS) {
    const open = (text.match(new RegExp(`<${tag}(\\s|>)`, 'gi')) || []).length;
    const close = (text.match(new RegExp(`</${tag}>`, 'gi')) || []).length;
    if (open !== close) {
      report(file, 1, 1, `<${tag}>`, `etiquetas desbalanceadas: ${open} aperturas vs ${close} cierres`);
    }
  }
}

/* ---------- 4d: anclas internas del índice ---------- */
function checkAnchors(file, text) {
  const ids = new Set([...text.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  for (const m of text.matchAll(/href="#([^"]+)"/g)) {
    if (!ids.has(m[1])) {
      const line = text.slice(0, m.index).split(/\r?\n/).length;
      report(file, line, 1, `#${m[1]}`, 'ancla sin destino en la página');
    }
  }
}

/* ---------- 5: enlaces internos ---------- */
function checkLinks(file, text) {
  for (const m of text.matchAll(/href="([^"]+)"/gi)) {
    const raw = m[1].trim();
    if (!raw || raw.startsWith('#') || /^(https?:|mailto:|tel:|javascript:|data:)/i.test(raw)) continue;
    const clean = raw.replace(/[?#].*$/, '');
    if (!clean) continue;
    const target = resolve(dirname(file), clean);
    if (!target.startsWith(ROOT)) continue;
    const ok =
      existsSync(target) ||
      existsSync(`${target}.html`) ||
      existsSync(join(target, 'index.html'));
    if (!ok) {
      const line = text.slice(0, m.index).split(/\r?\n/).length;
      report(file, line, 1, raw, 'enlace interno roto');
    }
  }
}

/* ---------- main ---------- */
const targets = process.argv.slice(2);
if (targets.length === 0) {
  console.error('Uso: node scripts/qc-idiomas.mjs <ruta-archivo-o-idioma> [más rutas...]');
  process.exit(2);
}

let files = [];
for (const t of targets) files.push(...collect(t));
files = [...new Set(files)];

for (const file of files) {
  const lang = langOf(file);
  const text = readFileSync(file, 'utf8');
  checkChars(file, lang, text);
  checkTags(file, text);
  checkJsonLd(file, text);
  checkAnchors(file, text);
  checkHreflang(file, text);
  checkLinks(file, text);
}

if (findings.length === 0) {
  console.log(`QC OK — ${files.length} archivo(s), 0 hallazgos.`);
  process.exit(0);
}
for (const f of findings) console.log(f);
console.log(`\nQC FALLIDO — ${files.length} archivo(s), ${findings.length} hallazgo(s).`);
process.exit(1);
