import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./page/Home"
import Feature from "./page/Feature"
import LayoutPrincipal from "./layout/LayoutPrincipal"

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutPrincipal />} path="/">
          <Route index element={<Home />} />
          <Route path="/feature/:featureId" element={<Feature />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
