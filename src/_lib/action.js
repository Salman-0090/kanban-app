"use server"

import { revalidatePath } from "next/cache"
import { auth } from "./auth"
import { createBoard } from "./data-service"

export async function createBoardAction(formData) {
    const session = await auth()
    const name = formData.get("name")
    if(!name) throw new Error("Board name is required")
        await createBoard(name, session?. user?.email)
    revalidatePath("/boards")
}