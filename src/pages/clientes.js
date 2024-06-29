import { useState, useEffect } from 'react';
import ClienteForm from '../components/ClienteForm';
import ClienteList from '../components/ClienteList';

const ClientesPage = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const storedClientes = JSON.parse(localStorage.getItem('clientes')) || [];
    setClientes(storedClientes);
  }, []);

  const handleAddCliente = (cliente) => {
    const updatedClientes = [...clientes, cliente];
    setClientes(updatedClientes);
    localStorage.setItem('clientes', JSON.stringify(updatedClientes));
  };

  const handleDeleteCliente = (id) => {
    const updatedClientes = clientes.filter(cliente => cliente.id !== id);
    setClientes(updatedClientes);
    localStorage.setItem('clientes', JSON.stringify(updatedClientes));
  };

  const handleEditCliente = (updatedCliente) => {
    const updatedClientes = clientes.map(cliente =>
      cliente.id === updatedCliente.id ? updatedCliente : cliente
    );
    setClientes(updatedClientes);
    localStorage.setItem('clientes', JSON.stringify(updatedClientes));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Clientes</h1>
      <ClienteList
        clientes={clientes}
        onDeleteCliente={handleDeleteCliente}
        onEditCliente={handleEditCliente}
        onAddCliente={handleAddCliente}
      />
    </div>
  );
};

export default ClientesPage;
