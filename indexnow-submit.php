<?php
/**
 * IndexNow - Notificación automática a buscadores (Bing, Yandex, etc.)
 * ACCESO RESTRINGIDO - Solo propietarios
 * Para usar: php indexnow-submit.php O https://hamburgueseriasenaris.com/indexnow-submit.php?token=TU_TOKEN_SECRETO
 */

// Token de seguridad
$secureToken = 'senaris2026indexnow';

// Verificar token si se ejecuta desde navegador
if (isset($_GET['token']) && $_GET['token'] !== $secureToken) {
    http_response_code(403);
    echo "❌ Acceso denegado. Token inválido.\n";
    exit;
}

if (php_sapi_name() !== 'cli' && !isset($_GET['token'])) {
    http_response_code(403);
    echo "❌ Acceso denegado. Añade ?token=senaris2026indexnow a la URL\n";
    exit;
}

// Verificar curl
if (!function_exists('curl_init')) {
    die("❌ cURL no está instalado en este servidor.\n");
}

$apiKey = '5c5f8a8f29df42e28af5c96d4fadfced';
$host = 'hamburgueseriasenaris.com';
$keyLocation = 'https://hamburgueseriasenaris.com/5c5f8a8f29df42e28af5c96d4fadfced.txt';

// =====================================================
// URLs ACTUALIZADAS - 9 Octubre 2026
// 51 URLs = 50 páginas HTML modificadas (50 archivos) + sitemap.xml
// ---------------------------------------------------------------------
// 1) FAMILIA A · Fiestas del Apóstol: 9 artículos con URL ATEMPORAL
//    (antes acababan en -2026; las viejas redirigen 301 desde .htaccess)
// 2) FAMILIA · Monte do Gozo: 9 artículos actualizados
// 3) Otros 23 artículos modificados (enlaces, hreflang, menús)
// 4) Índices /blog/ de los 9 idiomas
// 5) sitemap.xml (nuevas URLs + lastmod)
// =====================================================
$urlsActualizadas = [
    // --- 1) Familia A · Fiestas del Apóstol (URL atemporal, sin -2026) ---
    'https://hamburgueseriasenaris.com/es/blog/fiestas-apostol-santiago',
    'https://hamburgueseriasenaris.com/en/blog/apostle-santiago-festivals',
    'https://hamburgueseriasenaris.com/fr/blog/fetes-apotre-saint-jacques',
    'https://hamburgueseriasenaris.com/de/blog/apostel-jakobus-feste',
    'https://hamburgueseriasenaris.com/it/blog/feste-apostolo-giacomo',
    'https://hamburgueseriasenaris.com/pt/blog/festas-apostolo-santiago',
    'https://hamburgueseriasenaris.com/ja/blog/apostle-santiago-festivals',
    'https://hamburgueseriasenaris.com/zh/blog/apostle-santiago-festivals',
    'https://hamburgueseriasenaris.com/ko/blog/apostle-santiago-festivals',
    // --- 2) Familia Monte do Gozo (9 idiomas) ---
    'https://hamburgueseriasenaris.com/es/blog/conciertos-monte-do-gozo',
    'https://hamburgueseriasenaris.com/en/blog/concerts-monte-do-gozo',
    'https://hamburgueseriasenaris.com/fr/blog/concerts-monte-do-gozo',
    'https://hamburgueseriasenaris.com/de/blog/konzerte-monte-do-gozo',
    'https://hamburgueseriasenaris.com/it/blog/concerti-monte-do-gozo',
    'https://hamburgueseriasenaris.com/pt/blog/concertos-monte-do-gozo',
    'https://hamburgueseriasenaris.com/ja/blog/concerts-monte-do-gozo',
    'https://hamburgueseriasenaris.com/zh/blog/concerts-monte-do-gozo',
    'https://hamburgueseriasenaris.com/ko/blog/concerts-monte-do-gozo',
    // --- 3) Otros artículos modificados (enlazan a las dos familias) ---
    'https://hamburgueseriasenaris.com/es/blog/escapadas-playas-cerca-santiago',
    'https://hamburgueseriasenaris.com/es/blog/san-juan-galicia',
    'https://hamburgueseriasenaris.com/en/blog/saint-john-galicia',
    'https://hamburgueseriasenaris.com/en/blog/what-to-do-santiago-if-it-rains',
    'https://hamburgueseriasenaris.com/fr/blog/saint-jean-galice',
    'https://hamburgueseriasenaris.com/de/blog/johannistag-galizien',
    'https://hamburgueseriasenaris.com/de/blog/was-tun-santiago-wenn-es-regnet',
    'https://hamburgueseriasenaris.com/it/blog/san-giovanni-galizia',
    'https://hamburgueseriasenaris.com/pt/blog/escapadas-praias-perto-santiago',
    'https://hamburgueseriasenaris.com/pt/blog/sao-joao-galiza',
    'https://hamburgueseriasenaris.com/ja/blog/7-mistakes-tourists-santiago',
    'https://hamburgueseriasenaris.com/ja/blog/day-trips-beaches-near-santiago',
    'https://hamburgueseriasenaris.com/ja/blog/fair-price-burger-santiago',
    'https://hamburgueseriasenaris.com/ja/blog/galician-pinchos-traditional-bars',
    'https://hamburgueseriasenaris.com/ja/blog/heat-santiago-pilgrims',
    'https://hamburgueseriasenaris.com/ja/blog/saint-john-galicia',
    'https://hamburgueseriasenaris.com/ja/blog/santiago-pilgrims-museums-guide',
    'https://hamburgueseriasenaris.com/ja/camino/consejos/espanol',
    'https://hamburgueseriasenaris.com/ja/camino/oporto/porto-camino-guide',
    'https://hamburgueseriasenaris.com/zh/blog/day-trips-beaches-near-santiago',
    'https://hamburgueseriasenaris.com/zh/blog/saint-john-galicia',
    'https://hamburgueseriasenaris.com/ko/blog/day-trips-beaches-near-santiago',
    'https://hamburgueseriasenaris.com/ko/blog/saint-john-galicia',
    // --- 4) Índices /blog/ de los 9 idiomas ---
    'https://hamburgueseriasenaris.com/es/blog/',
    'https://hamburgueseriasenaris.com/en/blog/',
    'https://hamburgueseriasenaris.com/fr/blog/',
    'https://hamburgueseriasenaris.com/de/blog/',
    'https://hamburgueseriasenaris.com/it/blog/',
    'https://hamburgueseriasenaris.com/pt/blog/',
    'https://hamburgueseriasenaris.com/ja/blog/',
    'https://hamburgueseriasenaris.com/zh/blog/',
    'https://hamburgueseriasenaris.com/ko/blog/',
    // --- 5) Sitemap actualizado ---
    'https://hamburgueseriasenaris.com/sitemap.xml',
];



