"use client";

import { signOut } from "next-auth/react";
import Button from "./Buttons";

export default function SignOutButton() {
    return (
        <Button onClick={()=> signOut({callbackUrl: "/"})}>
               Sign Out
            </Button>
    )
}