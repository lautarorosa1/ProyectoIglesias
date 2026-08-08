export const churches = [
  {
    id: 1,
    nombre: "Catedral San Francisco",
    tipo: "principal",
    lat: -31.435663529416704,
    lng: -62.08633446608387,
    descripcion: "Iglesia principal de la ciudad."
  },
  {
    id: 2,
    nombre: "Parroquia San Carlos Borromeo",
    tipo: "secundaria",
    parentId: 1,
    lat: -31.418771396676345,
    lng: -62.09537633830756,
    descripcion: "Parroquia del barrio."
  },
  {
    id: 3,
    nombre: "Capilla Nuestra Señora",
    tipo: "secundaria",
    parentId: 1,
    lat: -31.42169860713344,
    lng: -62.106801179634886,
    descripcion: "Capilla histórica."
  }
]