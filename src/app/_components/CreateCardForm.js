"use client";

import { useState } from "react";
import Button from "./Buttons";
import { createCardAction } from "@/_lib/action";


export default function CreateCardForm({columnId, onAddCard}) {
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState("")
    async function handleSubmit(e) {
        e.preventDefault()
        if(!title.trim()) return
        setIsOpen(false) 
        setTitle("")
        const tempId = onAddCard(columnId, title)
        const realCard =  await createCardAction(columnId, title)
        onReplaceCard(tempId, realCard)
    }
    return (
        
            <div>
                <Button className="mt-4 mb-4" onClick={()=> setIsOpen(!isOpen)}>Add Card</Button>
                {
                    isOpen && (
                    <form className="space-y-2 space-x-2 mt-2" onSubmit={handleSubmit} >
                     <input type="hidden" name="columnId" value={columnId} />
                        <input type="text" value={title} 
                        placeholder="Enter Card title"  
                        onChange={(e)=> setTitle(e.target.value)}
                className="border rounded p-1 text-sm bg-blue-100 text-black" required/>
                <Button type="submit">Create</Button>
                    </form>
                    
                )}
            </div>
       
    )
}