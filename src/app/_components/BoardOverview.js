import Image from "next/image";

export default function BoardOverview() {
    return (
        <div className="mt-30 p-8 font-bold text-center border border-stone-800">
            <h2>Visualize Your Workflow</h2>
            <Image src="/board.PNG" alt="Kanban board" width={900} height={700} className="mx-auto"/>

        </div>
    )
}