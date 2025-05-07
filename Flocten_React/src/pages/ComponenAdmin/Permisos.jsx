import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/useAuthStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Permisos = () => {
  const [Usuaris, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authUser } = useAuthStore();

  const [editingUser, setEditingUser] = useState(null);
  const [permissions, setPermissions] = useState({
    lectura: false,
    registro: false,
    modificacion: false,
    eliminacion: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [usuariosRes] = await Promise.all([
          axios.get('http://192.168.100.19:5001/api/list/usuarios', {
            headers: { 'Authorization': `Bearer ${authUser?.token}` }
          })
        ]);
        
        setUsuarios(usuariosRes.data.data || usuariosRes.data);
      } catch (err) {
        setError(`Error al cargar los datos: ${err.response?.data?.message || err.message}`);
        console.error("Error details:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [authUser?.token]);

  const handleEditPermissions = (usuario) => {
    setEditingUser(usuario);
    setPermissions(usuario.PermisosEx || {
      lectura: false,
      registro: false,
      modificacion: false,
      eliminacion: false
    });
  };

  const savePermissions = async () => {
    try {
      await axios.put(
        `http://192.168.100.19:5001/api/usuario/Permiss/${editingUser.controlNumber}/permissions`,
        { permissions },
        { headers: { 'Authorization': `Bearer ${authUser?.token}` } }
      );
      
      // Actualizar la lista de usuarios
      const updatedUsers = Usuaris.map(user => 
        user.controlNumber === editingUser.controlNumber 
          ? { ...user, PermisosEx: permissions } 
          : user
      );
      
      setUsuarios(updatedUsers);
      setEditingUser(null);
      toast.success("Permisos actualizados correctamente");
    } catch (error) {
      console.error("Error al actualizar permisos:", error);
      toast.error("Error al actualizar permisos");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-gray-600">Cargando información...</p>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-base-100 to-base-200 min-h-full pb-5">
      {/* Header */}
      <header className="bg-gradient-to-r shadow-sm from-primary to-base-content">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Gestión de Alumnos
          </h1>
          <p className="mt-2 text-sm text-gray-600 text-center">
            usuarios registrados
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-h-full max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:flex-row gap-8 font-bold">
          {/* Sección de Usuarios */}
          <section className="max-w-full max-h-full">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Lista de Usuarios
                </h2>
              </div>
              <div className="p-6 max-h-full">
                {Usuaris.length > 0 ? (
                  <ul className="list bg-base-100 rounded-box shadow-md">
                    <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Usuarios registrados</li>
                    
                    {Usuaris.map((usuario) => (
                      <li key={`usuario-${usuario._id || usuario.controlNumber}`} className="list-row hover:bg-gray-50">
                        <div>
                          {usuario.profilePic ? (
                            <img className="size-10 rounded-box object-cover" src={usuario.profilePic} alt={usuario.fullName}/>
                          ) : (
                            <div className="size-10 rounded-box bg-purple-100 flex items-center justify-center">
                              <svg className="size-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div>{usuario.fullName}</div>
                          <div className="text-xs uppercase font-semibold opacity-60">{usuario.controlNumber}</div>
                        </div>
                        <button 
                          className="btn btn-square btn-ghost" 
                          title="Editar permisos"
                          onClick={() => handleEditPermissions(usuario)}
                        >
                          <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </g>
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No hay usuarios registrados</h3>
                    <p className="mt-1 text-sm text-gray-500">No se encontraron usuarios en el sistema.</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Modal para editar permisos */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              Editar permisos para {editingUser.fullName}
            </h3>
            
            <div className="space-y-3">
              {Object.entries(permissions).map(([key, value]) => (
                <div key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`perm-${key}`}
                    checked={value}
                    onChange={(e) => setPermissions({...permissions, [key]: e.target.checked})}
                    className="checkbox checkbox-primary mr-2"
                  />
                  <label htmlFor={`perm-${key}`} className="capitalize">
                    {key}
                  </label>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end mt-6 space-x-2">
              <button 
                onClick={() => setEditingUser(null)}
                className="btn btn-ghost"
              >
                Cancelar
              </button>
              <button 
                onClick={savePermissions}
                className="btn btn-primary"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Permisos;