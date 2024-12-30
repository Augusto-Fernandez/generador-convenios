import { useLocation, Link } from "react-router-dom";

const Header = ({title}) => {
    const location = useLocation();

    return (
        <nav>
            {
                location.pathname !== "/" && (
                    <button>
                        <Link to="/">Volver</Link>
                    </button>
                )
            }
            <h1>{title}</h1> 
        </nav>
    )
};

export default Header;
