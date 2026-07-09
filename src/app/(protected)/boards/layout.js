import { auth } from "@/app/_lib/auth";
import { redirect } from "next/navigation"

export default async function ProtectedLayout({children}) {
    const session = await auth()
    console.log(session)
    if(!session) redirect("/login")
    return (
        <div>
            <main>{children}</main>
        </div>
    )
}