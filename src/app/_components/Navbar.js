import Link from "next/link";
import { auth } from "../../_lib/auth";
import Image from "next/image";

export default async function Navbar()  {
    const session = await auth()
    return (
        <nav className="flex p-4  justify-between items-center bg-stone-700">
         <Link href={session ? "/boards" : "/"}>
            <span>Kanban</span>
         </Link>
         {session?.user && (
        <div className="flex items-center gap-3">
          
          <Image
            src={session.user.image}
            alt="avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
      )}                
        </nav>
    )
}