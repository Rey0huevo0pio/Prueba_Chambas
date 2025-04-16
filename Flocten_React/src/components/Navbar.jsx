
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Settings, ShoppingCart, User } from "lucide-react";
import Logp from "../public/img/LaBoritiLog.png"


const Navbar = () => {
  const Menu = [
    { id: 1, name: "Registro", Link: "/" },
    { id: 2, name: "Almacen", Link: "/RegistroQuimico" },
    { id: 3, name: "Informacion", Link: "/InformacionReactivos" },
  ];

  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="bg-base-300 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-300/15"
    >
      <div className="container mx-auto px-4 max-h-24">
        <div className="flex items-center justify-between h-full">

          <div className="flex items-center gap-4 p-2">

          <Link to="/" className="flex items-center gap-4 hover:opacity-80 transition-all">
          <div className="w-14 h-14 rounded-full flex items-center justify-center">
            {/* Usando la importación de la imagen */}
            <img src={Logp} className="w-14 h-14 text-primary" alt="Logo" />
          </div>
          <h1 className="text-xl font-semibold text-gray-800 hover:text-indigo-600 transition-all">MultiPio</h1>
        </Link>

          </div>


          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className={`
              btn btn-sm gap-2 transition-colors
              
              `}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>

              </>



            )}


          </div>
        </div>
      </div>
      {authUser && (
        <>
          <div className="flex justify-center">
            <ul className="sm:flex hidden items-center gap-4">
              {Menu.map((data, index) => (
                <li key={index}>
                  {/* O usa data.id si tienes un identificador único */}
                  <Link
                    to={data.Link}
                    className="inline-block px-9 hover:text-primary duration-200 "
                  >
                    {data.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


        </>
      )}


    </header>

  );
};
export default Navbar;