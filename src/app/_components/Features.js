import { TbDragDrop } from "react-icons/tb";
import { MdSync } from "react-icons/md";
import { SlSocialGoogle } from "react-icons/sl";

export default function Features() {
    return (<div className="border-stone-800  p-8">
        <h2 className="mt-10 mb-15 text-center text-xl">Features</h2>
        <div className="flex items-center justify-center gap-8">
            <div className="border border-stone-700 p-10 rounded-xl bg-stone-900">
                <TbDragDrop  className="text-indigo-500 text-2xl"/>
                <h3 className="mb-3">Drag and drop</h3>
                <p className="text-sm">Move cards between columns<br></br> with a smooth drag and drop<br></br> interface.</p>
            </div>
            <div className="border border-stone-700 p-10 rounded-xl bg-stone-900">
                <MdSync  className="text-indigo-500 text-2xl"/>
                <h3 className="mb-3">Real-time sync</h3>
                <p className="text-sm">Every update is instantly visible<br></br> to all team members on the<br></br> board.

</p>
            </div>
            <div className="border border-stone-700 p-10 rounded-xl bg-stone-900">
                <SlSocialGoogle  className="text-indigo-500 text-xl"/>
                <h3 className="mb-3">Google sign in</h3>
                <p className="text-sm">One click sign in with your<br></br> Google account — no password<br></br> needed.

</p>
            </div>
        </div>
    </div>)
}