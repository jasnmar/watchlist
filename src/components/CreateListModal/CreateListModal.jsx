import { useState } from "react"
import { db } from "../../lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { useAuth } from "../../context/AuthContext"
import "./CreateListModal.css"

export default function CreateListModal({ onClose }) {
  const [name, setName] = useState("")
  const [isShared, setIsShared] = useState(false)
  const { currentUser } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!currentUser) return

    try {
      await addDoc(collection(db, "lists"), {
        name,
        isShared,
        ownerId: currentUser.uid,
        createdAt: serverTimestamp(),
        itemCount: 0,
      })
      onClose()
    } catch (error) {
      console.error("Error creating list:", error)
    }
  }

  return (
    <div className="create-list-modal">
      <div className="card">
        <h2>Create New List</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>List Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Weekend Watch"
              autoFocus
              required
            />
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              checked={isShared}
              onChange={(e) => setIsShared(e.target.checked)}
              id="isShared"
            />
            <label htmlFor="isShared">Shared List</label>
          </div>

          <div className="form-group">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
