import { useLocation, Link } from "react-router-dom";

import ArrowSvg from "../assets/ArrowSvg.jsx";

const Header = ({title}) => {
    const location = useLocation();

    return (
        <nav className="flex items-center h-16 bg-blue-500">
            {
                location.pathname !== "/" && (
                    <button className="flex">
                        <ArrowSvg className="w-4 h-4"/>
                        <Link className="text-xs text-white" to="/">Volver</Link>
                    </button>
                )
            }
            <h1 className="mx-auto font-bold text-white">{title}</h1> 
        </nav>
    )
};

export default Header;
