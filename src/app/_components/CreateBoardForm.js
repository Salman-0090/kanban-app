"use client"
import { useState } from "react"
import Button from "./Buttons"
import { createBoardAction } from "@/_lib/action"

export default function CreateBoardForm({onAddBoard}) {
    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState("");

  async  function handleSubmit(e) {
        e.preventDefault()
        if(!name.trim()) return 
        setIsOpen(false)
        onAddBoard(name)
        setName("")
        const tempId = onAddBoard(name)
        const realBoard = await createBoardAction(name)
        onReplaceBoard(tempId, realBoard)
    }

    return (
        <div>
            <Button  variant="primary" className="mb-4" onClick={()=> setIsOpen(!isOpen)}>+ New Board</Button>

       { isOpen &&( 
            <form onSubmit={handleSubmit} className="space-x-4 mt-2">
                <input type="text" value={name} placeholder="Enter board name" onChange={(e)=> setName(e.target.value)} 
                className="border rounded px-3 py-2 text-sm" required/>
                <Button type="submit" className="mb-4">Create</Button>
            </form>
        )}
        </div>

    )
}