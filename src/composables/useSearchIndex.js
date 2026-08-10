/**
 * Arma la lista combinada de items buscables (ciudades + iglesias)
 * para pasarle al SearchControl.
 *
 * No es reactivo a propósito: cities y churches son data estática
 * importada de archivos, no cambian en tiempo de ejecución.
 * Si en el futuro pasan a venir de una API, convertir a computed().
 *
 * @param {Array} cities
 * @param {Array} churches
 */
export function useSearchIndex(cities, churches) {
  const searchItems = [
    ...cities.map(city => ({
      type: "city",
      name: city.name,
      center: city.center,
      zoom: city.zoom
    })),

    ...churches.map(church => ({
      type: "church",
      name: church.nombre,
      center: [church.lng, church.lat],
      zoom: 15,
      church
    }))
  ];

  return searchItems;
}