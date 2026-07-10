import Button from "@/app/_components/Buttons";

export default function Page() {
    return (
       <div className="flex item-center justify-between m-4">
       <div>
         <h2>Your boards</h2>
        <p>3 boards</p>
       </div>
       <div>
            <Button variant="primary">+ New board</Button>
        
       </div>
       </div>
    )
}