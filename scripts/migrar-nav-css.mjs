#!/usr/bin/env node
/**
 * migrar-nav-css.mjs — desata los estilos de nav/footer de `body.portada`
 * para que sirvan también en las páginas interiores.
 *   node scripts/migrar-nav-css.mjs [--dry]
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DRY = process.argv.includes('--dry');
const RUTA = join(process.cwd(), 'css', 'style-portada.css');
const original = readFileSync(RUTA, 'utf8');
let css = original;

const cambios = [];

/* 1. El estado "menú abierto" pasa de `.is-open` (lo pone el JS de la portada)
      a `:has(.nav-links.active)`, que también activa el JS de las interiores. */
const reIsOpen = /body\.portada \.p-nav\.is-open/g;
cambios.push(['is-open → :has(.active)', (css.match(reIsOpen) || []).length]);
css = css.replace(reIsOpen, 'body .p-nav:has(.nav-links.active)');

/* 2. El resto de la nav, el footer, la marca y la hamburguesa: `body.portada X`
      → `body X`. Mantiene la ventaja de especificidad sobre style-index.css. */
const rePrefijo = /body\.portada (\.p-(?:nav|footer|brand)\b|\.menu-toggle\b)/g;
cambios.push(['body.portada .p-* → body .p-*', (css.match(rePrefijo) || []).length]);
css = css.replace(rePrefijo, 'body $1');

/* 3. Barra sólida en las interiores (no hay hero debajo de la que tirar). */
const ANCLA = 'body .p-nav:has(.nav-links.active) {';
if (!css.includes('BARRA EN PÁGINAS INTERIORES') && css.includes(ANCLA)) {
    const bloque = [
        '',
        '/* ==========================================================================',
        '   BARRA EN PÁGINAS INTERIORES',
        '   La portada lleva la barra translúcida sobre el hero y la solidifica al',
        '   desplazar (clase .is-scrolled, que añade su JavaScript). Las interiores no',
        '   tienen hero debajo: la muestran siempre sólida y con texto oscuro, sin',
        '   necesitar JavaScript adicional.',
        '   ========================================================================== */',
        '',
        'body:not(.portada) .p-nav {',
        '    background: rgba(255, 255, 255, .94);',
        '    border-bottom: 1px solid var(--p-line);',
        '    box-shadow: var(--p-shadow-sm);',
        '}',
        '',
        'body:not(.portada) .p-nav .p-brand-text { color: var(--p-ink); }',
        'body:not(.portada) .p-nav .p-brand img { box-shadow: 0 0 0 2px rgba(201, 48, 44, .28); }',
        'body:not(.portada) .p-nav .menu-toggle span { background-color: var(--p-ink); }',
        'body:not(.portada) .p-nav .nav-links a { color: var(--p-ink-soft); }',
        'body:not(.portada) .p-nav .nav-links a:hover { background: rgba(201, 48, 44, .09); color: var(--p-brand); }',
        'body:not(.portada) .p-nav .nav-links a.p-link-accent { color: var(--p-brand); }',
        'body:not(.portada) .p-nav .nav-links a.p-link-gold { color: #a3782f; }',
        'body:not(.portada) .p-nav .nav-lang-dropdown #langDropdownBtn { color: var(--p-ink-soft); }',
        'body:not(.portada) .p-nav .nav-lang-dropdown #langDropdownBtn:hover { background: rgba(201, 48, 44, .09); color: var(--p-brand); }',
        '',
    ].join('\n');
    css = css.replace(ANCLA, bloque + ANCLA);
    cambios.push(['bloque body:not(.portada)', 1]);
}

for (const [nombre, n] of cambios) console.log(`   ${n ? '•' : '='} ${nombre}: ${n}`);

if (css === original) {
    console.log('\n   Ya estaba migrado, no se escribe nada.\n');
    process.exit(0);
}
if (DRY) {
    console.log('\n🔍 SIMULACIÓN (--dry): no se ha escrito css/style-portada.css\n');
    process.exit(0);
}
writeFileSync(RUTA, css, 'utf8');
console.log('\n✅ css/style-portada.css actualizado\n');
