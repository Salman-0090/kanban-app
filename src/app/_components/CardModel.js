"use client";
import { updateCard } from "@/_lib/data-service";
import Button from "./Buttons";
import { deleteCardAction, updateCardAction } from "@/_lib/action";
import { useState } from "react";

export default function CardModel({card, onClose}) {
  const [description, setDescription] = useState(card.description || "") 
  const [isOpen, setIsOpen] = useState(false)
    return (
           <>
           <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}>
           </div>
           <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 z-50 w-[500px] shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium text-lg text-black">{card.title}</h2>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>

    
        <div className="flex gap-2 mt-4">
          <form className="space-x-2">
            <textarea 
          name="description"
          value={description}
          onChange={(e)=> setDescription(e.target.value)}
          placeholder="Add a description..."
          className="w-full border rounded p-2 text-sm text-black min-h-[100px]"
        />
        <input name="id" type="hidden" value={card.id}/>
          <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm cursor-pointer" type="submit" formAction={updateCardAction}>Save</button>
          </form>
          <form>
             <input name="id" type="hidden"  value={card.id}/>
          <button formAction={deleteCardAction} type="submit" className="bg-red-500 text-white px-4 py-2 rounded text-sm curson-pointer" onClick={()=> setIsOpen(!open)}>Delete card</button>
          </form>
          
          
        </div>
      </div>
           </>
    )
}