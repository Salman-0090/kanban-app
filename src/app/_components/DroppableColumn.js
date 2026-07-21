"use client"
import { useDroppable } from "@dnd-kit/core"

export default function DroppableColumn({ column, children }) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id })

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col gap-2 min-h-[100px] rounded-lg transition-colors
        ${isOver ? "bg-gray-200" : ""}` 
      }
    >
      {children}
    </div>
  )
}