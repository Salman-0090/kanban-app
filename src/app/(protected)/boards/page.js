import Button from "@/app/_components/Buttons";
import { auth } from "@/_lib/auth";
import { getBoards } from "@/_lib/data-service";
import Link from "next/link";
import CreateBoardForm from "@/app/_components/CreateBoardForm";

export default async function Page() {
    const session = await auth()
  const boards = await getBoards(session?.user?.email)
  console.log(boards)
    return (
      <div className="p-6">
       <div className="flex item-center justify-between m-4">
       <div>
         <h2>Your boards</h2>
        <p>3 boards</p>
       </div>
       <div>
            <CreateBoardForm /> 
       </div>
       </div>
       <div className="grid grid-cols-3 gap-4 ">
          {
            boards.map((board)=> {
             return  (<Link key={board.id} href={`/boards/${board.id}`}>
                  <div className="border rounded-xl p-4 cursor-pointer hover:shadow-md">
                    <h2 className="font-medium">{board.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">Click to open</p>
                  </div>
              </Link>)
            })
          }
       </div>
       </div>
    )
}