"use client";

import { useState } from "react";
import Button from "./Buttons";
import { createBoardAction } from "@/_lib/action";

export default function CreateCardForm({columnId}) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        
            <div>
                <Button className="mt-4" onClick={()=> setIsOpen(!isOpen)}>Add Card</Button>
                {
                    isOpen && (
                    <form className="space-y-2 space-x-2 mt-2" onSubmit={()=> setIsOpen(false)} action={createBoardAction}>
                     <input type="hidden" name="columnId" value={columnId} />
                        <input type="text" name="title" placeholder="Enter Card title"  
                className="border rounded px-3 py-2 text-sm bg-white text-black"  required/>
                <Button type="submit">Create</Button>
                    </form>
                    
                )}
            </div>
       
    )
}