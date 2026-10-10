# PLAN DE ACTUALIZACIÓN 2027 — Hamburguesería Señarís

> **LEER ESTE ARCHIVO PRIMERO** en cualquier chat de actualización. Contiene el estado real
> del sitio, la lista exacta de archivos a tocar y las normas obligatorias de trabajo.
> No hace falta releer artículos ya actualizados ni repetir el inventario.
>
> **Inventario revisado:** 9 de octubre de 2026. El sitio está en "modo 2026" y debe migrarse a **2027**.

---

## ▶️ PUNTO DE CONTINUACIÓN — si vienes de otro chat, lee solo esto

| Dato | Valor |
|---|---|
| **Familia en curso** | **B — Grandes Fiestas de Santiago: ✅ CERRADA** (9/9: `es`, `en`, `fr`, `de`, `it`, `pt`, `ja`, `zh`, `ko`) |
| **Siguiente archivo a tocar** | `es/blog/fiestas-gastronomicas-galicia.html` (arranca la **familia C — Fiestas Gastronómicas de Galicia**; patrón desde `es`) |
| **Ya cerrados** | **A** completa (9/9, URL atemporal). **B**: `es` = `ES-LISTO` (2026-10-10), `en` = `TRADUCIDO` (2026-10-10), `fr` = `TRADUCIDO` (2026-10-10), `de` = `TRADUCIDO` (2026-10-10), `it` = `TRADUCIDO` (2026-10-10), `pt` = `TRADUCIDO` (2026-10-10), `ja` = `TRADUCIDO` (2026-10-10), `zh` = `TRADUCIDO` (2026-10-10), `ko` = `TRADUCIDO` (2026-10-10) |
| **Pendientes de esta familia** | ninguna (B cerrada). Pendientes globales: **C, D, E** (27 archivos), **G** (9), **H** (9 + descargas), **I** (9), **J**, **K** |
| **Última sesión** | 2026-10-10 — familia B: `ja/blog/santiago-festivals.html`, `zh/blog/santiago-festivals.html` y `ko/blog/santiago-festivals.html` **traducidos** (adaptación a 2027 desde el `es`) + tarjetas de los índices `ja`, `zh` y `ko` actualizadas |
| **Nota de la sesión** | Los tres imitan la guía `es` y **no cubren** las Fiestas del Apóstol (enlazan a `apostle-santiago-festivals` para evitar canibalización): aviso visible (§4.2), índice, bloque variable de la Ascensión + caja «ℹ️» y teléfono del taxista Alejandro en Movilidad. El `ja` conserva la «nota especial japonesa» (hermano con escuela de cocina `cocinadejose.com`, habla japonés, julio–septiembre); el `ko` conserva su sección «한국 방문객을 위한 특별 메시지» (fe y fiesta, `.nota-coreanos`) y añade la línea «종교적 의미» en cada caja de fiesta; el `zh` va directo desde el `es` sin nota local. QC (§8): `ko` = 0 hallazgos; `ja` y `zh` solo con el falso positivo conocido (`한국어` del selector de idioma del nav, común a todos los archivos). |
| **Regla de oro** | Se traduce **siempre desde `es`**, nunca desde otra traducción |
| **Familias después de A** | B (cerrada) → C → D → E → G → H → I (ver §9) |

**Los 4 pasos de un chat nuevo:**
1. Lee **solo** este archivo (no reexplores el repo).
2. Abre el archivo que diga "Siguiente archivo a tocar".
3. Aplica §4 (patrón) + §6 (normas) + §11 (glosario); si el idioma es `ja`/`zh`/`ko`, además §8 (script QC).
4. Al cerrar **cada archivo** actualiza §3, §10 y **esta tabla**. Después entrega el relevo (§12).

> Regla de desempate: si esta tabla y §3 se contradicen, **manda esta tabla**, es lo último que se cerró.

---

## 0. Cómo usar este archivo (IA, próximos chats)
1. Lee solo este documento; no vuelvas a explorar el repo para ver qué falta.
2. Coge el archivo del **"PUNTO DE CONTINUACIÓN"** de arriba. Usa **siempre la versión `es` como guía**.
3. Sigue el flujo de la sección 7 y las normas de la sección 6, y consulta el glosario de §11.
4. **Al terminar cada archivo** (no al terminar la familia) actualiza, en este orden:
   - la tabla de estado de su familia en **§3**,
   - el **registro de §10** (una línea por archivo),
   - la tabla **"PUNTO DE CONTINUACIÓN"** de arriba (marca hechos y el siguiente),
   - la **matriz de §2** y el **glosario §11** si has fijado términos nuevos.
5. No edites con PowerShell (norma 6.2). Usa las herramientas del editor.
6. **Gestión del contexto:** si notas que el chat se queda sin espacio, **para en un archivo
   terminado** (nunca a medias), deja escritos el punto de continuación y el relevo (§12) y pide
   al usuario abrir un chat nuevo. Nunca entregues una traducción incompleta sin anotarlo.

## 1. Datos fijos
| Dato | Valor |
|---|---|
| Web | https://hamburgueseriasenaris.com |
| Negocio | Hamburguesería Señarís — Av. de Quiroga Palacios, 5, Santiago de Compostela — Tel. 881 08 25 71 |
| Idiomas (9) | `es`, `en`, `fr`, `de`, `it`, `pt`, `ja`, `zh`, `ko` |
| Autoría | **Susana** y **Antonio** (primera persona, voz de barrio) |
| Blog por idioma | `<idioma>/blog/` · Guía del peregrino en la raíz de cada idioma |

## 2. Estado global
- **HECHO (plantilla):** familia **F — Conciertos Monte do Gozo** (9/9 ya en 2027).
- **HECHO:** familia **A — Fiestas del Apóstol Santiago** (9/9 ya en 2027: `es` + 8 idiomas).
- **HECHO:** familia **B — Grandes Fiestas de Santiago** (9/9 ya en 2027: `es` = `ES-LISTO` 2026-10-10 + URL atemporal aplicada; `en`, `fr`, `de`, `it`, `pt`, `ja`, `zh`, `ko` traducidos).
- **PENDIENTE:** familias **C, D, E** (fiestas del blog) = 27 archivos.
- **PENDIENTE:** **G** tapas (9), **H** guía del peregrino (9 + descargas), **I** índices del blog (9), **J** secundarios, **K** PDFs.
- `sitemap.xml` y `index.html` de la raíz **no** contienen "2026" → sin cambios por año.
- **Total mínimo: 63 páginas HTML + PDFs + índices.**
- Estados: `PENDIENTE` · `ES-LISTO` · `TRADUCIDO` · `QC-OK` · `HECHO`.

### Matriz de avance (vista de pájaro — se actualiza al cerrar cada archivo)
Leyenda: `·` = `PENDIENTE` · `ES` = `ES-LISTO` (guía cerrada) · `TR` = `TRADUCIDO` · `QC` = `QC-OK`

