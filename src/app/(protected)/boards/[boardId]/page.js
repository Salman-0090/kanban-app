import { getColumns } from "@/_lib/data-service"
import CreateCardForm from "@/app/_components/CreateCardForm"
import KanbanBoard from "@/app/_components/KanbanBoard"

export default async function BoardPage({ params }) {
  const { boardId } = await params
    console.log("boardId:", boardId)
  const columns = await getColumns(boardId)
console.log("columns:", columns)
  return (
    <div className="p-4">
     <KanbanBoard columns={columns} boardId={boardId} />
    </div>
  )
}