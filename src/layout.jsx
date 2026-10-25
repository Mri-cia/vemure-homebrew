import Navbar from "./components/navbar"
import { Outlet } from "react-router-dom"

export default function Layout(){
    return(
        <div className="min-h-screen bg-(--primary-color)">
            <Navbar/>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}