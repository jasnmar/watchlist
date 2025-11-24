import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { db } from "../lib/firebase"
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore"
import ListCard from "../components/ListCard/ListCard"
import CreateListModal from "../components/CreateListModal/CreateListModal"
import "./Dashboard.css"

export default function Dashboard() {
  const { currentUser } = useAuth()
  const [lists, setLists] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (!currentUser) {
      setLists([])
      return
    }
    const q = query(
      collection(db, "lists"),
      where("ownerId", "==", currentUser.uid)
      // Note: orderBy requires an index if combined with where, so keeping it simple for now
      // or we can sort client-side
    )
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const listsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        // Client-side sort by createdAt desc
        listsData.sort(
          (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
        )
        setLists(listsData)
      },
      (error) => {
        console.error("Error fetching lists:", error)
      }
    )

    return () => unsubscribe()
  }, [currentUser])

  if(!currentUser) {
    //TODO: Put together some example lists for unauthenticated users
    return <>You must be logged in to view this page.</>
  }
  return (
    <section>
      <div className="list-header">
        <h1>My Lists</h1>
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          + New List
        </button>
      </div>

      <div className="list-grid">
        {lists.map((list) => (
          <ListCard key={list.id} list={list} />
        ))}
      </div>

      {isModalOpen && <CreateListModal onClose={() => setIsModalOpen(false)} />}
    </section>
  )
}
