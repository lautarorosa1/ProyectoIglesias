export function useScrollToId() {
  function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return { scrollToId };
}