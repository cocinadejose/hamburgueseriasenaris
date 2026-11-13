import sys

def reorder(path, start_marker, end_marker, insert_marker):
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()
    start = text.find(start_marker)
    end = text.find(end_marker)
    if start == -1 or end == -1:
        print(f'No se encontraron marcadores en {path}')
        return
    flights_section = text[start:end]
    text_without_flights = text[:start] + text[end:]
    insert_pos = text_without_flights.find(insert_marker)
    if insert_pos == -1:
        print(f'No se encontró marcador de inserción en {path}')
        return
    new_text = text_without_flights[:insert_pos] + '\n\n' + flights_section + text_without_flights[insert_pos:]
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_text)
    print(f'Reordenado: {path}')

# Español
reorder(
    r'c:\Users\Lenovo\Desktop\barsusana\es\blog\aeropuerto-santiago-cerrado-alternativas.html',
    '<h2>🌍 Vuelos desde el Aeropuerto de Santiago-Rosalía de Castro (SCQ)</h2>',
    '<h2>❓ Preguntas frecuentes</h2>',
    '</div>\n\n                <h2>✈️ Aeropuertos alternativos para llegar a Santiago</h2>'
)

# Inglés
reorder(
    r'c:\Users\Lenovo\Desktop\barsusana\en\blog\santiago-airport-closed-alternatives.html',
    '<h2>🌍 Flights from Santiago-Rosalía de Castro Airport (SCQ)</h2>',
    '<h2>❓ Frequently asked questions</h2>',
    '</div>\n\n                <h2>✈️ Airports to reach Santiago</h2>'
)

# Francés
reorder(
    r'c:\Users\Lenovo\Desktop\barsusana\fr\blog\aeroport-saint-jacques-ferme-alternatives.html',
    '<h2>🌍 Vols depuis l\'aéroport de Saint-Jacques-Rosalía de Castro (SCQ)</h2>',
    '<h2>❓ Questions fréquentes</h2>',
    '</div>\n\n                <h2>✈️ Aéroports pour rejoindre Saint-Jacques</h2>'
)
