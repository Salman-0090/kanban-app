"use client";
import { useState } from "react";
import Boards from "./Boards";
import CreateBoardForm from "./CreateBoardForm";

export default function BoardSection({initialBoards, userEmail}) {
     const[localBoards, setLocalBoards] = useState(initialBoards)

function handleAddBoard(name) {
        const newBoard = {
            id:crypto.randomUUID(),
            name,
            owner_email:userEmail,
        }
    setLocalBoards(prev=> [...prev, newBoard])
    return newBoard.id
}

function handleReplaceBoard(tempId, realBoard) {
    setLocalBoards(prev=> prev.map(b => b.id === tempId ? realBoard : b))
}

function handleDeleteBoard(boardId) { 
        setLocalBoards(prev=> prev.filter(b=> b.id !==boardId))
}

function handleUndoDelete(board) {
  setLocalBoards(prev => [...prev, board])  //  put board back
}
    return (
      <div>
      <CreateBoardForm onAddBoard={handleAddBoard} onReplaceBoard={handleReplaceBoard}/>
      <div className="grid grid-cols-3 gap-4">
        <Boards
          localBoards={localBoards}
          onDeleteBoard={handleDeleteBoard}
          onUndoDelete={handleUndoDelete}
        />
      </div>
    </div>  
    )
}