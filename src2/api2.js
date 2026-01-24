const API_BASE = "https://plankton-app-xhkom.ondigitalocean.app/api";

async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`API error ${res.status} (${path})`);
  return res.json();
}

export async function getMovies() {
  const json = await apiGet("/movies");
  return json.data;
}

export async function getMovie(id) {
  const json = await apiGet(`/movies/${encodeURIComponent(id)}`);
  if (!json.data) return null;
  return { id: json.data.id, ...json.data.attributes };
}
