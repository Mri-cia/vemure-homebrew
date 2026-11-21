import { Search } from "lucide-react"
import { Link } from "react-router-dom"

export default function Navbar(){
    return(
        <div className="min-h-16 flex flex-wrap justify-between items-center gap-3 px-4 sm:px-8 md:px-16 py-2.5 border-b-2 border-(--secondary-color)">
            <Link to={"/"}
                className="flex items-center gap-2">
                <div className="w-[2.5em] h-[2.5em] border border-(--border) flex justify-center items-center">
                    icon
                </div>
                <div className="font-bold text-sm">
                    <h2>VEMURE</h2>
                    <h2>HOMEBREW</h2>
                </div>
            </Link>
            <div className="w-44 sm:w-64 md:w-80 h-10 flex justify-center items-center gap-2">
                <input type="text" placeholder="Search" className="min-w-0 flex-1 h-full border border-(--border) px-2"/>
                <button className="px-2 h-full border border-(--border) flex items-center justify-center">
                    <Search size={18}/>
                </button>
            </div>

        </div>
    )
}