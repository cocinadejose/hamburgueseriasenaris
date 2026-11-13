import re

def fix(path, h2_text):
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()
    # Buscar la línea del h2 sin indentar justo después de la caja amarilla de Alejandro
    pattern = r'(</div>\n\n)(<h2>' + re.escape(h2_text) + r'</h2>)'
    replacement = r'\1                \2'
    new_text, count = re.subn(pattern, replacement, text, count=1)
    if count:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_text)
        print(f'Indentación corregida: {path}')
    else:
        print(f'No se encontró línea a corregir en {path}')

fix(r'c:\Users\Lenovo\Desktop\barsusana\es\blog\aeropuerto-santiago-cerrado-alternativas.html', '🌍 Vuelos desde el Aeropuerto de Santiago-Rosalía de Castro (SCQ)')
fix(r'c:\Users\Lenovo\Desktop\barsusana\en\blog\santiago-airport-closed-alternatives.html', '🌍 Flights from Santiago-Rosalía de Castro Airport (SCQ)')
fix(r'c:\Users\Lenovo\Desktop\barsusana\fr\blog\aeroport-saint-jacques-ferme-alternatives.html', '🌍 Vols depuis l\'aéroport de Saint-Jacques-Rosalía de Castro (SCQ)')
