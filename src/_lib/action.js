"use server"

import { revalidatePath } from "next/cache"
import { auth } from "./auth"
import { createBoard, createCard, createColumn, deleteBoard, deleteCard, deleteColumn, updateCard, updateCardPosition } from "./data-service"
import { supabase } from "./supabase"

export async function createBoardAction(name) {
    const session = await auth()
    if(!name) throw new Error("Board name is required")
    const board =  await createBoard(name, session?. user?.email)
    revalidatePath("/boards")
    return board
}

export async function createColumnAction(boardId, name, position) { 
    const column = await createColumn(boardId, name, position )
        revalidatePath("/boards/[boardId]", "page") 
        return column
}




export async function createCardAction(columnId, title) {
       console.log("columnId:", columnId) 
        // count existing cards in this column
        const { count } = await supabase
        .from("cards")
        .select("*", {count: "exact"})
        .eq("column_id", columnId) 
        const position = count + 1
     const card =   await createCard(columnId, title, position)   
     return card
}   

export async function updateCardAction(id, description) {
    
    await updateCard(id, description)
    revalidatePath("/boards/[boardId]", "page") 
}

export async function deleteCardAction(id) {
    await deleteCard(id)
    revalidatePath("/boards/[boardId]", "page")
}


export async function updateCardPositionAction(id, columnId, position) {
  await updateCardPosition(id, columnId, position)
}

export async function deleteColumnAction(columnId) {
   try {
    await deleteColumn(columnId)
   } catch (error) {
    throw new Error(error.message)
   }
}

export async function deleteBoardAction(boardId) {
 try {
    await deleteBoard(boardId)
   } catch (error) {
    throw new Error(error.message)
   }
}