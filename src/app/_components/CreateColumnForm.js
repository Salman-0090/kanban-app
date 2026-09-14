"use client";
import { createColumnAction } from "@/_lib/action";
import Button from "./Buttons";
import { useState } from "react";

export default function CreateColumnForm({setLocalColumns, localColumns, boardId }) {
    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState("")
  async  function handleSubmit(e) {
        e.preventDefault()
        setIsOpen(false)
       const newColumn = {
        id:crypto.randomUUID(),
        board_id:boardId,
        name,
        position: localColumns.length + 1,
        cards: []
       }
       setLocalColumns((prev)=> [...prev, newColumn])
      await  createColumnAction(boardId, name, newColumn.position)
    }
    
    return (
        <div className="min-w-[280px] space-y-2">
            <Button onClick={()=> setIsOpen(!isOpen)}>+ Add Column </Button>
            {(
                
            isOpen && (
            <form className="space-x-2" onSubmit={handleSubmit}>
            <input type="hidden" name="boardId" value={boardId}/>
            <input className="border border-rounded-md" type="text" value={name} placeholder="add column name" onChange={e=> setName(e.target.value)} required/> 
            <Button type="submit">Create</Button>

        </form>)      
            )}
    
        </div>
    )
}