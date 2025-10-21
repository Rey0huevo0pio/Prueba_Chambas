import { Link, useLocation } from "react-router-dom";

const Header_Ractivos = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "tab tab-active" : "tab";
  };

  return (
    <div className="navbar bg-base-200 justify-center">
      <div className="tabs tabs-boxed bg-base-100 p-1">
        <Link
          to="/RegistroQuimico"
          className={`tab ${isActive("/RegistroQuimico")}`}
        >
          Modificador de quimico o reactivos
        </Link>
        <Link
          to="/Formulario_Reactivos"
          className={`tab ${isActive("/Formulario_Reactivos")}`}
        >
          modificacion para inventario
        </Link>
        <Link
          to="/Formulario_Material"
          className={`tab ${isActive("/Formulario_Material")}`}
        >
          prestamo
        </Link>
      </div>
    </div>
  );
};

export default Header_Ractivos;
