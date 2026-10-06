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
// URLs ACTUALIZADAS - 2 Julio 2026
// Home (9 idiomas) + Menú Peregrino (9 idiomas) + Bocadillos Grupos (9 idiomas · NUEVO)
// Rediseño integral SEO · Schema.org · hreflang · OpenGraph
// =====================================================
$urlsActualizadas = [
    // Home pages - metas, H1, schema actualizados, ruido eliminado
    'https://hamburgueseriasenaris.com/es/',
    'https://hamburgueseriasenaris.com/en/',
    'https://hamburgueseriasenaris.com/fr/',
    'https://hamburgueseriasenaris.com/de/',
    'https://hamburgueseriasenaris.com/it/',
    'https://hamburgueseriasenaris.com/pt/',
    'https://hamburgueseriasenaris.com/ja/',
    'https://hamburgueseriasenaris.com/zh/',
    'https://hamburgueseriasenaris.com/ko/',
    // Pilgrim menu - reescritura completa en los 9 idiomas
    'https://hamburgueseriasenaris.com/es/pilgrim-menu',
    'https://hamburgueseriasenaris.com/en/pilgrim-menu',
    'https://hamburgueseriasenaris.com/fr/pilgrim-menu',
    'https://hamburgueseriasenaris.com/de/pilgrim-menu',
    'https://hamburgueseriasenaris.com/it/pilgrim-menu',
    'https://hamburgueseriasenaris.com/pt/pilgrim-menu',
    'https://hamburgueseriasenaris.com/ja/pilgrim-menu',
    'https://hamburgueseriasenaris.com/zh/pilgrim-menu',
    'https://hamburgueseriasenaris.com/ko/pilgrim-menu',
    // Bocadillos para grupos - NUEVA sección (9 idiomas)
    'https://hamburgueseriasenaris.com/es/bocadillos-grupos-santiago',
    'https://hamburgueseriasenaris.com/en/sandwiches-for-groups-santiago',
    'https://hamburgueseriasenaris.com/fr/sandwichs-pour-groupes-saint-jacques',
    'https://hamburgueseriasenaris.com/de/sandwiches-fur-gruppen-santiago',
    'https://hamburgueseriasenaris.com/it/panini-per-gruppi-santiago',
    'https://hamburgueseriasenaris.com/pt/sanduiches-para-grupos-santiago',
    'https://hamburgueseriasenaris.com/ja/group-sandwiches-santiago',
    'https://hamburgueseriasenaris.com/zh/group-sandwiches-santiago',
    'https://hamburgueseriasenaris.com/ko/group-sandwiches-santiago',
    // Sitemap - actualizado con nueva fecha lastmod
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
// Enviamos: 9 homes + 9 pilgrim-menu + 9 bocadillos + sitemap (28 URLs)
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
