# 📹 Instrucciones para Subir el Video de los Fuegos Artificiales

## ✅ Lo que ya está hecho:

1. ✅ He creado la carpeta `videos/` en la raíz de tu sitio web
2. ✅ He añadido el código HTML al artículo de las Fiestas del Apóstol Santiago
3. ✅ El video se mostrará en una sección especial dentro de la parte de "Fiestas del Apóstol"

---

## 📁 Estructura de Archivos

Tu estructura debe quedar así:
```
barsusana/
├── videos/
│   └── fuegos-apostol-2025-traca-final.mp4  ← AQUÍ va tu video
├── imagenes/
│   └── fuegos-apostol-preview.avif  ← AQUÍ va la imagen de portada (opcional)
├── es/
│   └── blog/
│       └── fiestas-apostol-santiago.html  ← Ya actualizado
```

---

## 🎬 Pasos para Subir el Video

### Paso 1: Preparar el Video (IMPORTANTE)

Antes de subir el video, es muy recomendable optimizarlo para web:

**Opción A - Usar software gratuito (recomendado):**
1. Descarga **HandBrake** (gratuito): https://handbrake.fr/
2. Abre tu video MP4 en HandBrake
3. Selecciona preset: "Web" → "Gmail Medium 5 Minutes 720p30"
4. Ajusta estos parámetros:
   - Resolución: 1280x720 (HD) o 1920x1080 (Full HD)
   - Frame Rate: 30 fps
   - Quality: RF 22-24 (buen balance calidad/tamaño)
5. Guarda como: `fuegos-apostol-2025-traca-final.mp4`

**Tamaño recomendado:** 
- Menos de 50 MB: ✅ Perfecto
- 50-100 MB: ⚠️ Aceptable
- Más de 100 MB: ❌ Reducir calidad/duración

**Opción B - Usar online (más rápido pero menos control):**
- Cloudconvert.com
- Freeconvert.com

### Paso 2: Crear Imagen de Portada (Poster)

Una imagen de portada mejora mucho la presentación:

1. Abre el video y haz una captura del mejor momento
2. Guárdala como: `fuegos-apostol-preview.avif` o `.jpg`
3. Colócala en la carpeta `imagenes/`

Si no tienes herramienta para AVIF, puedes usar JPG y cambiar en el código:
```html
poster="../../imagenes/fuegos-apostol-preview.jpg"
```

### Paso 3: Subir los Archivos al Servidor

**Si usas FTP (FileZilla, etc.):**
1. Conéctate a tu servidor web
2. Navega a la carpeta raíz de `barsusana/`
3. Sube el video a: `/videos/fuegos-apostol-2025-traca-final.mp4`
4. Sube la imagen a: `/imagenes/fuegos-apostol-preview.avif` (o .jpg)

**Si usas cPanel:**
1. Entra en el Administrador de Archivos
2. Navega a `public_html/` (o donde tengas barsusana)
3. Crea la carpeta `videos/` si no existe
4. Sube el archivo de video ahí
5. Sube la imagen de portada en `imagenes/`

**Si usas tu herramienta de sincronización (FreeFileSync):**
1. Copia el video a: `c:\Users\Lenovo\Desktop\barsusana\videos\fuegos-apostol-2025-traca-final.mp4`
2. Copia la imagen a: `c:\Users\Lenovo\Desktop\barsusana\imagenes\fuegos-apostol-preview.avif`
3. Ejecuta la sincronización normal con tu .ffs_batch

---

## 🔍 Verificación

Una vez subido, verifica que funciona:

1. Abre: https://hamburgueseriasenaris.com/es/blog/fiestas-apostol-santiago
2. Busca la sección "Fiestas del Apóstol Santiago"
3. Desplázate hasta ver el reproductor de video
4. Haz clic en "Play" para verificar que funciona
5. Prueba en móvil también

---

## ⚠️ Solución de Problemas

**El video no se muestra:**
- Verifica que el nombre del archivo sea exacto: `fuegos-apostol-2025-traca-final.mp4`
- Verifica que esté en la carpeta correcta: `/videos/`
- Verifica los permisos del archivo (644 o 755)

**El video tarda mucho en cargar:**
- El video probablemente es demasiado grande
- Optimízalo con HandBrake siguiendo el Paso 1

**La imagen de portada no aparece:**
- No es crítico, el video funcionará igual
- Puedes omitirla o añadirla después

**El video no se reproduce en algunos navegadores:**
- Asegúrate de que el formato sea MP4 H.264
- Algunos navegadores antiguos no soportan ciertos codecs

---

## 📊 Alternativa: Usar YouTube (más fácil)

Si el video es muy grande o tienes problemas, puedes usar YouTube:

1. Sube el video a tu canal de YouTube (puede ser no listado)
2. Copia el código de embed
3. Avísame y te cambio el código HTML por el de YouTube

**Ventajas de YouTube:**
- No consume ancho de banda de tu servidor
- Se adapta automáticamente a la velocidad de internet
- Funciona en todos los dispositivos

**Desventajas:**
- Muestra publicidad (si tu cuenta no es premium)
- Muestra sugerencias de otros videos al final
- Menos control sobre la presentación

---

## 💡 Recomendación Final

Para un video de "solo la traca final", asumo que dura entre 1-3 minutos. Si es así:

✅ **Recomiendo hosting propio** (como está configurado ahora)
- Más profesional
- Sin publicidad
- Control total

Si el video dura más de 5 minutos o pesa más de 100 MB:
⚠️ **Considera YouTube** para mejor rendimiento

---

## 📝 Resumen Rápido

1. Optimiza el video con HandBrake (opcional pero recomendado)
2. Renómbralo a: `fuegos-apostol-2025-traca-final.mp4`
3. Súbelo a la carpeta: `/videos/`
4. Opcionalmente, crea y sube una imagen de portada
5. Verifica en: https://hamburgueseriasenaris.com/es/blog/fiestas-apostol-santiago

---

¿Necesitas ayuda con algún paso? Avísame y te guío más específicamente.
