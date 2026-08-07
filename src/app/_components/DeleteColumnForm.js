import { deleteColumnAction } from "@/_lib/action";
import Button from "./Buttons";


export default function DeleteColumnForm({columnId, onDelete}) {
    async function handleSubmit(e) {
        e.preventDefault()
        onDelete(columnId)
        await deleteColumnAction(columnId)
    }
        return (
            <form onSubmit={handleSubmit}>
            <input type="hidden" name="columnId" value={columnId} /> 
            <Button type="submit" formAction={deleteColumnAction}>
                DeleteColumn
            </Button>
        </form>
        )
}