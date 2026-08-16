/**
 * diocesis.data.js
 * ------------------------------------------------------------
 * Datos editables del HOME de la Diócesis de San Francisco.
 * Todo lo marcado con "EJEMPLO" es un placeholder: reemplazar
 * por información real antes de publicar. No se inventó ningún
 * dato oficial (nombres, fechas históricas, cifras) — son solo
 * valores de muestra para poder maquetar la interfaz.
 * ------------------------------------------------------------
 */

// 4. "Una Diócesis, muchas comunidades" — estadísticas animadas
export const diocesisStats = [
  { key: "parroquias", label: "Parroquias", value: 24 },      // EJEMPLO
  { key: "iglesias", label: "Iglesias", value: 68 },          // EJEMPLO
  { key: "comunidades", label: "Comunidades", value: 112 },   // EJEMPLO
  { key: "localidades", label: "Localidades", value: 35 },    // EJEMPLO
];

// 3. "Hoy en nuestra Iglesia" — agenda de ejemplo
// Reemplazar por datos reales o conectar a una API/CMS más adelante.
export const diocesisAgenda = [
  {
    tag: "HOY",
    date: "Sábado 15 de agosto",              // EJEMPLO
    title: "Misa vespertina",                  // EJEMPLO
    place: "Catedral San Francisco",            // EJEMPLO
    description: "Celebración eucarística abierta a toda la comunidad.", // EJEMPLO
  },
  {
    tag: "ESTA SEMANA",
    date: "Jueves 20 de agosto",                // EJEMPLO
    title: "Encuentro de catequistas",           // EJEMPLO
    place: "Salón parroquial Santa Rita",        // EJEMPLO
    description: "Jornada de formación para catequistas de la zona.", // EJEMPLO
  },
  {
    tag: "PRÓXIMAMENTE",
    date: "6 de septiembre",                    // EJEMPLO
    title: "Peregrinación diocesana",            // EJEMPLO
    place: "Santuario Nuestra Señora del Valle", // EJEMPLO
    description: "Caminata comunitaria con misa de cierre.", // EJEMPLO
  },
];

// 5. "Conocé nuestra historia" — timeline
// EJEMPLO: reemplazar por hitos históricos reales de la Diócesis.
export const diocesisTimeline = [
  { year: "19XX", title: "Erección de la Diócesis", description: "Creación canónica de la Diócesis de San Francisco. (Dato de ejemplo, reemplazar por fecha real.)" },
  { year: "19XX", title: "Primer Obispo", description: "Toma de posesión del primer obispo diocesano. (Dato de ejemplo.)" },
  { year: "19XX", title: "Fundación de nuevas parroquias", description: "Expansión de la Diócesis a nuevas localidades. (Dato de ejemplo.)" },
  { year: "20XX", title: "Renovación pastoral", description: "Nuevas líneas de acción comunitaria y evangelización. (Dato de ejemplo.)" },
];

// 6. "Un mensaje del Obispo"
// No se inventó nombre ni información personal: completar con datos reales.
export const bishopMessage = {
  name: "Mons. [Nombre Apellido]", // PLACEHOLDER — completar con el nombre real
  role: "Obispo de la Diócesis de San Francisco", // PLACEHOLDER si el cargo difiere
  photo: "/images/obispo-placeholder.jpg", // PLACEHOLDER — reemplazar por foto real
  message:
    "Queridos hermanos y hermanas: este espacio está pensado para acompañarnos como comunidad, " +
    "para caminar juntos y seguir construyendo una Iglesia cercana a cada familia. " +
    "(Mensaje de ejemplo — reemplazar por el mensaje real del Obispo.)",
};

// 2. "Una Diócesis en movimiento"
export const movementConcepts = [
  { key: "celebramos", title: "Celebramos", description: "La fe se vive en comunidad, en cada Eucaristía y celebración." },
  { key: "compartimos", title: "Compartimos", description: "Caminamos junto a las comunidades, compartiendo historia y fe." },
  { key: "servimos", title: "Servimos", description: "El servicio a los demás como expresión concreta del Evangelio." },
  { key: "crecemos", title: "Crecemos", description: "Formación, catequesis y pastoral que acompañan cada etapa." },
];

// 7. "¿Qué estás buscando?"
// "to" son rutas tentativas: ajustar a las rutas reales del proyecto.
export const lookingForCards = [
  { key: "participar", emoji: "🙏", title: "Quiero participar", description: "Sumate a grupos, catequesis y actividades parroquiales.", to: "/participar" },
  { key: "agenda", emoji: "📅", title: "Quiero saber qué hay", description: "Misas, encuentros y celebraciones de la Diócesis.", to: "/agenda" },
  { key: "comunidad", emoji: "⛪", title: "Quiero conocer una comunidad", description: "Explorá parroquias, iglesias y capillas en el mapa.", to: "/mapa" },
  { key: "contacto", emoji: "💬", title: "Quiero contactarme", description: "Escribinos y te ponemos en contacto con tu comunidad.", to: "/contacto" },
];