import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/convenio-simple">Convenio Simple</Link>
        </li>
        <li>Convenio con Honorarios</li>
      </ul>
    </div>
  )
}

export default Menu;
