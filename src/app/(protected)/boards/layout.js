import Navbar from "@/app/_components/Navbar";


export default async function ProtectedLayout({children}) {

    return (
        <div>
            <Navbar />
            <main>{children}</main>
        </div>
    )
}