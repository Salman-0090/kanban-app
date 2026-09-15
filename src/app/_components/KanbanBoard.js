"use client";

import { useState } from "react";
import CreateCardForm from "./CreateCardForm";
import CardModel from "./CardModel";
import CreateColumnForm from "./CreateColumnForm";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import DraggableCard from "./DraggableCard";
import { arrayMove } from "@dnd-kit/sortable"
import DroppableColumn from "./DroppableColumn"
import { updateCardPositionAction } from "@/_lib/action";
import Button from "./Buttons";
import DeleteColumnForm from "./DeleteColumnForm";
import { useRealtimeBoard } from "../_hooks/useRealtimeBoard";

export default function KanbanBoard({columns, boardId}) {
const [selectCard, setSelectCard] = useState(null)
const [localColumns, setLocalColumns] = useState(columns)
const [activeCard, setActiveCard] = useState(null)

//real time board update 
function handleRealtimeUpdate(payload) {
  const {eventType, new: newRecord, old: oldRecord} = payload

  if(eventType === "INSERT") {
    setLocalColumns(prev=> prev.map(col => {
      if(col.id === newRecord.column_id) {
        const exists = col.cards.some(c => 
        c.id === newRecord.id ||  // real id match
        (c.title === newRecord.title && c.column_id === newRecord.column_id)  // ← add this
      )
        if(exists) return col
        return {...col, cards: [...col.cards, newRecord]}
      }
      return col
    }))
  }

  if(eventType === "UPDATE") {
    setLocalColumns(prev=> prev.map(col=> ({
      ...col, 
      cards: col.cards
      .filter(c => c.id  !== newRecord.id)
      .concat(col.id === newRecord.column_id ? [newRecord] : [])
      .sort((a, b)=> a.position - b.position)
    })))
  }

  if(eventType === "DELETE") {
    setLocalColumns(prev => prev.map(col => ({
      ...col,
      cards: col.cards.filter(c => c.id !== oldRecord.id)
    })))
  }
  
}
useRealtimeBoard(boardId, handleRealtimeUpdate)

    function handleClick(card) {      
    setSelectCard(card)
  }
  
  function handleDeleteCard(cardId) {
  setLocalColumns(prev => prev.map(col => ({
    ...col,
    cards: col.cards.filter(c => c.id !== cardId)
  })))
  setSelectCard(null)  
}

function handleUpdateCard(cardId, description) {
  setLocalColumns(prev => prev.map(col => ({
    ...col,
    cards: col.cards.map(c => 
      c.id === cardId ? { ...c, description } : c
    )
  })))
}

function handleAddCard(columnId, title) {
  const newCard = {
    id: crypto.randomUUID(),
    title,
    description: null,
    column_id: columnId,
    position:localColumns.find(col=> col.id === columnId)?.cards.length + 1
  }
    setLocalColumns(prev => prev.map(col => {
      if(col.id === columnId) {
        return {...col, cards:[...col.cards, newCard]}
      }
      return col
    }))
 
} 

  function handleDragStart(event) {
 const card = localColumns
    .flatMap(col => col.cards)
    .find(card => card.id === event.active.id)
  setActiveCard(card)
}
function handleDeleteColumn(columnId) {
  setLocalColumns(prev => prev.filter(col => col.id !== columnId))
}

function handleUndoDelete(columnId)  {
  setLocalColumns(columns)
}


async function handleDragEnd(event) {
  setActiveCard(null)
  const { active, over } = event
  if (!over || active.id === over.id) return

  const draggedCard = localColumns
    .flatMap(col => col.cards)
    .find(card => card.id === active.id)

  // check if dropped on column directly
  const droppedOnColumn = localColumns
    .find(col => col.id === over.id)

  const targetColumn = droppedOnColumn || localColumns
    .find(col => col.cards.some(card => card.id === over.id))

  if (!targetColumn) return

  const isSameColumn = draggedCard.column_id === targetColumn.id

  if (isSameColumn) {
    // same column — just reorder
    const oldIndex = targetColumn.cards.findIndex(card => card.id === active.id)
    const newIndex = targetColumn.cards.findIndex(card => card.id === over.id)
    const newCards = arrayMove(targetColumn.cards, oldIndex, newIndex)

    setLocalColumns(prev => prev.map(col => {
      if (col.id === targetColumn.id) {
        return { ...col, cards: newCards }
      }
      return col
    }))

    await updateCardPositionAction(draggedCard.id, targetColumn.id, newIndex)

  } else {
    // different column — remove from old, add to new
    const newIndex = droppedOnColumn
      ? targetColumn.cards.length  // empty column — add at end
      : targetColumn.cards.findIndex(card => card.id === over.id)

    setLocalColumns(prev => prev.map(col => {
      // remove from old column
      if (col.id === draggedCard.column_id) {
        return { ...col, cards: col.cards.filter(c => c.id !== draggedCard.id) }
      }
      // add to new column
      if (col.id === targetColumn.id) {
        const newCards = [...col.cards]
        newCards.splice(newIndex, 0, { ...draggedCard, column_id: targetColumn.id })
        return { ...col, cards: newCards }
      }
      return col
    }))

    await updateCardPositionAction(draggedCard.id, targetColumn.id, newIndex)
  }
}
    return (
      <DndContext onDragEnd={handleDragEnd}  onDragStart={handleDragStart} >
         <div className="flex flex-wrap ml-8 gap-4 overflow-x-auto ">
        {localColumns.map((column) => (
          <div
            key={column.id}
            className="rounded-xl p-2 border border-gray-300 flex flex-col min-w-[220px]"
          >
            <h2 className="text-sm mb-4">{column.name}</h2>
            <SortableContext items={column.cards.map((card)=>card.id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-6 p-1">

              <DroppableColumn column={column}>
              {column.cards.map((card) => (
                <DraggableCard
                  key={card.id}
                  card={card}
                onClick={()=> handleClick(card)} >
                  {card.title}
                </DraggableCard>  
              ))}
              </DroppableColumn>
            </div>
          </SortableContext>

            <CreateCardForm  columnId={column.id} onAddCard={handleAddCard}/>
            
            <DeleteColumnForm columnId={column.id} onDelete={handleDeleteColumn} onUndo={handleUndoDelete}/>
          </div>
        ))}
        {selectCard && <CardModel card={selectCard} onClose={()=> setSelectCard(null)} onDelete={handleDeleteCard} onUpdate={handleUpdateCard}/>}
          <CreateColumnForm setLocalColumns={setLocalColumns} localColumns={localColumns} boardId={boardId} />
      </div>
          <DragOverlay>
      {activeCard && (
        <div className="bg-white border rounded-lg p-3 text-sm text-black shadow-lg opacity-90">
          {activeCard.title}
        </div>
      )}
    </DragOverlay>
      </DndContext>
    )
}