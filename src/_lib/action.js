"use server"

import { revalidatePath } from "next/cache"
import { auth } from "./auth"
import { createBoard, createCard, updateCard } from "./data-service"
import { supabase } from "./supabase"

export async function createBoardAction(formData) {
    const session = await auth()
    const name = formData.get("name")
    if(!name) throw new Error("Board name is required")
        await createBoard(name, session?. user?.email)
    revalidatePath("/boards")
}

export async function createCardAction(formData) {
        const title = formData.get("title")
        const columnId = formData.get("columnId")
        // count existing cards in this column
        const { count } = await supabase
        .from("cards")
        .select("*", {count: "exact"})
        .eq("column_id", columnId) 
        const position = count + 1 // new card goes to bottom
        await createCard(columnId, title, position)   
        revalidatePath("/boards/[boardId]", "page") 
}   

export async function updateCardAction(formData) {
    const description = formData.get("description")
    const id = formData.get("id")
    await updateCard(id, description)
    revalidatePath("/boards/[boardId]", "page") 
}