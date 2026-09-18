"use client";
import { createColumnAction } from "@/_lib/action";
import Button from "./Buttons";
import { useState } from "react";

export default function CreateColumnForm({setLocalColumns, localColumns, boardId, onReplaceColumn }) {
    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState("")
  async  function handleSubmit(e) {
        e.preventDefault()
        const columnName = name
        const position = localColumns.length + 1
       const newColumn = {
        id:crypto.randomUUID(),
        board_id:boardId,
        name,
        position,
        cards: []
       }
        setIsOpen(false)
       setLocalColumns((prev)=> [...prev, newColumn])
       setName("")
       const tempId = newColumn.id
      const realColumn = await  createColumnAction(boardId, name, newColumn.position)
       onReplaceColumn(tempId, realColumn)

    }


    
    return (
        <div className="min-w-[280px] space-y-2">
            <div className="flex items-center">
             <Button className="text-base" onClick={()=> setIsOpen(!isOpen)}>+ Add Column </Button>
             </div>
        <div>
           
            {(
                
            isOpen && (
            <form className="space-x-2" onSubmit={handleSubmit}>
            <input type="hidden" name="boardId" value={boardId}/>
            <input className="border rounded-md bg-blue-100 p-1 text-black" type="text" value={name} placeholder="add column name" onChange={e=> setName(e.target.value)} required/> 
            <Button type="submit">Create</Button>

        </form>)      
            )}
    
        </div>
        </div>
    )
}