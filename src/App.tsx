import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Lista } from "./components/Lista"
import { NuevoItem } from "./components/NuevoItem"
import { Editar } from "./components/Editar"


function App() {

  return (
     <BrowserRouter>
          <Routes>
               <Route path="/" element={<Lista />} />
               <Route path="/nuevoitem" element={<NuevoItem />} />
               <Route path="/editaritem/:id" element={<Editar />} />
          </Routes>
     </BrowserRouter>
  )
}

export default App
