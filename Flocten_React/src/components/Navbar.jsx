import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Settings, User, LogOut } from "lucide-react"; // Agregué LogOut
import monta from "../public/img/monta.svg";

const Navbar = () => {
  const { logout, authUser, menu } = useAuthStore();

  return (
    <header className="font-bold text-xl text-base-content border-base-300 fixed w-full min-h-20 top-0 z-40 backdrop-blur-lg bg-base-300/15">
      <div className="container mx-auto px-4 max-h-24">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex items-center gap-4 p-2">
            <Link to="/" className="flex items-center gap-4 hover:opacity-80 transition-all">
              <div className="w-14 h-14 rounded-full flex items-center justify-center">
                <img src={monta} className="w-14 h-14 text-primary" alt="Logo" />
              </div>
              <h1 className="text-4xl font-bold font-serif text-gray-800 hover:text-indigo-600 transition-all">MultiPio</h1>
            </Link>
          </div>

          {/* Menú de usuario */}
          <div className="flex items-center gap-2">
            <Link to={"/settings"} className={`btn btn-sm gap-2 transition-colors`}>
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline font-bold text-sm text-base-content">Settings</span>
            </Link>
            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline font-bold text-sm text-base-content ">Profile</span>
                </Link>
                {/* CORREGIDO: Cambié Link por button para logout */}
                <button onClick={logout} className={`btn btn-sm gap-2`}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline font-bold text-sm text-base-content ">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Menú de opciones - AHORA VISIBLE EN MÓVIL */}
      {authUser && (
        <div className="flex justify-center">
          {/* CAMBIADO: sm:flex -> flex y hidden -> block para móviles */}
          <ul className="flex items-center gap-8 overflow-x-auto py-2 px-4">
            {menu.map((data) => (
              <li key={data.id}>
                <Link
                  to={data.Link}
                  className="inline-block px-4 sm:px-9 hover:text-primary duration-200 whitespace-nowrap"
                >
                  {data.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;