| familia | es | en | fr | de | it | pt | ja | zh | ko |
|---|---|---|---|---|---|---|---|---|---|
| **F** — Conciertos Monte do Gozo | TR | TR | TR | TR | TR | TR | TR | TR | TR |
| **A** — Fiestas del Apóstol | ES | TR | TR | TR | TR | TR | TR | TR | TR |
| **B** — Grandes Fiestas de Santiago | ES | TR | TR | TR | TR | TR | QC | QC | QC |
| **C** — Fiestas Gastronómicas | · | · | · | · | · | · | · | · | · |
| **D** — Fiestas Culturales | · | · | · | · | · | · | · | · | · |
| **E** — San Juan / Noite Meiga | · | · | · | · | · | · | · | · | · |
| **G** — Rutas de Tapas | · | · | · | · | · | · | · | · | · |
| **H** — Guía del Peregrino | · | · | · | · | · | · | · | · | · |
| **I** — Índices del blog | · | · | · | · | · | · | · | · | · |

## 3. Inventario (rutas relativas a la raíz). Orden de idioma: es · en · fr · de · it · pt · ja · zh · ko

### F — Conciertos Monte do Gozo — ✅ `HECHO` (plantilla)
`es/blog/conciertos-monte-do-gozo.html` · `en|fr|ja|zh|ko/blog/concerts-monte-do-gozo.html` · `de/blog/konzerte-monte-do-gozo.html` · `it/blog/concerti-monte-do-gozo.html` · `pt/blog/concertos-monte-do-gozo.html`

### A — Fiestas del Apóstol Santiago (julio) — ✅ `HECHO` (9/9) · ⏱️ **URL ATEMPORAL (2026-10-09)**
> Las URLs ya **no llevan el año**: se renombraron los 9 archivos, se pusieron **redirecciones 301**
> (`.htaccess` §3b), se actualizó `sitemap.xml`, el `hreflang`/`canonical` interno y **todos los enlaces
> internos** de la web con `scripts/migrar-links-atemporales.mjs`. Copia de seguridad de los originales
> en `backup/familia-a-apostol-2026/`.
| idioma | archivo | estado |
|---|---|---|
| es | `es/blog/fiestas-apostol-santiago.html` | **ES-LISTO (2026-10-09)** |
| en | `en/blog/apostle-santiago-festivals.html` | **TRADUCIDO (2026-10-09)** |
| fr | `fr/blog/fetes-apotre-saint-jacques.html` | **TRADUCIDO (2026-10-09)** |
| de | `de/blog/apostel-jakobus-feste.html` | **TRADUCIDO (2026-10-09)** |
| it | `it/blog/feste-apostolo-giacomo.html` | **TRADUCIDO (2026-10-09)** |
| pt | `pt/blog/festas-apostolo-santiago.html` | **TRADUCIDO (2026-10-09)** |
| ja | `ja/blog/apostle-santiago-festivals.html` | **TRADUCIDO (2026-10-09)** |
| zh | `zh/blog/apostle-santiago-festivals.html` | **TRADUCIDO (2026-10-09)** |
| ko | `ko/blog/apostle-santiago-festivals.html` | **TRADUCIDO (2026-10-09)** |

> **Defecto heredado de los archivos asiáticos: RESUELTO.** `ja`, `zh` y `ko` arrastraban cierres
> `</span>` sin apertura con la forma `</span></td>` en las celdas de tabla (57 en `zh`, 58 en `ko`).
> Los tres están corregidos con el reemplazo global `</span></td>` → `</td>` y el QC de §8 da 0 hallazgos.

### B — Grandes Fiestas de Santiago de Compostela — 🟡 `ES-LISTO` (es) · ⏱️ **URL ATEMPORAL (2026-10-10)**
> Las URLs ya **no llevan el año**: se renombraron los 9 archivos, se pusieron **redirecciones 301**
> (`.htaccess` §3b), se actualizó `sitemap.xml`, el `hreflang`/`canonical` interno y **todos los enlaces
> internos** con `scripts/migrar-links-atemporales.mjs`. Copia de seguridad de los originales en
> `backup/familia-b-fiestas-2026/`. La guía `es` **no cubre** las Fiestas del Apóstol (evita
> canibalización): enlaza a la familia A.
| idioma | archivo | estado |
|---|---|---|
| es | `es/blog/fiestas-santiago.html` | **ES-LISTO (2026-10-10)** |
| en | `en/blog/santiago-festivals.html` | **TRADUCIDO (2026-10-10)** |
| fr | `fr/blog/fetes-saint-jacques.html` | **TRADUCIDO (2026-10-10)** |
| de | `de/blog/santiago-feste.html` | **TRADUCIDO (2026-10-10)** |
| it | `it/blog/feste-santiago.html` | **TRADUCIDO (2026-10-10)** |
| pt | `pt/blog/festas-santiago.html` | **TRADUCIDO (2026-10-10)** |
| ja | `ja/blog/santiago-festivals.html` | **TRADUCIDO (2026-10-10)** |
| zh | `zh/blog/santiago-festivals.html` | **TRADUCIDO (2026-10-10)** |
| ko | `ko/blog/santiago-festivals.html` | **TRADUCIDO (2026-10-10)** |

### C — Fiestas Gastronómicas de Galicia — `PENDIENTE` (9)
`es/blog/fiestas-gastronomicas-galicia.html` · `en|ja|zh|ko/blog/galician-gastronomic-festivals.html` · `fr/blog/fetes-gastronomiques-galice.html` · `de/blog/gastronomische-feste-galizien.html` · `it/blog/feste-gastronomiche-galizia.html` · `pt/blog/festas-gastronomicas-galiza.html`

### D — Fiestas Culturales de Galicia — `PENDIENTE` (9)
`es/blog/fiestas-culturales-galicia.html` · `en|ja|zh|ko/blog/galician-cultural-festivals.html` · `fr/blog/fetes-culturelles-galice.html` · `de/blog/kulturelle-feste-galizien.html` · `it/blog/feste-culturali-galizia.html` · `pt/blog/festas-culturais-galiza.html`

### E — San Juan / Noite Meiga — `PENDIENTE` (9)
`es/blog/san-juan-galicia.html` · `en|ja|zh|ko/blog/saint-john-galicia.html` · `fr/blog/saint-jean-galice.html` · `de/blog/johannistag-galizien.html` · `it/blog/san-giovanni-galizia.html` · `pt/blog/sao-joao-galiza.html`

### G — Rutas Gastronómicas de Tapas (Guía 2026) — `PENDIENTE` (9)
> Repite "**Año Santo 2026**". En 2027 el Año Santo es real → pasa a ser reclamo principal.
`es/blog/rutas-gastronomicas-tapas-galicia.html` · `en|ja|zh|ko/blog/galician-tapas-routes.html` · `fr/blog/routes-tapas-galice.html` · `de/blog/tapas-routen-galizien.html` · `it/blog/percorsi-tapas-galizia.html` · `pt/blog/rotas-tapas-galiza.html`

