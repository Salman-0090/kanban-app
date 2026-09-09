"use client"

import { supabase } from "@/_lib/supabase"
import { useEffect } from "react"

export function useRealtimeBoard(boardId, onUpdate) {
        useEffect(()=> {
            const channel = supabase
            .channel(`board-${boardId}`)
            .on(
                "postgres_changes",
                {
                    event:"*",
                    schema:"public",
                    table:"cards",
                },
                (payload) => {
                    console.log("realtime change:", payload)
                    onUpdate(payload)
                }
            )
            .subscribe((status)=> {
                console.log("subscription status:", status)
            }) 

            return () => {
                supabase.removeChannel(channel)
            }
        },[boardId, onUpdate])
}