
import { updateCard } from "@/_lib/data-service";
import Button from "./Buttons";
import { updateCardAction } from "@/_lib/action";

export default function CardModel({card, onClose}) {

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
          defaultValue={card.description || ""}
          placeholder="Add a description..."
          className="w-full border rounded p-2 text-sm text-black min-h-[100px]"
        />
        <input name="id" type="hidden" value={card.id}/>
          <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm cursor-pointer" type="submit" formAction={updateCardAction}>Save</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded text-sm curson-pointer">Delete card</button>
          
          </form>
         
          
        </div>
      </div>
           </>
    )
}