import { useState, useEffect } from "react"
import { searchMovies, getTrending } from "../../lib/tmdb"
import MediaCard from "../MediaCard/MediaCard"
import "./MovieSearch.css"

export default function MovieSearch(props) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Load trending initially
    getTrending().then(setResults)
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    try {
      const data = await searchMovies(query)
      setResults(data)
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form className="movie-search" onSubmit={handleSearch}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies or TV shows..."
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {results.map((item) => (
          <MediaCard key={item.id} item={item} onAdd={props.onAdd} />
        ))}
      </div>
    </div>
  )
}
