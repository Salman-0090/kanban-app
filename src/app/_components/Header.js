import Link from "next/link";
import Button from "./Buttons";

export default function Header() {
    return (
        <div className="flex justify-center items-center flex-col mt-30">
      <h1 className="font-bold text-xl text-center mb-3">Kanban App</h1>
      <h2 className="font-bold text-xl text-center">Manage your work with clarity</h2>
<p className="text-center mb-4">Create boards, organize tasks, and move work from To Do to <br/>Done with drag and drop and live updates for your whole team</p>
<div className="flex items-center gap-6">
<Button as={Link} href="/login">
    Get Started
</Button>
<Button variant="gray">
    see how it works
</Button>
</div>
   </div>
    )
}