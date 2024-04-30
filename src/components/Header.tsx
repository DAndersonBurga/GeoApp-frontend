import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="bg-slate-700 py-6">
        <div className="max-w-6xl mx-auto">
            <Link 
              to={"/"}
              className="font-bold text-4xl text-white"
            >GeoApp</Link>
        </div>
    </header>
  )
}

export default Header