import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/useAuthStore';

const Inf_Readaptivos = () => {
  const { token, } = useAuthStore(); // 👈 obteniendo el token o user
  const [reactivos, setReactivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReactivos = async () => {
      try {
        const response = await axios.get('http://192.168.100.19:5001/api/reactivos/lista', {
          headers: {
            Authorization: `Bearer ${token}`, // 👈 incluye el token
          },
        });
        setReactivos(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (token) {
      fetchReactivos(); // solo si hay token
    } else {
      setError('No estás autenticado');
      setLoading(false);
    }
  }, [token]);

  if (loading) return <div>Cargando reactivos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-4 px-18">
      <h2>Listado de Reactivos</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Número de Control</th>
            <th>Código</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {reactivos.map((reactivo) => (
            <tr key={reactivo._id || reactivo.controlNumber}>
              <td>{reactivo.controlNumber}</td>
              <td>{reactivo.codigo}</td>
              <td>{reactivo.nombre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inf_Readaptivos;
