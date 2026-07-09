"use client";
import { FcGoogle } from "react-icons/fc";
import Button from "../_components/Buttons";
import { signIn } from "next-auth/react";

export default function page() {
    return (
        <main className="min-h-screen flex justify-center items-center">
            <div className="flex items-center gap-3">
                 <FcGoogle  className="text-4xl"/>
            <Button onClick={()=> signIn("google", {callbackUrl: "/boards"})}>
                Continue with google
            </Button>
            </div>
        </main>
    )
}