import Button from "@/app/_components/Buttons";
import { auth } from "@/_lib/auth";
import { getBoards } from "@/_lib/data-service";
import Link from "next/link";
import CreateBoardForm from "@/app/_components/CreateBoardForm";
import DeleteBoardForm from "@/app/_components/DeleteBoardForm";
import Boards from "@/app/_components/Boards";
import BoardSection from "@/app/_components/BoardSection";

export default async function Page() {
  const session = await auth()
  const boards = await getBoards(session?.user?.email)
  
    return (
       <div className="p-6">
      <BoardSection 
        initialBoards={boards} 
        userEmail={session?.user?.email}
      />
    </div>
    )
}