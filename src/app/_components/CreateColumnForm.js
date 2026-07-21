"use client";
import { createColumnAction } from "@/_lib/action";
import Button from "./Buttons";
import { useState } from "react";

export default function CreateColumnForm({ boardId }) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="min-w-[280px] space-y-2">
            <Button onClick={()=> setIsOpen(!isOpen)}>+ Add Column </Button>
            {(
                
            isOpen && (
            <form className="space-x-2" action={createColumnAction} onSubmit={()=> setIsOpen(false)}>
            <input type="hidden" name="boardId" value={boardId}/>
            <input className="border border-rounded-md" type="text" name="name" placeholder="add column name" required/> 
            <Button type="submit">Create</Button>

        </form>)
                    
                
            )}
        </div>
    )
}