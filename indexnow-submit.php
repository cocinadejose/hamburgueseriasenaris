<?php
/**
 * IndexNow - Notificación de URLs a buscadores (Bing, Yandex, Seznam, Naver, Yep…)
 * ACCESO RESTRINGIDO - Solo propietarios
 *
 * Uso por CLI:  php indexnow-submit.php
 * Uso por web:  https://hamburgueseriasenaris.com/indexnow-submit.php?token=senaris2026indexnow
 *
 * Modos (?modo=…):
 *   total   (por defecto) → TODA la web leída del sitemap.xml + extras
 *   ultima                → solo las URLs del último despliegue
 *
 * Simulación (no envía nada, solo lista lo que enviaría):
 *   php indexnow-submit.php --dry      |  ...?token=…&dry=1
 */

// =====================================================
// SEGURIDAD
// =====================================================
$secureToken = 'senaris2026indexnow';

if (php_sapi_name() !== 'cli') {
    if (!isset($_GET['token']) || $_GET['token'] !== $secureToken) {
        http_response_code(403);
        echo "❌ Acceso denegado. Añade ?token=senaris2026indexnow a la URL\n";
        exit;
    }
}

// =====================================================
// CONFIGURACIÓN INDEXNOW
// =====================================================
$apiKey      = '5c5f8a8f29df42e28af5c96d4fadfced';
$host        = 'hamburgueseriasenaris.com';
$base        = 'https://' . $host;
$keyLocation = $base . '/' . $apiKey . '.txt';
$endpoint    = 'https://api.indexnow.org/indexnow'; // reparte a Bing, Yandex, Seznam, Naver, Yep…
$tamanoLote  = 1000; // IndexNow admite hasta 10.000 URLs por petición

// =====================================================
// URLs DEL ÚLTIMO DESPLIEGUE (modo "ultima")
// 14 Nov 2026 · 28 URLs = 27 páginas HTML + sitemap.xml
// =====================================================
$urlsUltimaActualizacion = [
    // --- 1) Aeropuerto de Santiago · guía de transporte (9 idiomas) ---
    'https://hamburgueseriasenaris.com/es/blog/aeropuerto-santiago-cerrado-alternativas',
    'https://hamburgueseriasenaris.com/en/blog/santiago-airport-closed-alternatives',
    'https://hamburgueseriasenaris.com/fr/blog/aeroport-saint-jacques-ferme-alternatives',
    'https://hamburgueseriasenaris.com/de/blog/flughafen-santiago-geschlossen-alternativen',
    'https://hamburgueseriasenaris.com/it/blog/aeroporto-santiago-chiuso-alternative',
    'https://hamburgueseriasenaris.com/pt/blog/aeroporto-santiago-fechado-alternativas',
    'https://hamburgueseriasenaris.com/ja/blog/santiago-airport-closed-alternatives',
    'https://hamburgueseriasenaris.com/zh/blog/santiago-airport-closed-alternatives',
    'https://hamburgueseriasenaris.com/ko/blog/santiago-airport-closed-alternatives',
    // --- 2) Pulpo a la gallega / pulpo á feira (9 idiomas) ---
    'https://hamburgueseriasenaris.com/es/blog/pulpo-a-feira',
    'https://hamburgueseriasenaris.com/en/blog/galician-octopus-recipe',
    'https://hamburgueseriasenaris.com/fr/blog/poulpe-a-la-galicienne',
    'https://hamburgueseriasenaris.com/de/blog/galizischer-oktopus',
    'https://hamburgueseriasenaris.com/it/blog/polpo-alla-galiziana',
    'https://hamburgueseriasenaris.com/pt/blog/polvo-a-galega',
    'https://hamburgueseriasenaris.com/ja/blog/galician-octopus-recipe-jp',
    'https://hamburgueseriasenaris.com/zh/blog/galician-octopus-recipe-cn',
    'https://hamburgueseriasenaris.com/ko/blog/galician-octopus-recipe-kr',
    // --- 3) Índices /blog/ de los 9 idiomas ---
    'https://hamburgueseriasenaris.com/es/blog/',
    'https://hamburgueseriasenaris.com/en/blog/',
    'https://hamburgueseriasenaris.com/fr/blog/',
    'https://hamburgueseriasenaris.com/de/blog/',
    'https://hamburgueseriasenaris.com/it/blog/',
    'https://hamburgueseriasenaris.com/pt/blog/',
    'https://hamburgueseriasenaris.com/ja/blog/',
    'https://hamburgueseriasenaris.com/zh/blog/',
    'https://hamburgueseriasenaris.com/ko/blog/',
    // --- 4) Sitemap ---
    'https://hamburgueseriasenaris.com/sitemap.xml',
];

// =====================================================
// URLS EXTRA (páginas publicadas que aún no están en el sitemap)
// =====================================================
$urlsExtra = [
    'https://hamburgueseriasenaris.com/sitemap.xml',
    'https://hamburgueseriasenaris.com/es/blog/seminario-menor-santiago',
];

