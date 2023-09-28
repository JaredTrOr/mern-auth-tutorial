import { Link } from "react-router-dom"

export default function Header() {

    return (
        <header className="bg-slate-200 p-6">
            <nav className="flex justify-between items-center max-w-6xl mx-auto">
                <Link to='/'>
                    <h1 className="font-bold">MERN auth app</h1>
                </Link>

                <ul className="flex gap-4">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/sign-in'>Sign In</Link></li>
                </ul>
            </nav>
        </header>
    )
}
