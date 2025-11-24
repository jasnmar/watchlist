import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { db } from "../lib/firebase"
import {
  doc,
  onSnapshot,
  collection,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
  updateDoc,
  increment,
} from "firebase/firestore"
import MovieSearch from "../components/MovieSearch/MovieSearch"
import MediaCard from "../components/MediaCard/MediaCard"
import "./ListView.css"

export default function ListView() {
  const { listId } = useParams()
  const [list, setList] = useState(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!listId) return

    // Subscribe to list details
    const listUnsub = onSnapshot(doc(db, "lists", listId), (doc) => {
      if (doc.exists()) {
        setList({ id: doc.id, ...doc.data() })
      } else {
        setList(null) // Handle 404
      }
      setLoading(false)
    })

    // Subscribe to list items
    const q = query(
      collection(db, "lists", listId, "items"),
      orderBy("createdAt", "desc")
    )
    const itemsUnsub = onSnapshot(q, (snapshot) => {
      setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    })

    return () => {
      listUnsub()
      itemsUnsub()
    }
  }, [listId])

  const handleAddItem = async (mediaItem) => {
    try {
      await addDoc(collection(db, "lists", listId, "items"), {
        ...mediaItem,
        createdAt: serverTimestamp(),
      })

      // Update list item count
      await updateDoc(doc(db, "lists", listId), {
        itemCount: increment(1),
      })
    } catch (error) {
      console.error("Error adding item:", error)
    }
  }

  if (loading) return <div className="container">Loading...</div>
  if (!list) return <div className="container">List not found</div>

  return (
    <div>
      <div className="list-header">
        <h1>{list.name}</h1>
        {list.isShared && <p className="list-header-badge">Shared List</p>}
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ marginBottom: "1rem" }}>Add Movies/Shows</h3>
        <MovieSearch onAdd={handleAddItem} />
      </div>

      <h3 style={{ marginBottom: "1rem" }}>Your Watchlist ({items.length})</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {items.map((item) => (
          <MediaCard key={item.id} item={item} showAddButton={false} />
        ))}
      </div>
    </div>
  )
}