### H — Guía del Peregrino 2026 (raíz) — `PENDIENTE` (9 + descargas)
`es/guia-peregrino-2026.html` · `en/guia-peregrino-2026-en.html` · `fr/guia-peregrino-2026-fr.html` · `de/guia-peregrino-2026-de.html` · `it/guia-peregrino-2026-it.html` · `pt/guia-peregrino-2026-pt.html` · `ja/guia-peregrino-2026-ja.html` · `zh/guia-peregrino-2026-zh.html` · `ko/guia-peregrino-2026-ko.html`
> Lleva "2026" en `<title>`, `canonical`, `hreflang`, Open Graph, **pie de cada una de las ~35
> páginas internas**, "Edición Abril 2026" y precios orientativos. Descargas:
> `<idioma>/camino/consejos/guia-peregrino-descarga.html` (es, de; pt = `guia-peregrino-download.html`).

### I — Índices del blog — `PENDIENTE` (9)
`es|en|fr|de|it|pt|ja|zh|ko` + `/blog/index.html`. Actualizar **después** de fijar los títulos de A–E y G.

### J — Secundarios (año suelto en título/texto; revisar caso a caso)
| tema | es (guía) | equivalentes |
|---|---|---|
| Aeropuerto | `es/blog/aeropuerto-santiago-cerrado-alternativas.html` | `en|ja|zh|ko/blog/santiago-airport-closed-alternatives.html`, `fr/…/aeroport-saint-jacques-ferme-alternatives.html`, `de/…/flughafen-santiago-geschlossen-alternativen.html`, `it/…/aeroporto-santiago-chiuso-alternative.html`, `pt/…/aeroporto-santiago-fechado-alternativas.html` |
| Museos | `es/blog/que-hacer-santiago-peregrinos-museos-guia.html` | `en|ja|zh|ko/blog/santiago-pilgrims-museums-guide.html`, `fr/…/que-faire-santiago-pelerins-musees-guide.html`, `de/…/was-tun-santiago-pilger-museen-fuehrer.html`, `it/…/cosa-fare-santiago-pellegrini-musei-guida.html`, `pt/…/que-fazer-santiago-peregrinos-museus-guia.html` |
| Calor | `es/blog/calor-santiago-peregrinos.html` | `en|ja|zh|ko/blog/heat-santiago-pilgrims.html`, `fr/…/chaleur-santiago-pelerins.html`, `de/…/hitze-santiago-pilger.html`, `it/…/caldo-santiago-pellegrini.html`, `pt/…/calor-santiago-peregrinos.html` |
| Playas | `es/blog/escapadas-playas-cerca-santiago.html` | `en|ja|zh|ko/blog/day-trips-beaches-near-santiago.html`, `fr/…/escapades-plages-pres-santiago.html`, `de/…/ausfluege-straende-santiago.html`, `it/…/gite-spiagge-vicino-santiago.html`, `pt/…/escapadas-praias-perto-santiago.html` |
| Lluvia | `es/blog/que-hacer-santiago-si-llueve.html` | `en|ja|zh|ko/blog/santiago-rainy-day-guide.html`, `fr/…/que-faire-santiago-sil-pleut.html`, `de/…/was-tun-santiago-wenn-es-regnet.html`, `it/…/cosa-fare-santiago-se-piove.html`, `pt/…/o-que-fazer-santiago-se-chover.html` |
| Pinchos | `es/blog/pinchos-gallegos-bares-tradicionales.html` | `en|ja|zh|ko/blog/galician-pinchos-traditional-bars.html`, `fr/…/pinchos-galiciens-bars-traditionnels.html`, `de/…/galizische-pinchos-traditionelle-kneipen.html`, `it/…/pinchos-galiziani-bar-tradizionali.html`, `pt/…/pinchos-galegos-bares-tradicionais.html` |

### K — Assets con "2026" en el nombre (regenerar al cerrar cada familia)
- `imagenes/Fiestas_Galicia_2026.pdf`
- `imagenes/Galicia_Festivals_2026_{DE,EN,FR,IT,JA,KO,PT,ZH}.pdf`
- `imagenes/Galicia_Cultural_2026_{ES,EN,FR,DE,IT,PT,JA,ZH,KO}.pdf`
- `descargables/{de,en,es,fr,it,ja,ko,pt,zh}-guia-san-xoan-2026.pdf`
- `imagenes/camino/` — 9 guías del peregrino PDF con "2026" (incl. `巡礼者ガイド 2026…`, `朝圣者指南 2026…`, `순례자 가이드 2026…`)

## 4. Patrón de referencia (`conciertos-monte-do-gozo.html`)
Replicar en cada familia:
1. `<title>` y metadescripciones sin año caducado (o "2027" solo si aporta).
2. **Aviso visible** en `div.warning-box`: `🔔 Aviso de actualización (DD de mes de 2027): …`.
3. **Bloque variable** delimitado:
   `<!-- INICIO BLOQUE VARIABLE (ACTUALIZAR CADA AÑO) --> … <!-- FIN BLOQUE VARIABLE -->`.
4. **Event Schema retirado, no borrado**, con nota: `<!-- Event Schema: RETIRADOS tras celebrarse las ediciones 2026. Restaurar con fechas y cartel de 2027 … -->`.
5. **FAQ** actualizada ("¿cuándo son los próximos…?" → 2027).
6. `Última actualización` visible + `<time datetime="AAAA-MM-DD">` coherentes.
7. Nota de fuentes al pie con los sitios oficiales a consultar para 2027.

## 5. Fechas clave 2027 (orientativas — VERIFICAR en fuentes oficiales)
> ⚠️ **2027 es Año Santo Xacobeo** (25 julio cae en domingo). Reclamo central. El sitio dice
> "Año Santo 2026", que es incorrecto → corregir al migrar.

| Evento | 2026 (actual) | 2027 (orientativo) |
|---|---|---|
| Entroido / Carnaval | 14-18 feb | 5-9 feb |
| Semana Santa | 29 mar - 5 abr | 26-28 mar (Resurrección 28 mar) |
| Ascensión (Santiago) | 13-17 may | 6-10 may |
| Corpus Christi | — | 27 may |
| San Xoán / Noite Meiga | 23-24 jun | 23-24 jun |
| Arde Lucus (Lugo) | 18-21 jun | ~17-20 jun |
| Fiestas del Apóstol | 15-31 jul | 15-31 jul (25 jul domingo, Año Santo) |
| Rapa das Bestas | desde 3 jul | primer fin de semana de julio |
| Albariño (Cambados) | 4-6 ago | primer fin de semana de agosto |
| Desembarco Vikingo | 2 ago | primer domingo de agosto |
| San Roque (Santiago) | 14-17 ago | 14-17 ago |
| Pulpo (Carballiño) | 9-10 ago | segundo domingo de agosto |
| Marisco (O Grove) | 9-18 oct | primera quincena de octubre |
| Cocido de Lalín | 27 feb - 1 mar | último fin de semana de febrero |

**Regla:** no inventar fechas. Si no están confirmadas, usar "a la espera de anuncio de fechas
para 2027" (como en F) y completar el bloque variable cuando se publiquen.
## 6. NORMAS OBLIGATORIAS DE TRABAJO

### 6.1 Idioma guía
El **español es la versión guía**: se cierra y aprueba primero. Solo después se traduce a los 8
restantes. Nunca se traduce desde otra traducción.

