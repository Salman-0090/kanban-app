import Link from "next/link";
import { auth } from "../../_lib/auth";
import Image from "next/image";
import { PiKanban } from "react-icons/pi";
import Button from "./Buttons";
import SignOutButton from "./SignOutButton";
import SignInButton from "./SignInButton";

export default async function Navbar()  {
    const session = await auth()
    return (
        <nav className="flex p-4  justify-between items-center bg-stone-800 border border-stone-700">
        <div className="flex gap-2 items-center">
         <PiKanban className="text-indigo-500 text-2xl" />
         <Link href={session ? "/boards" : "/"}>
            <span>Kanban</span>
         </Link>
         </div>
         
         {session?.user ? (
        <div className="flex items-center  gap-3">
          
          <Image
            src={session.user.image}
            alt="avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
        <SignOutButton />
        </div>
      ) :
       <SignInButton />
      }                
        </nav>
    )
}