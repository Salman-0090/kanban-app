import { getColumns } from "@/_lib/data-service"
import CreateCardForm from "@/app/_components/CreateCardForm"
import KanbanBoard from "@/app/_components/KanbanBoard"

export default async function BoardPage({ params }) {
  const { boardId } = await params   
  const columns = await getColumns(boardId)
  return (
    <div className="p-4 mt-12">
     <KanbanBoard columns={columns} boardId={boardId} />
    </div>
  )
}