import { Routes, Route } from "react-router-dom";
import Menu from "../components/Menu";

const AppRouter = () =>{
    return(
        <Routes> 
          <Route path='/' element={<Menu/>}/> 
        </Routes>
    )
}

export default AppRouter
