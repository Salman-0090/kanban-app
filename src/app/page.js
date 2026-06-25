import Button from "./_components/Buttons";

export default function Home() {
  return (
   <div className="min-h-screen flex justify-center items-center flex-col">
      <h1 className="font-bold text-xl text-center mb-3">Kanban App</h1>
      <h2 className="font-bold text-xl text-center">Manage your work with clarity</h2>
<p className="text-center">Create boards, organize tasks, set priorities, and move work from <br/>To Do to Done with a simple drag-and-drop interface.</p>
<Button>Get Started</Button>
   </div>
  );
}
