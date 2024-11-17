import { Routes, Route } from "react-router-dom";
import Menu from "../components/Menu.jsx";
import ConvenioSimple from "../components/ConvenioSimple.jsx";

const AppRouter = () =>{
    return(
        <Routes> 
          <Route path='/' element={<Menu/>}/> 
          <Route path='/convenio-simple' element={<ConvenioSimple/>}/>
        </Routes>
    )
}

export default AppRouter