// =====================================================
// FUNCIÓN: Enviar a IndexNow
// =====================================================
function enviarIndexNow($endpoint, $nombre, $urls, $host, $apiKey, $keyLocation) {
    $jsonData = json_encode([
        'host' => $host,
        'key' => $apiKey,
        'keyLocation' => $keyLocation,
        'urlList' => $urls
    ]);

    $ch = curl_init($endpoint);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
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
        echo "  ⏱️ El buscador las procesará en las próximas horas.\n";
        return true;
    } elseif ($httpCode === 429) {
        echo "  ⚠️  Demasiadas peticiones. Espera unos minutos y reintenta.\n";
        return false;
    } else {
        echo "  ❌ Error HTTP $httpCode\n";
        echo "  Códigos válidos: 200 (OK) o 202 (Accepted)\n";
        return false;
    }
}

// =====================================================
// EJECUCIÓN
// =====================================================
echo "==============================================\n";
echo "INDEXNOW - HAMBURGUESERÍA SEÑARÍS\n";
echo "==============================================\n\n";

$exito = true;

// Envío GENERAL a api.indexnow.org (Bing, Yandex, etc.)
// Enviamos 51 URLs: 9 Familia A (atemporal) + 9 Monte do Gozo + 23 artículos + 9 índices /blog/ + sitemap
if (!enviarIndexNow(
    'https://api.indexnow.org/indexnow',
    'IndexNow General (Bing, Yandex, etc.)',
    $urlsActualizadas,
    $host, $apiKey, $keyLocation
)) {
    $exito = false;
}

echo "\n==============================================\n";
if ($exito) {
    echo "✅ Todos los envíos completados correctamente.\n";
} else {
    echo "⚠️  Algunos envíos tuvieron errores. Revisa los detalles arriba.\n";
}
echo "==============================================\n";
