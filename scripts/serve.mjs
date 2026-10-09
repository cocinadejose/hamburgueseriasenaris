#!/usr/bin/env node
/**
 * serve.mjs — servidor estático de previsualización local.
 *
 * Imita las URLs limpias del .htaccess de producción:
 *     /es/menu            -> es/menu.html
 *     /es/blog/           -> es/blog/index.html
 *     /cartel.avif        -> cartel.avif
 *
 * Uso:
 *   node scripts/serve.mjs            # http://localhost:5173
 *   node scripts/serve.mjs 8080
 */

import { createServer } from 'node:http';
import { readFileSync, statSync, existsSync } from 'node:fs';
import { join, extname, normalize } from 'node:path';

const RAIZ = process.cwd();
const PUERTO = Number(process.argv[2]) || 5173;

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.mjs': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.xml': 'application/xml; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.avif': 'image/avif',
    '.webp': 'image/webp',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.mp4': 'video/mp4',
    '.pdf': 'application/pdf',
};

function esArchivo(ruta) {
    return existsSync(ruta) && statSync(ruta).isFile();
}

const servidor = createServer((peticion, respuesta) => {
    let ruta = decodeURIComponent((peticion.url || '/').split('?')[0]);
    ruta = normalize(ruta).replace(/^(\.\.[\\/])+/, '');

    const relativa = ruta.replace(/^[\\/]+/, '');
    const candidatas = [];

    if (ruta.endsWith('/') || ruta === '') {
        candidatas.push(join(RAIZ, relativa, 'index.html'));
    } else {
        candidatas.push(join(RAIZ, relativa));
        if (!extname(ruta)) candidatas.push(join(RAIZ, relativa + '.html'));
        candidatas.push(join(RAIZ, relativa, 'index.html'));
    }

    const encontrada = candidatas.find(esArchivo);

    if (!encontrada) {
        respuesta.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        respuesta.end(`<h1>404</h1><p>No encontrado: <code>${ruta}</code></p>`);
        console.log(`404  ${ruta}`);
        return;
    }

    const tipo = MIME[extname(encontrada).toLowerCase()] || 'application/octet-stream';
    respuesta.writeHead(200, { 'Content-Type': tipo, 'Cache-Control': 'no-store' });
    respuesta.end(readFileSync(encontrada));
    console.log(`200  ${ruta}`);
});

servidor.listen(PUERTO, () => {
    console.log(`\n  Servidor local: http://localhost:${PUERTO}`);
    console.log(`  Español        : http://localhost:${PUERTO}/es/\n`);
});