// =====================================================
// FUNCIÓN: leer TODAS las URLs del sitemap.xml
// (tanto <loc> como los hreflang de los 9 idiomas)
// =====================================================
function urlsDesdeSitemap($rutaSitemap, $base)
{
    if (!is_readable($rutaSitemap)) {
        return [];
    }

    $xml = file_get_contents($rutaSitemap);
    if ($xml === false || trim($xml) === '') {
        return [];
    }

    $encontradas = [];

    // <loc>https://…</loc>
    if (preg_match_all('#<loc>\s*(https://[^<\s]+)\s*</loc>#i', $xml, $m)) {
        $encontradas = array_merge($encontradas, $m[1]);
    }

    // <xhtml:link … href="https://…" />
    if (preg_match_all('#<xhtml:link[^>]*href="(https://[^"]+)"#i', $xml, $m2)) {
        $encontradas = array_merge($encontradas, $m2[1]);
    }

    // Limpieza: solo URLs del host correcto, sin duplicados, sin .html (canónicas)
    $limpias = [];
    foreach ($encontradas as $url) {
        $url = html_entity_decode(trim($url), ENT_QUOTES, 'UTF-8');
        $url = preg_replace('#\.html$#i', '', $url);

        if (strpos($url, $base) !== 0) {
            continue; // host ajeno, fuera
        }
        $limpias[$url] = true;
    }

    $limpias = array_keys($limpias);
    sort($limpias);

    return $limpias;
}

// =====================================================
// FUNCIÓN: Enviar un lote a IndexNow
// =====================================================
function enviarIndexNow($endpoint, $nombre, $urls, $host, $apiKey, $keyLocation)
{
    $jsonData = json_encode([
        'host' => $host,
        'key' => $apiKey,
        'keyLocation' => $keyLocation,
        'urlList' => array_values($urls),
    ]);

    $ch = curl_init($endpoint);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
    curl_setopt($ch, CURLOPT_TIMEOUT, 60);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json; charset=utf-8',
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    echo "--- $nombre ---\n";

    if ($curlError) {
        echo "  ❌ Error de cURL: $curlError\n\n";
        return false;
    }

    echo "  Código HTTP: $httpCode\n";
    echo "  Respuesta: " . ($response ?: '(vacía - esperado para 200/202)') . "\n";

    if ($httpCode === 200 || $httpCode === 202) {
        echo "  ✅ Enviado correctamente\n";
        echo "  📊 URLs enviadas: " . count($urls) . "\n";
        echo "  ⏱️ El buscador las procesará en las próximas horas.\n\n";
        return true;
    } elseif ($httpCode === 429) {
        echo "  ⚠️  Demasiadas peticiones. Espera unos minutos y reintenta.\n\n";
        return false;
    } else {
        echo "  ❌ Error HTTP $httpCode\n";
        echo "  Códigos válidos: 200 (OK) o 202 (Accepted)\n\n";
        return false;
    }
}

// =====================================================
// CONSTRUIR LA LISTA DE URLs SEGÚN EL MODO
// =====================================================
$modo = isset($_GET['modo']) ? strtolower($_GET['modo']) : 'total';

// Simulación: --dry (CLI) o ?dry=1 (web) → no envía nada
$soloSimular = isset($_GET['dry'])
    || (php_sapi_name() === 'cli' && isset($argv) && in_array('--dry', $argv, true));

echo "==============================================\n";
echo "INDEXNOW - HAMBURGUESERÍA SEÑARÍS\n";
echo "==============================================\n\n";

if ($modo === 'ultima') {
    $urls = $urlsUltimaActualizacion;
    echo "Modo: ULTIMA actualización (lista manual)\n";
} else {
    $urls = urlsDesdeSitemap(__DIR__ . '/sitemap.xml', $base);

    if (count($urls) < 10) {
        // Salvavidas: si el sitemap no se puede leer, enviamos la lista manual
        $urls = array_merge($urlsUltimaActualizacion, $urlsExtra);
        echo "Modo: TOTAL (⚠️  sitemap.xml no legible → uso la lista manual)\n";
    } else {
        $urls = array_merge($urls, $urlsExtra);
        echo "Modo: TODA LA WEB (leída de sitemap.xml + extras)\n";
    }
}

// Deduplicar y ordenar
$urls = array_values(array_unique($urls));
sort($urls);
$totalUrls = count($urls);

echo "URLs a enviar: $totalUrls\n";

// Aviso si no está subida la clave de IndexNow
if (!file_exists(__DIR__ . '/' . $apiKey . '.txt')) {
    echo "⚠️  Aviso: no encuentro la clave local {$apiKey}.txt (debe ser accesible en $keyLocation)\n";
}

echo "\n";

// =====================================================
// EJECUCIÓN
// =====================================================
$exito = true;
$lotes = array_chunk($urls, $tamanoLote);
$numLote = 1;

if ($soloSimular) {
    echo "🧪 SIMULACIÓN (dry-run): no se envía nada a IndexNow.\n";
    echo "  Primera URL: " . reset($urls) . "\n";
    echo "  Última URL:  " . end($urls) . "\n";
    echo "  Lotes de $tamanoLote → " . count($lotes) . " petición(es)\n";
    echo "\n==============================================\n";
    echo "🧪 Simulación completada: se enviarían $totalUrls URLs.\n";
    echo "==============================================\n";
    exit(0);
}

if (!function_exists('curl_init')) {
    die("❌ cURL no está instalado en este servidor. No se puede enviar.\n");
}

foreach ($lotes as $lote) {
    $etiqueta = count($lotes) > 1
        ? 'IndexNow General (Bing, Yandex, Seznam, Naver…) · lote ' . $numLote . '/' . count($lotes)
        : 'IndexNow General (Bing, Yandex, Seznam, Naver…)';

    if (!enviarIndexNow($endpoint, $etiqueta, $lote, $host, $apiKey, $keyLocation)) {
        $exito = false;
    }
    $numLote++;
}

echo "==============================================\n";
if ($exito) {
    echo "✅ Envío completado: $totalUrls URLs notificadas.\n";
} else {
    echo "⚠️  Algunos envíos tuvieron errores. Revisa los detalles arriba.\n";
}
echo "==============================================\n";
