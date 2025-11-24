import { useState } from "react"
import { getImageUrl } from "../../lib/tmdb"
import "./MediaCard.css"

export default function MediaCard({ item, onAdd, showAddButton = true }) {
  const [added, setAdded] = useState(false)
  const title = item.title || item.name
  const date = item.release_date || item.first_air_date
  const year = date ? new Date(date).getFullYear() : "N/A"

  const handleAdd = async () => {
    if (onAdd) {
      await onAdd(item)
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    }
  }

  return (
    <div className="media-card">
      <div className="media-card-image-container">
        <img
          src={getImageUrl(item.poster_path)}
          alt={title}
          className="media-card-image"
        />
      </div>
      <div className="media-card-footer">
        <div>
          <h4 className="media-card-title">{title}</h4>
          <p className="media-card-text">
            {year} • {item.media_type === "tv" ? "TV Show" : "Movie"}
          </p>
        </div>
        {showAddButton && (
          <button
            className={`btn ${added ? "btn-ghost" : "btn-primary"}`}
            style={{
              marginTop: "1rem",
              width: "100%",
              color: added ? "var(--color-success)" : "white",
            }}
            onClick={handleAdd}
            disabled={added}
          >
            {added ? "Added!" : "Add to List"}
          </button>
        )}
      </div>
    </div>
  )
}
