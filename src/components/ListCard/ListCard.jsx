import { Link } from "react-router-dom"
import "./ListCard.css"

export default function ListCard({ list }) {
  return (
    <Link to={`/list/${list.id}`} className="list-card-link">
      <div className="card list-card-content">
        <div>
          <h3 className="list-card-title">{list.name}</h3>
          <p className="list-card-subtitle">{list.itemCount} items</p>
        </div>

        <div className="list-card-footer">
          {list.isShared && <span className="list-card-badge">Shared</span>}
        </div>
      </div>
    </Link>
  )
}
