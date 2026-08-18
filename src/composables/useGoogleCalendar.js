// src/composables/useGoogleCalendar.js
import { ref } from "vue";

const API_KEY = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY;
const CALENDAR_ID = import.meta.env.VITE_GOOGLE_CALENDAR_ID;

export function useGoogleCalendar(maxResults = 12) {
  const agenda = ref([]);
  const loading = ref(true);
  const error = ref(null);

  async function fetchAgenda() {
    loading.value = true;
    error.value = null;
    try {
      const timeMin = new Date().toISOString();
      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
        CALENDAR_ID
      )}/events?key=${API_KEY}&timeMin=${timeMin}&singleEvents=true&orderBy=startTime&maxResults=${maxResults}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Error al traer el calendario");
      const data = await res.json();

      agenda.value = (data.items || []).map((event) => ({
        tag: getRelativeTag(event.start),
        date: formatDate(event.start),
        title: event.summary || "Sin título",
        place: event.location || "A confirmar",
        description: event.description || "",
      }));
    } catch (e) {
      error.value = e.message;
      console.error("Error cargando agenda de Google Calendar:", e);
    } finally {
      loading.value = false;
    }
  }

  function getRelativeTag(start) {
    const raw = start.dateTime || start.date;
    const eventDate = new Date(raw);
    const now = new Date();

    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfEvent = new Date(
      eventDate.getFullYear(),
      eventDate.getMonth(),
      eventDate.getDate()
    );
    const diffDays = Math.round((startOfEvent - startOfToday) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "HOY";
    if (diffDays > 0 && diffDays <= 7) return "ESTA SEMANA";
    return "PRÓXIMAMENTE";
  }

  function formatDate(start) {
    const raw = start.dateTime || start.date;
    const d = new Date(raw);
    return d.toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
      ...(start.dateTime && { hour: "2-digit", minute: "2-digit" }),
    });
  }

  return { agenda, loading, error, fetchAgenda };
}