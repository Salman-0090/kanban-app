"use client";

import { useEffect, useState } from "react";
import CreateCardForm from "./CreateCardForm";
import CardModel from "./CardModel";
import CreateColumnForm from "./CreateColumnForm";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import DraggableCard from "./DraggableCard";
import { arrayMove } from "@dnd-kit/sortable"
import DroppableColumn from "./DroppableColumn"
import { updateCardPositionAction } from "@/_lib/action";

export default function KanbanBoard({columns, boardId}) {
    const [selectCard, setSelectCard] = useState(null)
const [localColumns, setLocalColumns] = useState(columns)
const [activeCard, setActiveCard] = useState(null)

    function handleClick(card) {      
    setSelectCard(card)
  }

  function handleDragStart(event) {
 const card = localColumns
    .flatMap(col => col.cards)
    .find(card => card.id === event.active.id)
  setActiveCard(card)
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
         <div className="flex gap-4 overflow-x-auto">
        {localColumns.map((column) => (
          <div
            key={column.id}
            className="bg-gray-100 rounded-xl p-4 min-w-[280px] min-h-[280px]"
          >
            <h2 className="font-medium mb-4 text-black">{column.name}</h2>
            <SortableContext items={column.cards.map((card)=>card.id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-2 text-black">

              <DroppableColumn column={column}>
              {column.cards.map((card) => (
                <DraggableCard
                  key={card.id}
                  card={card}
                  className="bg-white border rounded-lg p-3 text-sm text-black"
                onClick={()=> handleClick(card)} >
                  {card.title}
                </DraggableCard>
              ))}
              </DroppableColumn>
            </div>
          </SortableContext>

            <CreateCardForm  columnId={column.id}/>
          </div>
        ))}
        {selectCard && <CardModel card={selectCard} onClose={()=> setSelectCard(null)}/>}
          <CreateColumnForm columns={columns} boardId={boardId} />
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