#!/usr/bin/env node
/**
 * migrar-nav-html.mjs — mete los marcadores NAV/FOOTER en todas las páginas
 * para que `scripts/build-nav.mjs` las rellene con partials/nav.html y
 * partials/footer.html, y añade la hoja de estilos de la barra.
 *
 *   node scripts/migrar-nav-html.mjs --survey   # inventario, no escribe
 *   node scripts/migrar-nav-html.mjs --audit    # compara con git HEAD, no escribe
 *   node scripts/migrar-nav-html.mjs --dry      # simulación
 *   node scripts/migrar-nav-html.mjs            # aplica
 *   node scripts/migrar-nav-html.mjs es ja      # sólo esos idiomas
 *
 * IMPORTANTE: el `<footer class="footer">` de algunas páginas aparece también
 * dentro de una cadena de JavaScript, y `<nav class="navbar">` puede repetirse
 * en plantillas. Por eso el localizador exige que la etiqueta esté al principio
 * de una línea Y fuera de cualquier bloque <script>…</script>. Sin esa doble
 * condición el recorte se come código.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { execFileSync } from 'node:child_process';

const RAIZ = process.cwd();
const IDIOMAS = ['es', 'en', 'fr', 'de', 'it', 'pt', 'ja', 'zh', 'ko'];
const IGNORADAS = new Set(['.git', '.vscode', '.idea', 'node_modules', 'backup',
    'partials', 'scripts', 'css', 'js', 'imagenes', 'videos', 'descargables', 'fonts']);

const args = process.argv.slice(2);
const SURVEY = args.includes('--survey');
const AUDIT = args.includes('--audit');
const DRY = args.includes('--dry') || SURVEY || AUDIT;
const soloIdiomas = args.filter((a) => !a.startsWith('-'));

const HOJA = '/css/style-portada.css';
const LINK = `<link rel="stylesheet" href="${HOJA}">`;

function listarHtml(dir, acc = []) {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
        if (e.isDirectory()) {
            if (e.name.startsWith('.') || IGNORADAS.has(e.name)) continue;
            listarHtml(join(dir, e.name), acc);
        } else if (e.isFile() && e.name.endsWith('.html')) acc.push(join(dir, e.name));
    }
    return acc;
}

/** ¿La posición `idx` cae dentro de un <script>…</script>? */
function dentroDeScript(texto, idx) {
    const trozo = texto.slice(0, idx);
    const abre = (trozo.match(/<script\b/gi) || []).length;
    const cierra = (trozo.match(/<\/script\s*>/gi) || []).length;
    return abre > cierra;
}

/**
 * Localiza la etiqueta real de apertura: principio de línea (sólo espacios
 * delante) y fuera de un <script>. Devuelve {ini, fin} del bloque completo.
 */
function bloqueReal(texto, etiqueta, cierre) {
    const re = new RegExp(`^([ \\t]*)${etiqueta}`, 'gm');
    let m;
    while ((m = re.exec(texto))) {
        if (dentroDeScript(texto, m.index)) continue;
        const fin = texto.indexOf(cierre, m.index + m[0].length);
        if (fin === -1) continue;
        return { ini: m.index, fin: fin + cierre.length, sangria: m[1] };
    }
    return null;
}

/**
 * Transformación completa y determinista: a partir de un HTML sin marcadores
 * devuelve el HTML con los marcadores y la hoja enlazada.
 */
function migrar(html) {
    const eol = html.includes('\r\n') ? '\r\n' : '\n';
    let out = html;
    const hechos = [];

    const nav = bloqueReal(out, '<nav class="navbar', '</nav>');

    if (nav) {
        const t = out.slice(nav.ini, nav.fin);
        const sangria = (t.match(/^[ \t]*/) || [''])[0];
        out = out.slice(0, nav.ini) + `<!-- NAV:START -->${eol}${sangria}<!-- NAV:END -->` + out.slice(nav.fin);
        hechos.push('nav');
    } else {
        const m = /<body[^>]*>/i.exec(out);
        if (m) {
            const pos = m.index + m[0].length;
            out = out.slice(0, pos) + `${eol}<!-- NAV:START -->${eol}<!-- NAV:END -->` + out.slice(pos);
            hechos.push('nav*');
        } else hechos.push('nav!');
    }

    // El footer se localiza DESPUÉS de tocar el nav: sustituir el nav desplaza
    // las posiciones del resto del documento, y con índices calculados antes el
    // recorte del footer se come ~960 caracteres de código.
    const foot = bloqueReal(out, '<footer class="footer', '</footer>');

    if (foot) {
        const t = out.slice(foot.ini, foot.fin);
        const sangria = (t.match(/^[ \t]*/) || [''])[0];
        out = out.slice(0, foot.ini) + `<!-- FOOTER:START -->${eol}${sangria}<!-- FOOTER:END -->` + out.slice(foot.fin);
        hechos.push('footer');
    } else {
        const pos = out.lastIndexOf('</body>');
        if (pos !== -1) {
            const sangria = (out.slice(0, pos).match(/[ \t]*$/) || [''])[0];
            out = out.slice(0, pos) + `<!-- FOOTER:START -->${eol}${sangria}<!-- FOOTER:END -->${eol}${sangria}` + out.slice(pos);
            hechos.push('footer*');
        } else hechos.push('footer!');
    }

    if (!out.includes(HOJA)) {
        out = out.replace(/<\/head>/i, (m) => `${LINK}${eol}${m}`);
        hechos.push('hoja');
    }

    if (!nav && out.includes('margin: 0; padding: 20px; }')) {
        out = out.replace('margin: 0; padding: 20px; }', 'margin: 0; padding: 0; padding-top: var(--p-nav-h); }');
        hechos.push('padding');
    }

    return { html: out, hechos };
}

