import { getColumns } from "@/_lib/data-service"
import CreateCardForm from "@/app/_components/CreateCardForm"

export default async function BoardPage({ params }) {
  const { boardId } = await params
  const columns = await getColumns(boardId)

  return (
    <div className="p-4">
      <div className="flex gap-4 overflow-x-auto">
        {columns.map((column) => (
          <div
            key={column.id}
            className="bg-gray-100 rounded-xl p-4 min-w-[280px]"
          >
            <h2 className="font-medium mb-4 text-black">{column.name}</h2>
        
            <div className="flex flex-col gap-2">
              {column.cards.map((card) => (
                <div
                  key={card.id}
                  className="bg-white border rounded-lg p-3 text-sm text-black"
                >
                  {card.title}
                </div>
              ))}
            </div>

            <CreateCardForm  columnId={column.id}/>
          </div>
        ))}
      </div>
    </div>
  )
}