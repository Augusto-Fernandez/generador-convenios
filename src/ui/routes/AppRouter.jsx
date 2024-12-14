import { Routes, Route } from "react-router-dom";
import Menu from "../components/Menu.jsx";
import ConvenioSimple from "../components/ConvenioSimple.jsx";
import ConvenioConHonorarios from "../components/ConvenioConHonorarios.jsx";

const AppRouter = () =>{
    return(
        <Routes> 
          <Route path='/' element={<Menu/>}/> 
          <Route path='/convenio-simple' element={<ConvenioSimple/>}/>
          <Route path='/convenio-honorarios' element={<ConvenioConHonorarios/>}/>
        </Routes>
    )
}

export default AppRouter
