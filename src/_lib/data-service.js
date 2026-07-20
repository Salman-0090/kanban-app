import { supabase } from "@/_lib/supabase"

// ---- BOARDS ----
export async function getBoards(email) {
  const { data, error } = await supabase
    .from("boards")
    .select("*")
    .eq("owner_email", email)

  if (error) throw new Error(error.message)
  return data
}


export async function createBoard(name, email) {
  const { data, error } = await supabase
    .from("boards")
    .insert({ name, owner_email: email})
    .select("*")
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function deleteBoard(id) {
  const { error } = await supabase
    .from("boards")
    .delete()
    .eq("id", id)

  if (error) throw new Error(error.message)
}

// ---- Cards ----

export async function getCards(columnId) {
  const {data, error} = await supabase
    .from("cards")
    .select("*")
    .eq("column_id", columnId)
    .order("position")
    if (error) throw new Error(error.message)
  return data
}


export async function createCard(columnId, title, position) {
  const {data, error} = await supabase
  .from("cards")
  .insert({column_id : columnId, title, position})
  .select("*")
  .single()

  if(error) throw new Error(error.message)
  return data
}

export async function updateCard(id, description) {
  const { error } = await supabase
    .from("cards")
    .update({ description })
    .eq("id", id)

  if (error) throw new Error(error.message)
}

export async function deleteCard(id) {
  const {error} = await supabase
  .from("cards")
  .delete()
  .eq("id", id)
    console.log("error:", error)  // ← add this
  
    if (error) throw new Error(error.message)

}

export async function updateCardPosition(id, columnId, position) {
      const {error} = await supabase
      .from("cards")
      .update({column_id: columnId, position: position})
      .eq("id", id)
      
      if(error) throw new Error(error.message)
     
}




// ---- Column ----


export async function createColumn(boardId, name, position) {
  const { data, error } = await supabase
    .from("columns")
    .insert({ board_id :boardId, name, position})
    .select("*")
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function getColumns(boardId){
    const {data, error} = await supabase
    .from("columns")
    .select("*, cards(*)")
    .eq("board_id", boardId)
    .order("position")
    if(error) throw new Error(error.message)
      return data
}