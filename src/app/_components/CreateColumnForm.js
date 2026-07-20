import { createColumnAction } from "@/_lib/action";
import Button from "./Buttons";

export default function CreateColumnForm({ boardId }) {
 
    return (
        <form action={createColumnAction}>
           
            <input type="hidden" name="boardId" value={boardId}/>
            <input type="text" name="name" placeholder="add column name" required/>
            <Button type="submit">Create Column</Button>
        </form>
    )
}