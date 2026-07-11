"use client"
import { useState } from "react"
import Button from "./Buttons"
import { createBoardAction } from "@/_lib/action"

export default function CreateBoardForm() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <Button  variant="primary" onClick={()=> setIsOpen(!isOpen)}>+ New Board</Button>

       { isOpen &&( 
            <form action={createBoardAction} onSubmit={()=> setIsOpen(false)} className="space-x-4 mt-2">
                <input type="text" name="name" placeholder="Enter board name"  
                className="border rounded px-3 py-2 text-sm" required/>
                <Button type="submit">Create</Button>
            </form>
        )}

        
        </div>

    )
}