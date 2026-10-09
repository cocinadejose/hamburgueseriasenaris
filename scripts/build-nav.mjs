#!/usr/bin/env node
/**
 * build-nav.mjs — propaga partials/nav.html y partials/footer.html a todas las
 * páginas que contengan los marcadores:
 *
 *     <!-- NAV:START -->    ...    <!-- NAV:END -->
 *     <!-- FOOTER:START --> ...    <!-- FOOTER:END -->
 *
 * Sólo reescribe el contenido ENTRE los marcadores: el resto del archivo
 * (title, canonical, hreflang, JSON-LD, contenido) no se toca.
 *
 * Uso:
 *   node scripts/build-nav.mjs                # aplica a todo el sitio
 *   node scripts/build-nav.mjs --dry          # muestra qué cambiaría, sin escribir
 *   node scripts/build-nav.mjs es en          # sólo esos idiomas
 *   node scripts/build-nav.mjs --year=2027    # fija el año del copyright
 *   node scripts/build-nav.mjs --help
 */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const RAIZ = process.cwd();
const DIR_PARTIALS = join(RAIZ, 'partials');

const IDIOMAS = ['es', 'en', 'fr', 'de', 'it', 'pt', 'ja', 'zh', 'ko'];

/** Etiquetas nativas del selector de idioma (no se traducen). */
const BANDERAS = [
    ['es', '🇪🇸', 'Español'],
    ['en', '🇬🇧', 'English'],
    ['fr', '🇫🇷', 'Français'],
    ['pt', '🇵🇹', 'Português'],
    ['de', '🇩🇪', 'Deutsch'],
    ['it', '🇮🇹', 'Italiano'],
    ['ja', '🇯🇵', '日本語'],
    ['zh', '🇨🇳', '中文'],
    ['ko', '🇰🇷', '한국어'],
];

/** Carpetas que nunca deben recorrerse. */
const IGNORADAS = new Set([
    '.git', '.vscode', '.idea', 'node_modules', 'backup', 'partials',
    'scripts', 'css', 'js', 'imagenes', 'videos', 'descargables', 'fonts',
]);

const BLOQUES = [
    { nombre: 'NAV', archivo: 'nav.html' },
    { nombre: 'FOOTER', archivo: 'footer.html' },
];

/* ------------------------------------------------------------------ */
/* Argumentos                                                          */
/* ------------------------------------------------------------------ */

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
    console.log(readFileSync(new URL(import.meta.url), 'utf8').split('*/')[0].replace(/^\s*\/\*\*?/, ''));
    process.exit(0);
}

const DRY = args.includes('--dry');
const anioArg = args.find((a) => a.startsWith('--year='));
const ANIO = anioArg ? anioArg.slice('--year='.length) : String(new Date().getFullYear());
const soloIdiomas = args.filter((a) => !a.startsWith('--') && !a.startsWith('-'));

/* ------------------------------------------------------------------ */
/* Carga                                                                 */
/* ------------------------------------------------------------------ */

const plantillas = {};
for (const { nombre, archivo } of BLOQUES) {
    plantillas[nombre] = readFileSync(join(DIR_PARTIALS, archivo), 'utf8');
}

const textos = JSON.parse(readFileSync(join(DIR_PARTIALS, 'i18n.json'), 'utf8'));
const faltantes = new Set();

/* ------------------------------------------------------------------ */
/* Render                                                                */
/* ------------------------------------------------------------------ */

function render(plantilla, idioma) {
    const t = textos[idioma] || {};

    const lista = BANDERAS
        .map(([code, flag, nombre]) =>
            `                    <li><a href="/${code}/"${code === idioma ? ' class="active"' : ''}>${flag} ${nombre}</a></li>`)
        .join('\n');

    return plantilla
        .replace(/\{\{LANG_LIST\}\}/g, lista)
        .replace(/\{\{LANG\}\}/g, idioma)
        .replace(/\{\{YEAR\}\}/g, ANIO)
        .replace(/\{\{T:([A-Za-z_]+)\}\}/g, (m, clave) => {
            if (t[clave] === undefined) {
                faltantes.add(`${idioma}:${clave}`);
                return m;
            }
            return t[clave];
        });
}

/* ------------------------------------------------------------------ */
/* Recorrido de archivos                                                 */
/* ------------------------------------------------------------------ */

function listarHtml(dir, acc = []) {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
        if (e.isDirectory()) {
            if (e.name.startsWith('.') || IGNORADAS.has(e.name)) continue;
            listarHtml(join(dir, e.name), acc);
        } else if (e.isFile() && e.name.endsWith('.html')) {
            acc.push(join(dir, e.name));
        }
    }
    return acc;
}

/* ------------------------------------------------------------------ */
/* Principal                                                             */
/* ------------------------------------------------------------------ */

const cambios = [];
let sinMarcadores = 0;
let fueraDeIdioma = 0;

for (const archivo of listarHtml(RAIZ)) {
    const rel = relative(RAIZ, archivo).split(sep).join('/');
    const idioma = rel.split('/')[0];

    if (!IDIOMAS.includes(idioma)) { fueraDeIdioma++; continue; }
    if (soloIdiomas.length && !soloIdiomas.includes(idioma)) continue;

    const original = readFileSync(archivo, 'utf8');
    let nuevo = original;
    const bloques = [];

    for (const { nombre } of BLOQUES) {
        const patron = new RegExp(`<!-- ${nombre}:START -->[\\s\\S]*?<!-- ${nombre}:END -->`);
        if (!patron.test(nuevo)) continue;

        const contenido = `<!-- ${nombre}:START -->\n${render(plantillas[nombre], idioma)}\n<!-- ${nombre}:END -->`;
        nuevo = nuevo.replace(patron, () => contenido);
        bloques.push(nombre);
    }

    if (!bloques.length) { sinMarcadores++; continue; }

    const cambio = nuevo !== original;
    cambios.push({ rel, bloques, cambio });

    if (cambio && !DRY) writeFileSync(archivo, nuevo, 'utf8');
}

/* ------------------------------------------------------------------ */
/* Resumen                                                               */
/* ------------------------------------------------------------------ */

console.log(`\n${DRY ? '🔍 SIMULACIÓN (--dry), no se ha escrito nada' : '✅ APLICADO'}`);
console.log(`   Año del copyright: ${ANIO}`);

for (const { rel, bloques, cambio } of cambios) {
    console.log(`   ${cambio ? '•' : '='} ${rel}  [${bloques.join(' + ')}]${cambio ? '' : '  (ya al día)'}`);
}

console.log(`\n   Páginas con marcadores : ${cambios.length}`);
console.log(`   Modificadas            : ${cambios.filter((c) => c.cambio).length}`);
console.log(`   Sin marcadores (saltan): ${sinMarcadores}`);
console.log(`   Fuera de los 9 idiomas : ${fueraDeIdioma}`);

if (faltantes.size) {
    console.log(`\n⚠️  Claves sin traducir en partials/i18n.json: ${[...faltantes].join(', ')}`);
}

if (DRY) console.log('\n   Ejecuta sin --dry para escribir los cambios.\n');
