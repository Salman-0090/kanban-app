"use server"

import { revalidatePath } from "next/cache"
import { auth } from "./auth"
import { createBoard, createCard, createColumn, deleteCard, updateCard, updateCardPosition } from "./data-service"
import { supabase } from "./supabase"

export async function createBoardAction(formData) {
    const session = await auth()
    const name = formData.get("name")
    if(!name) throw new Error("Board name is required")
        await createBoard(name, session?. user?.email)
    revalidatePath("/boards")
}

export async function createColumnAction(formData) {
        const boardId = formData.get("boardId")
        const name = formData.get("name")
         const { count } = await supabase
        .from("columns")
        .select("*", {count:"exact"})
        .eq("boardId", boardId)
        const position = count + 1
        await createColumn(boardId, name, position )
        revalidatePath("/boards/[boardId]", "page") 
}




export async function createCardAction(formData) {
        const title = formData.get("title")
        const columnId = formData.get("columnId")
        // count existing cards in this column
        const { count } = await supabase
        .from("cards")
        .select("*", {count: "exact"})
        .eq("column_id", columnId) 
        const position = count + 1
        await createCard(columnId, title, position)   
        revalidatePath("/boards/[boardId]", "page") 
}   

export async function updateCardAction(formData) {
    const description = formData.get("description")
    const id = formData.get("id")
    await updateCard(id, description)
    revalidatePath("/boards/[boardId]", "page") 
}

export async function deleteCardAction(formData) {
      console.log("deleteCardAction running")
      console.log("formData entries:", [...formData.entries()]) // ← add this
  const id = formData.get("id")
  console.log("id:", id)
   
    await deleteCard(id)
    revalidatePath("/boards/[boardId]", "page")
}


export async function updateCardPositionAction(id, columnId, position) {
  await updateCardPosition(id, columnId, position)
}