### 6.2 Prohibido PowerShell para editar
PowerShell corrompe codificación (acentos, CJK). **Sí:** herramientas del editor (UTF-8 nativo).
**No:** `Set-Content`, `Out-File`, `-replace`, redirecciones `>`, `sed`, `Get-Content | …`.
Para comprobaciones se usa un script **Node.js** (sección 8), nunca PowerShell.

### 6.3 Voz auténtica (Susana y Antonio)
- Todo texto nuevo debe sonar a **primera persona de barrio**, como los artículos ya publicados:
  cercano, honesto, con opinión y experiencia real, sin lenguaje corporativo ni de folleto turístico.
- Firmas: **Susana** y **Antonio**. Mantener el narrador de cada artículo; no cambiar de autor.
- Las traducciones **no** deben ser literales: hay que reescribir la sección variable con la voz
  del idioma destino, conservando el tono, no la sintaxis.
- **No son calcos ni traducciones literales: son adaptaciones.** Cada idioma se escribe para
  **visitantes de ese país que hablan ese idioma**, no para un hispanohablante. Reglas:
  - **Reescribir, no transcribir:** frases naturales en el idioma destino, con su orden, sus
    modismos y su puntuación (comillas, guiones, formato de fecha y hora locales).
  - **Añadir el contexto que ese lector necesita** y quitar lo que no le aporta: distancias y
    cómo llegar desde su país o su ciudad de referencia, si el trayecto es largo o corto, época
    del año y clima, moneda, propinas, horarios de comida, si hace falta reservar, normas locales…
    Solo contexto **verificable o de sentido común**; nunca inventar datos ni cifras.
  - **Traducir la intención, no las palabras:** chistes, ironía y expresiones ("el día de
    Galicia", "a tope", "de barrio") se sustituyen por un equivalente que funcione en ese idioma.
  - **Unidades y nombres propios:** formato local donde exista forma consagrada del topónimo; el
    resto (`Botafumeiro`, `Monte do Gozo`, `Obradoiro`…) sin traducir, con una breve explicación
    la primera vez si el lector no lo conoce.
  - **Misma estructura, mismas URLs, mismos datos duros** (fechas, precios, teléfono, dirección,
    enlaces internos): lo que cambia es el texto que los explica.
  - **La voz se mantiene:** Susana y Antonio hablan en primera persona en todos los idiomas. Se
    adapta *cómo* se dice, nunca *quién* lo dice.
- No prometer lo que no se sabe (fechas sin confirmar → usar el patrón "a la espera de anuncio").

### 6.4 Control de calidad de idiomas asiáticos (obligatorio en `ja`, `zh`, `ko`)
Verificar con el script de la sección 8 y corregir cualquier hallazgo:
- **`ja` (japonés):** solo Hiragana `U+3040–309F`, Katakana `U+30A0–30FF`, Kanji, y puntuación
  fullwidth `U+3000–303F` / `U+FF00–FFEF`. **Prohibido:** Hangul `U+AC00–D7A3`, `U+1100–11FF`,
  `U+3130–318F`; y glifos exclusivos del chino simplificado (p. ej. `门 关 无 于 学 说 见 国`,
  salvo que coincidan con el shinjitai japonés).
- **`zh` (chino):** Han simplificado + puntuación fullwidth. **Prohibido:** Kana `U+3040–30FF` y Hangul `U+AC00–D7A3`.
- **`ko` (coreano):** Hangul `U+AC00–D7A3` (+ Jamo `U+1100–11FF`, `U+3130–318F`) y Hanja en
  forma **tradicional**. **Prohibido:** Kana; y variantes simplificadas del Han.
- **Todos los idiomas:** detectar mojibake (`Ã`, `Â`, `â€`, `ï»¿`), carácter de reemplazo `U+FFFD`,
  restos de otro idioma (p. ej. `¿ ¡ ñ` en ja/zh/ko, `ß` fuera de alemán, cirílico en cualquier archivo).
- ⚠️ **La detección de mojibake debe ser *case-sensitive*.** Si se busca sin distinguir mayúsculas,
  `Â` casa con la `â` legítima del francés/portugués (*grâce*, *pâte*, *câmara*) y genera falsos
  positivos en masa. Lo mismo con `Ã` / `ã`. Mojibake real = **secuencia** (`Ã©`, `Ã³`, `Â¿`), no letra suelta.
- Los caracteres deben estar en **forma normativa** (NFC) y sin artefactos de conversión.

### 6.5 Checklist SEO/estructura por archivo (no olvidar ninguno)
- `<title>`, `meta description`, `og:title`, `og:description`, `twitter:title`, `twitter:description`.
- `canonical` y `hreflang` correctos (9 idiomas + `x-default`).
- `article:modified_time` / `<time datetime>` y el texto visible de "Última actualización".
- JSON-LD: `Article`/`BlogPosting`, `FAQPage`, `BreadcrumbList`, `Event` (retirar/reactivar según F).
- Índice interno (`<ul class="indice-lista">`) y enlaces "anterior/siguiente" coherentes.
- Pie de página: `&copy; 2027 Hamburguesería Señarís` (hoy dice 2026 en todos los archivos).
- Precio/fechas/horarios: si cambian de año, actualizar también los números, no solo los textos.

### 6.6 Nombre de archivo y URLs
- **Familias A y B migradas a URLs atemporales** (A: 2026-10-09 · B: 2026-10-10): los 9 archivos de
  cada familia ya **no llevan año**. Al renombrar SIEMPRE hay que aplicar el protocolo completo: copia
  de seguridad + **301** en `.htaccess` + `sitemap.xml` + `hreflang`/`canonical` + migrar enlaces
  internos con `scripts/migrar-links-atemporales.mjs`.
- La familia **H** todavía lleva año en el nombre; **no renombrar** sin aplicar el mismo
  protocolo (301 + sitemap + enlaces) o se romperían enlaces, `hreflang` y SEO.
- El año se cambia **dentro** del contenido, nunca en la ruta (salvo la migración a atemporal descrita arriba).

## 7. Flujo de trabajo por familia
1. **Inventario cerrado:** marca la familia en la sección 3 como en curso.
2. **Español (guía):** aplica el patrón de la sección 4 sobre `<es>`; deja estado `ES-LISTO`.
3. **Aprueba el usuario** (no continuar sin OK de la versión `es`).
4. **Traducción** idioma a idioma, en este orden sugerido: `en, fr, de, it, pt` → luego `ja, zh, ko`.
   Cada traducción reescribe la sección variable con voz propia (norma 6.3).
5. **QC** (sección 8) por archivo; corrige y repite hasta 0 hallazgos.
6. **Índices** (`I`) de esos idiomas: actualizar títulos y "Publicado/Actualizado".
7. **Assets** (`K`) de esa familia si aplica.
8. Marca `HECHO` en la sección 3 y anota en el registro (sección 10).

## 8. Control de calidad — script Node (no PowerShell)
- Archivo: **`scripts/qc-idiomas.mjs`** — ✅ **creado el 2026-10-09** (chat del `ja`).
- Uso: `node scripts/qc-idiomas.mjs <ruta-archivo-o-idioma> [más rutas…]` (acepta un archivo o `ja zh ko`).
  Se puede pasar la familia entera de golpe, p. ej. los 9 archivos de A.
- Comprueba por idioma los rangos Unicode de 6.4, el mojibake (case-sensitive), `U+FFFD` y la forma NFC.
- Además: etiquetas HTML desbalanceadas (`div`, `span`, `td`, `tr`…), JSON-LD no parseable,
  `hreflang`/`canonical` recíprocos entre los 9 idiomas y enlaces internos no rotos.
- Salida: lista de `archivo:línea:columna: carácter: motivo`. Criterio de cierre: **0 hallazgos** (salida 0).
- Nombres propios exentos de la regla `ñ/í` en asiáticos: `Hamburguesería Señarís`, `Señarís`,
  `Periñán`, `Muiñeira` (lista `PROPER_NAMES` del script).
- Validado con 0 hallazgos en: `pt`, `ja`, `zh`, `ko` (familia A) y `es` (control).
- **Migración de URLs atemporales:** `scripts/migrar-links-atemporales.mjs` (✅ 2026-10-09) reescribe
  en todos los `.html` los enlaces y metadatos que apuntan a slugs con año. Uso:
  `node scripts/migrar-links-atemporales.mjs [--dry]`. Al migrar una familia nueva, añadir sus slugs
  al mapa `MAPA` del script y volver a ejecutarlo.

## 9. Decisiones pendientes (confirmar con el usuario)
- ¿Renombrar los archivos A/B/H para quitar "2026" de la URL, o conservarla?
  ✅ **A hecho (2026-10-09)** y ✅ **B hecho (2026-10-10)**: renombrado a URL atemporal con 301 + sitemap
  + enlaces internos (mismo protocolo con `scripts/migrar-links-atemporales.mjs`).
  **Pendiente decidir en H** (mismo protocolo).
- ¿Mantener el bloque variable de F como plantilla oficial para todo? (recomendado).
- ¿"Año Santo 2027" como reclamo principal en A, B, D y G? (recomendado; el sitio hoy dice 2026).
- Orden de familias a abordar: **A ✅ (cerrada el 2026-10-09) → B → C → D → E → G → H**.

## 11. Glosario de términos fijos (mantener el MISMO término en todo el sitio)
Se rellena a medida que cada idioma se traduce. **Regla:** quien traduce un idioma nuevo añade su
columna aquí antes de terminar, para que el siguiente chat no reinvente la terminología.
Columnas cerradas: `en` (2026-10-09) · `fr` (2026-10-09) · `de` (2026-10-09) · `it` (2026-10-09) · `pt` (2026-10-09) · `ja` (2026-10-09) · `zh` (2026-10-09) · `ko` (2026-10-09).
Ampliadas con la familia B (2026-10-10): `en`, `fr`, `de`, `it`, `pt`, `ja`, `zh`, `ko` (ver bloques «familia B» más abajo).

| término (`es`) | en | fr | de | it | pt | ja | zh | ko |
|---|---|---|---|---|---|---|---|---|
| Fiestas del Apóstol Santiago | Apostle Santiago Festivals | Fêtes de l'Apôtre Saint-Jacques | Apostel-Jakobus-Feste | Feste dell'Apostolo Giacomo | Festas do Apóstolo Santiago | サンティアゴ使徒祭 | 圣地亚哥使徒节 | 산티아고 사도 축제 |
| Año Santo Compostelano | Compostela Holy Year | Année sainte compostellane | Heiliges Compostelanisches Jahr | Anno Santo Compostelano | Ano Santo Compostelano | コンポステーラ聖年（アニョ・サント） | 孔波斯特拉圣年 | 콤포스텔라 성년 |
| Año Jubilar / Xacobeo | Jubilee Year / Xacobeo | Année jubilaire / Xacobeo | Jubiläumsjahr / Xacobeo | Anno Giubilare / Xacobeo | Ano Jubilar / Xacobeo | 聖年／シャコベオ | 禧年／哈科贝奥（Xacobeo） | 희년／샤코베오(Xacobeo) |
| Día de Galicia (25 julio) | Galicia Day | Jour de la Galice | Tag Galiziens | Giorno della Galizia | Dia da Galiza | ガリシアの日 | 加利西亚日 | 갈리시아의 날 |
| Ofrenda Nacional | National Offering | Offrande nationale | Nationaler Opfergang | Offerta Nazionale | Oferta Nacional | 国家的奉献式 | 国家奉献仪式 | 국가 봉헌식 |
| Concello de Santiago | Santiago City Council | Mairie de Saint-Jacques-de-Compostelle | Stadtverwaltung von Santiago de Compostela | Concello di Santiago de Compostela | Concello de Santiago de Compostela | サンティアゴ市（コンセーリョ） | 圣地亚哥市政厅 | 산티아고 시청(콘셀로) |
| Catedral de Santiago | Cathedral of Santiago | Cathédrale de Santiago (de Compostela) | Kathedrale von Santiago de Compostela | Cattedrale di Santiago de Compostela | Catedral de Santiago de Compostela | サンティアゴ大聖堂 | 圣地亚哥大教堂 | 산티아고 대성당 |
| Cabildo (de la Catedral) | Cathedral Chapter | Chapitre de la cathédrale | Kathedralkapitel | Capitolo della Cattedrale | Cabido da Catedral | 大聖堂参事会 | 大教堂牧师会 | 대성당 참사회 |
| Plaza del Obradoiro | Obradoiro Square | Plaza del Obradoiro *(sin traducir)* | Plaza del Obradoiro *(sin traducir)* | Plaza del Obradoiro *(sin traducir)* | Plaza del Obradoiro *(sin traducir)* | オブラドイロ広場 | 奥布拉多伊罗广场 | 플라사 델 오브라도이로 |
| Compostelano/a (gentilicio) | compostelano | Compostellan/e | Compostelaner/in | compostellano/a | compostelano/a | コンポステーラ人 | 孔波斯特拉人 | 콤포스텔라 사람 |
| Camino / pèlerinage | Camino / pilgrimage | Camino / pèlerinage | Jakobsweg / Pilgerfahrt | Cammino / pellegrinaggio | Caminho / peregrinação | 巡礼路（カミーノ）／巡礼 | 朝圣之路（卡米诺）／朝圣 | 카미노(순례길)／순례 |
| Botafumeiro | *sin traducir* | *sin traducir* | *sin traducir* | *sin traducir* | *sin traducir* | ボタフメイロ | 博塔富梅罗 | 보타푸메이로 |
| Monte do Gozo | *sin traducir* | *sin traducir* | *sin traducir* | *sin traducir* | *sin traducir* | モンテ・ド・ゴソ | 蒙特多戈索 | 몬테 도 고소 |
| Alameda / Quintana / Belvís | *sin traducir* | *sin traducir* | *sin traducir* | *sin traducir* | *sin traducir* | アラメダ／キンタナ／ベルビス | 阿拉梅达／金塔纳／贝尔维斯 | 알라메다／킨타나／벨비스 |
| Aviso de actualización | Update notice | Avis de mise à jour | Aktualisierungshinweis | Avviso di aggiornamento | Aviso de atualização | 更新のお知らせ | 更新提示 | 업데이트 안내 |
| Indulgencia plenaria | Plenary indulgence | Indulgence plénière | Vollkommener Ablass | Perdono plenario | Indulgência plenária | 全免償（ぜんめんしょう） | 全大赦 | 전대사 |
| Peregrino | pilgrim | pèlerin | Pilger | pellegrino | peregrino | 巡礼者 | 朝圣者 | 순례자 |
| A la espera de anuncio de fechas | pending announcement of dates | en attente de l'annonce des dates | in Erwartung der Terminankündigung | in attesa di annuncio delle date | a aguardar anúncio das datas | 公式発表待ち | 待官方公布 | 공식 발표 대기 중 |
| Hamburguesería Señarís | *sin traducir* | *sin traducir* | *sin traducir* | *sin traducir* | *sin traducir* | *sin traducir* | *sin traducir* | *sin traducir* |
| Susana / Antonio (autoría) | *sin adaptar* | *sin adaptar* | *sin adaptar* | *sin adaptar* | *sin adaptar* | スサナ／アントニオ *(sin adaptar)* | 苏珊娜／安东尼奥 *(sin adaptar)* | 수사나／안토니오 *(sin adaptar)* |

**Términos propios del `zh` (fijados al traducir la familia A):**
`Puerta Santa` = 圣门（Puerta Santa） · `Compostela (credencial)` = 孔波斯特拉朝圣证书 ·
`Concello publica el programa en primavera` = 圣地亚哥市政厅在春季公布节目 ·
`fuegos del Apóstol` = 使徒节烟花 · `programa oficial pendiente` = 官方节目待公布 ·
`peregrinación` = 朝圣 · `cabildo catedralicio` = 大教堂牧师会（se mantiene también 大教堂牧师会 en el resto del sitio）.

**Términos propios del `ko` (fijados al traducir la familia A):**
`Puerta Santa` = 성문(푸에르타 산타) · `credencial del peregrino` = 콤포스텔라 순례 증서 ·
`Concello publica el programa en primavera` = 산티아고 시청이 봄에 프로그램을 발표 ·
`fuegos del Apóstol` = 사도 축제 불꽃놀이 · `programa oficial pendiente` = 공식 프로그램 발표 대기 중 ·
`Año Santo` = 성년(희년) · `misa solemne y Ofrenda Nacional` = 엄숙 미사와 국가 봉헌식 ·
`Pregón de Fiestas` = 축제 선언식(프레곤).

**Términos propios del `en` (fijados al traducir la familia B):**
`Fiestas de la Ascensión` = Ascension Festivals · `Entroido` = Entroido (Carnival) ·
`Fiestas de San Roque` = San Roque Festivals · `Viernes de Dolores` = Friday of Sorrows ·
`verbena` = verbena · `Punto Lila` = "Punto Lila" (a staffed purple point offering help and support at festivals) ·
`Romaría das Flores` = Romaría das Flores · `Xenerais da Ulla` = Xenerais da Ulla ·
`orellas` = orellas (Carnival pastries) · `Feria Caballar` = Feria Caballar (livestock fair) ·
`Banquete de Conxo` = Banquete de Conxo · `Santiago (é) Tapas` = Santiago (é) Tapas ·
`fiestas del Apóstol (nombre corto)` = the Apostle festivals (el nombre completo es "Apostle Santiago Festivals").

**Términos propios del `fr` (fijados al traducir la familia B):**
`Fiestas de la Ascensión` = Fêtes de l'Ascension · `Entroido` = Entroido (Carnaval) ·
`Fiestas de San Roque` = Fêtes de San Roque · `Viernes de Dolores` = Vendredi des Douleurs ·
`verbena` = verbena · `Punto Lila` = « Punto Lila » (point violet : espace d'accueil et de soutien pendant les fêtes) ·
`Romaría das Flores` = Romaría das Flores · `Xenerais da Ulla` = Xenerais da Ulla ·
`orellas` = oreilles (orellas, pâtisseries de carnaval) · `Feria Caballar` = Feria Caballar (foire aux chevaux) ·
`Banquete de Conxo` = Fête du Banquet de Conxo · `Santiago (é) Tapas` = Santiago (é) Tapas ·
`cocido` = pot-au-feu · `fiestas del Apóstol (nombre corto)` = les fêtes de l'Apôtre.

**Términos propios del `de` (fijados al traducir la familia B):**
`Fiestas de la Ascensión` = Christi-Himmelfahrt-Feste · `Entroido` = Entroido (Karneval) ·
`Fiestas de San Roque` = San-Roque-Feste · `Viernes de Dolores` = Schmerzensfreitag ·
`verbena` = Verbena · `Punto Lila` = Punto Lila (violette Anlaufstelle: Raum für Betreuung und Unterstützung während der Feste) ·
`Romaría das Flores` = Romaría das Flores · `Xenerais da Ulla` = Xenerais da Ulla ·
`orellas` = Orellas (Karnevalsgebäck) · `Feria Caballar` = Feria Caballar (Pferdemarkt) ·
`Banquete de Conxo` = Fest des Banquets von Conxo · `Santiago (é) Tapas` = Santiago (é) Tapas ·
`cocido` = Cocido · `fiestas del Apóstol (nombre corto)` = die Apostelfeste.

**Términos propios del `it` (fijados al traducir la familia B):**
`Fiestas de la Ascensión` = Feste dell'Ascensione · `Entroido` = Entroido (Carnevale) ·
`Fiestas de San Roque` = Feste di San Roque · `Viernes de Dolores` = Venerdì dei Dolori ·
`verbena` = verbena · `Punto Lila` = Punto Lila (punto viola: spazio di accoglienza e supporto durante le feste) ·
`Romaría das Flores` = Romaría das Flores · `Xenerais da Ulla` = Xenerais da Ulla ·
`orellas` = orecchie (orellas, dolci di carnevale) · `Feria Caballar` = Feria Caballar (mercato dei cavalli) ·
`Banquete de Conxo` = Festa del Banchetto di Conxo · `Santiago (é) Tapas` = Santiago (é) Tapas ·
`cocido` = cocido · `fiestas del Apóstol (nombre corto)` = le feste dell'Apostolo.

**Términos propios del `pt` (fijados al traducir la familia B):**
`Fiestas de la Ascensión` = Festas da Ascensão · `Entroido` = Entroido (Carnaval) ·
`Fiestas de San Roque` = Festas de San Roque · `Viernes de Dolores` = Sexta-feira das Dores ·
`verbena` = verbena · `Punto Lila` = Punto Lila (ponto violeta: espaço de acolhimento e apoio durante as festas) ·
`Romaría das Flores` = Romaría das Flores · `Xenerais da Ulla` = Xenerais da Ulla ·
`orellas` = orelhas (doces de Entroido) · `Feria Caballar` = Feira Cabalar (mercado de cavalos) ·
`Banquete de Conxo` = Festa do Banquete de Conxo · `Santiago (é) Tapas` = Santiago (é) Tapas ·
`cocido` = cozido · `fiestas del Apóstol (nombre corto)` = as festas do Apóstolo.

**Términos propios del `ja` (fijados al traducir la familia B):**
`Fiestas de la Ascensión` = 昇天祭 · `Entroido` = エントロイド（カーニバル） · `Fiestas de San Roque` = サン・ロケ祭 ·
`Viernes de Dolores` = 悲しみの金曜日 · `verbena` = ベルベナ（野外ダンス） · `Punto Lila` = Punto Lila（プント・リラ：祭り期間中の相談・支援スペース）·
`Romaría das Flores` = ロマリーア・ダス・フローレス · `Xenerais da Ulla` = Xenerais da Ulla ·
`orellas` = オレハ（カーニバルの揚げ菓子） · `Feria Caballar` = アミオ馬市（Feria Caballar） ·
`Banquete de Conxo` = コンショ宴会祭 · `Santiago (é) Tapas` = Santiago (é) Tapas · `cocido` = コシード ·
`pulpo á feira` = プルポ・ア・フェイラ（フェリア風タコ） · `fiestas del Apóstol (nombre corto)` = 使徒祭.
Específico de `ja` (familia B): `nota especial japonesa` = 🇯🇵 日本からのお客様へ（日本語サポート、7月〜9月、cocinadejose.com）.

**Términos propios del `zh` (fijados al traducir la familia B):**
`Fiestas de la Ascensión` = 耶稣升天节 · `Entroido` = 狂欢节 · `Fiestas de San Roque` = 圣罗克节 ·
`Viernes de Dolores` = 圣周五（周五）／孤独圣母游行 · `verbena` = 露天舞会 · `Punto Lila` = 紫色点位（Punto Lila：节日期间的咨询与支援点）·
`Romaría das Flores` = 罗梅利亚花会 · `Xenerais da Ulla` = Xenerais da Ulla ·
`orellas` = 猪耳（狂欢节糕点） · `Feria Caballar` = 阿米奥马市（Feria Caballar） ·
`Banquete de Conxo` = 孔霍宴会节 · `Santiago (é) Tapas` = Santiago (é) Tapas · `cocido` = 炖菜 ·
`pulpo á feira` = 章鱼（pulpo á feira） · `fiestas del Apóstol (nombre corto)` = 使徒节.

**Términos propios del `ko` (fijados al traducir la familia B):**
`Fiestas de la Ascensión` = 승천 대축일 · `Entroido` = 엔트로이도(카니발) · `Fiestas de San Roque` = 산 로케 축제 ·
`Viernes de Dolores` = 슬픔의 금요일 · `verbena` = 베르베나(야외 댄스) · `Punto Lila` = 푼토 릴라(Punto Lila: 축제 기간 상담·지원 공간) ·
`Romaría das Flores` = 로마리아 다시 플로레스 · `Xenerais da Ulla` = Xenerais da Ulla ·
`orellas` = 돼지 귀(카니발 과자) · `Feria Caballar` = 아미오 말 시장(Feria Caballar) ·
`Banquete de Conxo` = 콘쇼 연회 축제 · `Santiago (é) Tapas` = Santiago (é) Tapas · `cocido` = 코시도 ·
`pulpo á feira` = 문어(뿔포 아 페이라) · `fiestas del Apóstol (nombre corto)` = 사도 축제 ·
`significado religioso (línea en cada caja de fiesta)` = 종교적 의미.
Específico de `ko` (familia B): `sección especial coreana` = 🇰🇷 한국 방문객을 위한 특별 메시지: 신앙과 축제의 만남 (clase `.nota-coreanos`).

**Términos propios del `ja` (fijados al traducir la familia A):**
`Compostela` = コンポステーラ · `peregrino del Camino` = 巡礼者 · `Puerta Santa` = 聖なる扉（プエルタ・サンタ） ·
`Compostela (credencial)` = コンポステーラ巡礼証明書 · `la Catedral publica los horarios` = 時間は大聖堂参事会が発表 ·
`Concello publica el programa en primavera` = サンティアゴ市（コンセーリョ）が春にプログラムを発表 ·
`fuego del Apóstol` = 使徒の花火／使徒祭りの花火 · `verbena` = ベルベナ（野外ダンス） · `tarta de Santiago` = タルタ・デ・サンティアゴ.

**Nunca se traducen:** el nombre del negocio (`Hamburguesería Señarís`), la dirección ni el
teléfono; los topónimos gallegos (`Botafumeiro`, `Monte do Gozo`, `Obradoiro`, `Alameda`,
`Belvís`, `Quintana`) salvo que la lengua destino tenga forma consagrada.

## 12. Relevo entre chats (protocolo)
**Motivo:** cada chat tiene una capacidad limitada. Se cambia de chat **entre archivos**, nunca a mitad.

**Al parar (el chat que se queda sin espacio) debe dejar:**
1. La tabla **"PUNTO DE CONTINUACIÓN"** de arriba apuntando al archivo exacto siguiente.
2. §3 y §10 actualizados hasta el último archivo terminado.
3. La columna del idioma en el glosario §11.
4. Un **relevo** con este formato, al final de la respuesta:

```
RELEVO
- Cerrado: <archivo> (<estado>)
- Siguiente: <archivo exacto>
- Pendientes de la familia: <lista de idiomas>
- Decisiones de esta sesión: <términos/traducciones fijadas, si hay>
- Recordatorio: traducir desde `es` (§6.1); QC obligatorio en ja/zh/ko (§8)
```

**Mensaje de arranque para el chat nuevo** (copiar tal cual):

```
Lee `ACTUALIZACION-2027.md` y continúa desde la tabla "PUNTO DE CONTINUACIÓN".
Trabaja solo el archivo que indica esa tabla, traduciendo desde la versión `es`.
Aplica §4 (patrón), §6 (normas), §6.3 (adaptación con contexto local, no calco) y §11 (glosario).
En los tres asiáticos (ja/zh/ko): §6.4 y el script de QC de §8 (ya creado: `scripts/qc-idiomas.mjs`), 0 hallazgos antes de cerrar.
Al cerrar el archivo actualiza §3, §10 y la tabla de continuación,
y dame el relevo (§12) con el siguiente archivo.
```

> Aviso para el chat de asiáticos: cada idioma va con **su propio contexto**, no solo traducido
> (qué le interesa a un lector japonés/chino/coreano que viene a Galicia, cómo se informa, qué
> espera encontrar). Mantener la voz de Susana y Antonio.

**Último relevo entregado (chat de las lenguas asiáticas de B, 2026-10-10):**
```
RELEVO
- Cerrado: ja/blog/santiago-festivals.html, zh/blog/santiago-festivals.html, ko/blog/santiago-festivals.html
  (TRADUCIDO) → los tres idiomas asiáticos de la familia B. **Familia B cerrada (9/9).**
- Cambios: adaptación a 2027 desde el `es` (no calco), aviso visible (§4.2), índice, bloque variable de la
  Ascensión + caja «ℹ️» (Punto Lila, Romaría das Flores, Feria Caballar), Event Schema 2026 retirados + nota,
  sección del Apóstol reducida a enlace a `apostle-santiago-festivals` (se retira el vídeo), taxista Alejandro
  en Movilidad (tel:+34685136343), enlace al Apóstol en el calendario de julio, años fuera de la navegación
  entre artículos. Contexto local (§6.3): el `ja` conserva la «nota especial japonesa» (hermano con escuela de
  cocina `cocinadejose.com`, habla japonés, julio–septiembre); el `ko` conserva su sección «한국 방문객을 위한
  특별 메시지» (fe y fiesta, clase `.nota-coreanos`) y añade la línea «종교적 의미» en cada caja de fiesta;
  el `zh` va directo desde el `es`, sin nota local propia.
- Índice: tarjetas de `ja/blog/index.html`, `zh/blog/index.html` y `ko/blog/index.html` actualizadas a 2027
- QC (`scripts/qc-idiomas.mjs`): `ko` = **0 hallazgos**; `ja` y `zh` limpios salvo el `한국어` del selector de
  idioma del nav generado (falso positivo común a TODOS los archivos, incluida la `es` aprobada)
- Siguiente: `es/blog/fiestas-gastronomicas-galicia.html` → arranca la **familia C — Fiestas Gastronómicas de Galicia**
- Pendientes: familias C, D, E (27 archivos), G (9), H (9 + descargas), I (9), J, K
- Decisiones: se mantienen las de `es`, `en`, `fr`, `de`, `it` y `pt` (la guía NO cubre el Apóstol; Ascensión 2027 =
  6-10 may; Entroido = 5-9 feb, 9 feb festivo; San Roque 14-17 ago; Event Schema 2026 retirados). Términos
  `ja`, `zh` y `ko` de B añadidos a §11. Pendiente global: el `&copy; 2026` del pie sigue en `partials/footer.html`
  (afecta a todos los idiomas, no se toca a mano).
```

## 10. Registro de cambios y avance
| fecha | familia | alcance | estado |
|---|---|---|---|
| 2026-10-06 | F | 9 idiomas | HECHO |
| 2026-10-09 | — | inventario y normas (este doc) | HECHO |
| 2026-10-09 | A | `es/blog/fiestas-apostol-santiago-2026.html` | ES-LISTO |
| 2026-10-09 | A | `en/blog/apostle-santiago-festivals-2026.html` | TRADUCIDO |
| 2026-10-09 | A | `fr/blog/fetes-apotre-saint-jacques-2026.html` | TRADUCIDO |
| 2026-10-09 | A | `de/blog/apostel-jakobus-feste-2026.html` | TRADUCIDO |
| 2026-10-09 | A | `it/blog/feste-apostolo-giacomo-2026.html` | TRADUCIDO |
| 2026-10-09 | — | norma 6.3 ampliada: adaptación con contexto local (no calco) | HECHO |
| 2026-10-09 | A | `pt/blog/festas-apostolo-santiago-2026.html` | TRADUCIDO |
| 2026-10-09 | A | `scripts/qc-idiomas.mjs` (script de QC de §8) | CREADO |
| 2026-10-09 | A | `ja/blog/apostle-santiago-festivals-2026.html` | TRADUCIDO |
| 2026-10-09 | A | `zh/blog/apostle-santiago-festivals-2026.html` | TRADUCIDO |
| 2026-10-09 | A | `ko/blog/apostle-santiago-festivals-2026.html` | TRADUCIDO |
| 2026-10-09 | A | **familia A cerrada: 9/9 en 2027** (QC 0 hallazgos en ja, zh, ko) | HECHO |
| 2026-10-09 | A | 9 archivos renombrados a **URL atemporal** (sin año) + copia en `backup/familia-a-apostol-2026/` | HECHO |
| 2026-10-09 | A | `.htaccess` (§3b): **redirecciones 301** de las 9 URLs antiguas a las nuevas | HECHO |
| 2026-10-09 | A | `sitemap.xml`: entrada antigua sustituida por la atemporal (loc + `hreflang`) | HECHO |
| 2026-10-09 | A | `scripts/migrar-links-atemporales.mjs`: **178 enlaces** migrados en 43 archivos | HECHO |
| 2026-10-10 | B | `es/blog/fiestas-santiago.html` (guía `es`; sin cubrir el Apóstol, enlaza a A) | ES-LISTO |
| 2026-10-10 | B | 9 archivos renombrados a **URL atemporal** (sin año) + copia en `backup/familia-b-fiestas-2026/` | HECHO |
| 2026-10-10 | B | `.htaccess` (§3b): **redirecciones 301** de las 9 URLs antiguas a las nuevas | HECHO |
| 2026-10-10 | B | `sitemap.xml`: entrada antigua sustituida por la atemporal (loc + `hreflang`) | HECHO |
| 2026-10-10 | B | `scripts/migrar-links-atemporales.mjs`: **216 enlaces** migrados en 65 archivos | HECHO |
| 2026-10-10 | B | `en/blog/santiago-festivals.html` (adaptación a 2027; Apóstol enlaza a A; taxista Alejandro) | TRADUCIDO |
| 2026-10-10 | B | `en/blog/index.html`: tarjeta del artículo actualizada a 2027 | HECHO |
| 2026-10-10 | B | `fr/blog/fetes-saint-jacques.html` (adaptación a 2027; Apóstol enlaza a A; taxista Alejandro) | TRADUCIDO |
| 2026-10-10 | B | `fr/blog/index.html`: tarjeta del artículo actualizada a 2027 | HECHO |
| 2026-10-10 | B | `de/blog/santiago-feste.html` (adaptación a 2027; Apóstol enlaza a A; taxista Alejandro) | TRADUCIDO |
| 2026-10-10 | B | `de/blog/index.html`: tarjeta del artículo actualizada a 2027 | HECHO |
| 2026-10-10 | B | `it/blog/feste-santiago.html` (adaptación a 2027; Apóstol enlaza a A; taxista Alejandro) | TRADUCIDO |
| 2026-10-10 | B | `it/blog/index.html`: tarjeta del artículo actualizada a 2027 | HECHO |
| 2026-10-10 | B | `pt/blog/festas-santiago.html` (adaptación a 2027; Apóstol enlaza a A; taxista Alejandro) | TRADUCIDO |
| 2026-10-10 | B | `pt/blog/index.html`: tarjeta del artículo actualizada a 2027 | HECHO |
| 2026-10-10 | B | `ja/blog/santiago-festivals.html` (adaptación a 2027; Apóstol enlaza a A; taxista Alejandro; nota especial japonesa) | TRADUCIDO |
| 2026-10-10 | B | `ja/blog/index.html`: tarjeta del artículo actualizada a 2027 | HECHO |
| 2026-10-10 | B | `zh/blog/santiago-festivals.html` (adaptación a 2027; Apóstol enlaza a A; taxista Alejandro) | TRADUCIDO |
| 2026-10-10 | B | `zh/blog/index.html`: tarjeta del artículo actualizada a 2027 | HECHO |
| 2026-10-10 | B | `ko/blog/santiago-festivals.html` (adaptación a 2027; Apóstol enlaza a A; taxista Alejandro; sección especial coreana «신앙과 축제의 만남») | TRADUCIDO |
| 2026-10-10 | B | `ko/blog/index.html`: tarjeta del artículo actualizada a 2027 | HECHO |
| 2026-10-10 | B | **familia B cerrada: 9/9 en 2027** (QC §8: `ko` 0 hallazgos; `ja`/`zh` solo el falso positivo conocido `한국어` del nav) | HECHO |
|  |  |  |  |

