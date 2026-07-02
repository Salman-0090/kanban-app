import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

export default function page() {
    return (
        <form>
            <button>
                <span> <FcGoogle /></span>
                <span>Continue with google</span> 
            </button>
        </form>
    )
}