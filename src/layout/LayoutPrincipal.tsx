import { Outlet } from "react-router-dom"
import Header from "../components/Header"


const LayoutPrincipal = () => {
  return (
    <>
        <Header />

        <main className="max-w-6xl mx-auto mt-10">
            <Outlet />
        </main>
    </>
  )
}

export default LayoutPrincipal