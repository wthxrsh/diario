import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

const Navbar = () =>{
    return <header className="bg-base-300 border-b border-base-content/10">
        <div className="mx-auto max-w-6xl p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-mono font-bold text-primary tracking-tighter">Diario</h1>
                <div className="flex items-center gap-4">
                    <Link to={"/create"} className="btn btn-primary rounded-lg">
                        <PlusIcon className="size-5" />
                        <span>Share!</span>
                    </Link>
                </div>
            </div>
        </div>

    </header>
}
export default Navbar;