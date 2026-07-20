"use client";

import { useState } from "react";
import CreateCardForm from "./CreateCardForm";
import CardModel from "./CardModel";
import CreateColumnForm from "./CreateColumnForm";
export default function KanbanBoard({columns, boardId}) {
    const [selectCard, setSelectCard] = useState(null)

    function handleClick(card) {
            setSelectCard(card)
    }

    return (
         <div className="flex gap-4 overflow-x-auto">
        {columns.map((column) => (
          <div
            key={column.id}
            className="bg-gray-100 rounded-xl p-4 min-w-[280px] min-h-[280px]"
          >
            <h2 className="font-medium mb-4 text-black">{column.name}</h2>
        
            <div className="flex flex-col gap-2">
              {column.cards.map((card) => (
                <div
                  key={card.id}
                  className="bg-white border rounded-lg p-3 text-sm text-black"
                onClick={()=> handleClick(card)} >
                  {card.title}
                </div>
              ))}
            
            </div>

            <CreateCardForm  columnId={column.id}/>
          </div>
        ))}
        {selectCard && <CardModel card={selectCard} onClose={()=> setSelectCard(null)}/>}
          <CreateColumnForm columns={columns} boardId={boardId} />
      </div>
    )
}