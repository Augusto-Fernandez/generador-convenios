import { Link } from "react-router-dom";

import Header from "./Header.jsx";

const Menu = () => {
  return (
    <>
      <Header title={"Generador de Convenios"}/>
      <div className="flex flex-col items-center justify-center">
        <ul className="mt-8 p-3 border border-gray-200 rounded-md">
          <li>
            <Link to="/convenio-simple">Convenio Simple</Link>
          </li>
          <li>
            <Link to="/convenio-honorarios">Convenio con Honorarios</Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Menu;
