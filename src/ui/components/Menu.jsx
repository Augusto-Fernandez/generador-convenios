import { Link } from "react-router-dom";

import Header from "./Header.jsx";

const Menu = () => {
  return (
    <div>
      <Header title={"Generador de Convenios"}/>
      <ul>
        <li>
          <Link to="/convenio-simple">Convenio Simple</Link>
        </li>
        <li>
          <Link to="/convenio-honorarios">Convenio con Honorarios</Link>
        </li>
      </ul>
    </div>
  )
}

export default Menu;
