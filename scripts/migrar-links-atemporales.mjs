/**
 * migrar-links-atemporales.mjs
 * -----------------------------------------------------------------------------
 * Reescribe en TODA la web (archivos .html) los enlaces y metadatos que apuntan
 * a las URLs con año y los cambia por las nuevas URLs atemporales.
 *
 * Uso:
 *   node scripts/migrar-links-atemporales.mjs            -> aplica los cambios
 *   node scripts/migrar-links-atemporales.mjs --dry      -> solo informa (no escribe)
 *   node scripts/migrar-links-atemporales.mjs es/blog     -> limita la búsqueda a rutas
 *
 * No usa PowerShell (norma §6.2): lee y escribe en UTF-8 nativo y NO altera
 * codificación, BOM ni saltos de línea (solo sustituye las cadenas del mapa).
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, relative } from 'node:path';

// ---------------------------------------------------------------------------
// MAPA de migración: slug antiguo (con año) -> slug nuevo (atemporal)
// Añadir aquí las familias futuras (B, H…) cuando se migren.
// ---------------------------------------------------------------------------
const MAPA = {
  // Familia A — Fiestas del Apóstol (migrada 2026-10-09)
  'fiestas-apostol-santiago-2026': 'fiestas-apostol-santiago',
  'apostle-santiago-festivals-2026': 'apostle-santiago-festivals',
  'fetes-apotre-saint-jacques-2026': 'fetes-apotre-saint-jacques',
  'apostel-jakobus-feste-2026': 'apostel-jakobus-feste',
  'feste-apostolo-giacomo-2026': 'feste-apostolo-giacomo',
  'festas-apostolo-santiago-2026': 'festas-apostolo-santiago',
  // Familia B — Grandes Fiestas de Santiago (migrada 2026-10-10)
  'fiestas-santiago-2026': 'fiestas-santiago',
  'santiago-festivals-2026': 'santiago-festivals',
  'fetes-saint-jacques-2026': 'fetes-saint-jacques',
  'santiago-feste-2026': 'santiago-feste',
  'feste-santiago-2026': 'feste-santiago',
  'festas-santiago-2026': 'festas-santiago',
};

const RAIZ = process.cwd();
const IGNORAR = new Set(['.git', 'node_modules', 'backup', 'videos', '.vscode']);
const args = process.argv.slice(2);
const DRY = args.includes('--dry');
const rutas = args.filter((a) => !a.startsWith('--'));

// Regex única (evita dobles sustituciones). Claves largas primero.
const claves = Object.keys(MAPA).sort((a, b) => b.length - a.length);
const escapar = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const REGEX = new RegExp(claves.map(escapar).join('|'), 'g');

function* archivosHtml(dir) {
  for (const entrada of readdirSync(dir)) {
    if (IGNORAR.has(entrada)) continue;
    const ruta = join(dir, entrada);
    const st = statSync(ruta);
    if (st.isDirectory()) {
      yield* archivosHtml(ruta);
    } else if (extname(entrada).toLowerCase() === '.html') {
      yield ruta;
    }
  }
}

const objetivos = [];
for (const r of rutas.length ? rutas : ['.']) {
  const abs = join(RAIZ, r);
  const st = statSync(abs);
  if (st.isDirectory()) objetivos.push(...archivosHtml(abs));
  else if (extname(abs).toLowerCase() === '.html') objetivos.push(abs);
}

let archivosTocados = 0;
let totalCambios = 0;
const resumen = new Map();

for (const archivo of objetivos) {
  const original = readFileSync(archivo, 'utf8');
  const conteoLocal = new Map();
  const nuevo = original.replace(REGEX, (match) => {
    const destino = MAPA[match];
    conteoLocal.set(match, (conteoLocal.get(match) || 0) + 1);
    resumen.set(match, (resumen.get(match) || 0) + 1);
    return destino;
  });

  if (nuevo !== original) {
    const rel = relative(RAIZ, archivo).replace(/\\/g, '/');
    archivosTocados++;
    let n = 0;
    for (const c of conteoLocal.values()) n += c;
    totalCambios += n;
    console.log(`  ${DRY ? '[dry] ' : ''}${rel}  (${n} cambios)`);
    if (!DRY) writeFileSync(archivo, nuevo, 'utf8');
  }
}

console.log('\n--- Resumen por slug ---');
for (const [de, a] of Object.entries(MAPA)) {
  console.log(`  ${resumen.get(de) || 0} x  ${de}  ->  ${a}`);
}
console.log(`\n${DRY ? '(dry-run) ' : ''}Archivos modificados: ${archivosTocados} | Total sustituciones: ${totalCambios}`);
