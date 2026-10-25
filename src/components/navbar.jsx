import { Search } from "lucide-react"
import { Link } from "react-router-dom"

export default function Navbar(){
    return(
        <div className="h-16 flex justify-between items-center px-16 py-2.5 border-b-2 border-(--secondary-color)">
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
            <div className="w-80 h-full flex justify-center items-center gap-2 py-2">
                <input type="text" placeholder="Search" className="flex-1 h-1/3 border border-(--border) px-2 py-3"/>
                <button className="px-2 h-full border border-(--border)">
                    <Search size={18}/>
                </button>
            </div>

        </div>
    )
}