const conteo = (s, re) => (s.match(re) || []).length;
/** Elimina por completo las regiones de marcadores, con su sangría y su salto
 *  de línea, para poder comparar el resto del documento. */
const quitarMarcadores = (s) =>
    s.replace(/^[ \t]*<!-- (?:NAV|FOOTER):START -->[\s\S]*?<!-- (?:NAV|FOOTER):END -->[ \t]*\r?\n/gm, '');

/** Clave de comparación: sin marcadores y con finales de línea unificados
 *  (git entrega CRLF en Windows y los archivos del disco pueden ser LF). */
const clave = (s) => quitarMarcadores(s).replace(/\r\n/g, '\n');

/* --- Diagnóstico: primera diferencia de un archivo concreto --- */
if (args.includes('--diff1')) {
    const rel = args[args.indexOf('--diff1') + 1];
    const base = execFileSync('git', ['show', `HEAD:${rel}`], { encoding: 'utf8', maxBuffer: 1 << 28 });
    const esp = clave(migrar(base).html);
    const act = clave(readFileSync(join(RAIZ, rel), 'utf8'));
    let i = 0;
    while (i < esp.length && i < act.length && esp[i] === act[i]) i++;
    const ctx = (s) => s.slice(Math.max(0, i - 90), i + 90).replace(/\r/g, '⏎').replace(/\n/g, '⏎\n');
    console.log(`\n--- ${rel} ---`);
    console.log(`longitudes: esperado ${esp.length} / actual ${act.length}`);
    console.log(`\nESPERADO:\n${ctx(esp)}\n\nACTUAL:\n${ctx(act)}\n`);
    process.exit(0);
}

const filas = [];
const resumen = { ok: 0, reparar: 0, avisos: [] };

for (const archivo of listarHtml(RAIZ)) {
    const rel = relative(RAIZ, archivo).split(sep).join('/');
    const idioma = rel.split('/')[0];
    if (!IDIOMAS.includes(idioma)) continue;
    if (soloIdiomas.length && !soloIdiomas.includes(idioma)) continue;

    const actual = readFileSync(archivo, 'utf8');

    /* --- AUDITORÍA: ¿coincide lo que hay con lo que debería haber? --- */
    if (AUDIT) {
        // La portada ya estaba migrada a mano antes de este script: su versión
        // de HEAD es la portada antigua, así que compararla no aporta nada.
        if (rel === 'es/index.html') { resumen.avisos.push(`${rel} (portada, se salta)`); continue; }
        let base;
        try {
            base = execFileSync('git', ['show', `HEAD:${rel}`], { encoding: 'utf8', maxBuffer: 1 << 28 });
        } catch { resumen.avisos.push(`${rel} (no está en HEAD)`); continue; }
        if (base.includes('p-nav')) { resumen.avisos.push(`${rel} (ya rediseñada, se salta)`); continue; }
        let esperado;
        try { esperado = migrar(base).html; } catch (e) { resumen.avisos.push(`${rel} (${e.message})`); continue; }
        if (clave(esperado) === clave(actual)) { resumen.ok++; continue; }
        resumen.reparar++;
        const ds = conteo(actual, /<\/script\s*>/gi) - conteo(base, /<\/script\s*>/gi);
        const da = conteo(actual, /<script\b/gi) - conteo(base, /<script\b/gi);
        filas.push([rel, `${da >= 0 ? '+' : ''}${da}/</script> ${ds >= 0 ? '+' : ''}${ds}`]);
        if (args.includes('--reparar')) writeFileSync(archivo, esperado, 'utf8');
        continue;
    }

    /* --- MIGRACIÓN --- */
    if (actual.includes('<!-- NAV:START -->')) continue;   // ya migrado
    const { html: nuevo, hechos } = migrar(actual);
    if (nuevo !== actual) {
        filas.push([rel, hechos.join(' + ')]);
        if (!DRY) writeFileSync(archivo, nuevo, 'utf8');
    }
}

if (AUDIT) {
    console.log('\n=== AUDITORÍA (lo que hay frente a lo que debería haber) ===');
    console.log(`   Correctas           : ${resumen.ok}`);
    console.log(`   A reparar           : ${resumen.reparar}`);
    filas.slice(0, 30).forEach(([rel, d]) => console.log(`      ${rel}   [${d}]`));
    if (filas.length > 30) console.log(`      … y ${filas.length - 30} más`);
    if (resumen.avisos.length) {
        console.log(`   Avisos: ${resumen.avisos.length}`);
        resumen.avisos.slice(0, 10).forEach((a) => console.log(`      ${a}`));
    }
    console.log('\n');
    process.exit(0);
}

console.log(`\n${DRY ? '🔍 SIMULACIÓN' : '✅ APLICADO'}`);
filas.slice(0, 20).forEach(([rel, h]) => console.log(`   • ${rel}  [${h}]`));
if (filas.length > 20) console.log(`   … y ${filas.length - 20} más`);
console.log(`\n   Páginas modificadas: ${filas.length}\n`);
