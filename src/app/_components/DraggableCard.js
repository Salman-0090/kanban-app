import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"

export default function DraggableCard({card, onClick}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({id:card.id})

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    return(
        <div ref={setNodeRef} style={style} {...attributes}  
        className="bg-white border rounded-lg p-3 text-sm text-black cursor-grab">
            <div {...listeners} className="cursor-grab"> ⠿</div>
            <span onClick={onClick}>{card.title}</span>
        </div>
    )
}

