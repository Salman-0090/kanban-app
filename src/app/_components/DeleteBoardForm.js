"use client";

import { useState } from "react";
import Button from "./Buttons";
import { deleteBoardAction } from "@/_lib/action";

export default function DeleteBoardForm({board, onDeleteBoard, onUndoDelete}) {
    const[isDeleting, setIsDeleting] = useState(false)
  async function handleSubmit(e) {
        e.preventDefault() 
        setIsDeleting(true)
        onDeleteBoard(board.id)
        try {
            await deleteBoardAction(board.id)
        } catch(error) {
            onUndoDelete(board) //  put board back if server fails
            alert("Something went wrong! Board was not deleted")
        } finally {
            setIsDeleting(false)
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <Button type="submit" disabled={isDeleting}>{isDeleting ? "Deleting..." : "Delete Board"}</Button>
        </form>
    )
}