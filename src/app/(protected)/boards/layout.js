import Navbar from "@/app/_components/Navbar";


export default async function ProtectedLayout({children}) {

    return (
        <div className="text-white bg-stone-800">
            <Navbar />
            <main>{children}</main>
        </div>
    )
}