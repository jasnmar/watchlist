const TMDB_BASE_URL = "https://api.themoviedb.org/3"
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN

const headers = {
  Authorization: `Bearer ${ACCESS_TOKEN}`,
  "Content-Type": "application/json",
}

export async function searchMovies(query) {
  if (!query) return []
  const response = await fetch(
    `${TMDB_BASE_URL}/search/multi?query=${encodeURIComponent(
      query
    )}&include_adult=false&language=en-US&page=1`,
    { headers }
  )
  const data = await response.json()
  return data.results || []
}

export async function getTrending() {
  const response = await fetch(
    `${TMDB_BASE_URL}/trending/all/week?language=en-US`,
    { headers }
  )
  const data = await response.json()
  return data.results || []
}

export function getImageUrl(path, size = "w500") {
  if (!path) return "https://via.placeholder.com/500x750?text=No+Image"
  return `https://image.tmdb.org/t/p/${size}${path}`
}
