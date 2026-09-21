"use client";

import { signIn } from "next-auth/react";
import Button from "./Buttons";

export default function SignInButton() {
    return (
           <Button onClick={()=> signIn("google", {callbackUrl: "/boards"})}>
            Sign in           
           </Button>
    )
}