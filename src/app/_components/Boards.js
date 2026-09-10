"use client";
import Link from "next/link";
import DeleteBoardForm from "./DeleteBoardForm";
import { useState } from "react";

export default function Boards({localBoards, onDeleteBoard, onUndoDelete}) {
  
    return (
        <>
      {localBoards.map((board) => (
        <div key={board.id}>
        <Link href={`/boards/${board.id}`}>
          <div className="border rounded-xl p-4 cursor-pointer hover:shadow-md mb-4">
            <h2 className="font-medium">{board.name}</h2>
            <p className="text-sm text-gray-500 mt-1">
              Click to open
            </p>
          </div>
        </Link>
         <DeleteBoardForm onDeleteBoard={onDeleteBoard} board={board} onUndoDelete={onUndoDelete} />
         </div>
      ))}
    </>
    )
}

