import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../../store/useAuthStore';

export const useReactiveList = () => {
  const { authUser } = useAuthStore();
  const [reactives, setReactives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredReactives, setFilteredReactives] = useState([]);

  useEffect(() => {
    const fetchAllReactives = async () => {
      try {
        const response = await axios.get(
          'http://192.168.100.16:5001/api/reactivos/lista',
          { headers: { 'Authorization': `Bearer ${authUser?.token}` } }
        );
        setReactives(response.data.data || response.data);
        setFilteredReactives(response.data.data || response.data);
        setLoading(false);
      } catch (err) {
        setError(`Error al cargar los reactivos: ${err.response?.data?.message || err.message}`);
        console.error("Error details:", err);
        setLoading(false);
      }
    };
  
    fetchAllReactives();
  }, [authUser?.token]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredReactives(reactives);
    } else {
      const filtered = reactives.filter(reactive => 
        reactive.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reactive.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (reactive.formula && reactive.formula.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredReactives(filtered);
    }
  }, [searchTerm, reactives]);

  const refreshList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'http://192.168.100.16:5001/api/reactivos/lista',
        { headers: { 'Authorization': `Bearer ${authUser?.token}` } }
      );
      setReactives(response.data.data || response.data);
      setFilteredReactives(response.data.data || response.data);
      setError(null);
    } catch (err) {
      setError(`Error al actualizar la lista: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteReactive = async (codigo) => {
    try {
      await axios.delete(
        `http://192.168.100.16:5001/api/reactivos/${codigo}`,
        { headers: { 'Authorization': `Bearer ${authUser?.token}` } }
      );
      refreshList();
    } catch (err) {
      setError(`Error al eliminar el reactivo: ${err.response?.data?.message || err.message}`);
    }
  };

  return {
    reactives: filteredReactives,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    refreshList,
    deleteReactive
  };
};