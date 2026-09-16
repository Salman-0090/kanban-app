"use client"  
import { useState } from "react"  
import { deleteColumnAction } from "@/_lib/action"
import Button from "./Buttons"

export default function DeleteColumnForm({ columnId, onDelete, onUndo }) {
 
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleSubmit(e) {  
    e.preventDefault()
    setIsDeleting(true)
    onDelete(columnId)

    try {
      await deleteColumnAction(columnId)
    } catch (error) {
      onUndo(columnId)
      alert("Something went wrong! Column was not deleted.")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Button type="submit" variant="gray" disabled={isDeleting} className="mt-3">
        {isDeleting ? "Deleting..." : "Delete Column"}
      </Button>
    </form>
  )
}