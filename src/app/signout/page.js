import SignOutButton from "../_components/SignOutButton";

export default function page() {
    return (
        <main className="min-h-screen flex justify-center items-center">
            <div className="flex items-center gap-3">
                <SignOutButton />
            </div>
        </main>
    )
}