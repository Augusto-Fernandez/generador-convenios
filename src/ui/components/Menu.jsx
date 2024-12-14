import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div>
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
