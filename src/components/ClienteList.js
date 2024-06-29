import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import ClienteForm from './ClienteForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ClienteList = ({ clientes, onDeleteCliente, onEditCliente, onAddCliente }) => {
  const [editCliente, setEditCliente] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [highlightNome, setHighlightNome] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('containing'); // 'containing' or 'starting'
  const itemsPerPage = 5; // Número de clientes por página

  const formRef = useRef(null); // Referência para o formulário

  useEffect(() => {
    if (showForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showForm]);

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirmação de exclusão',
      message: 'Você tem certeza que deseja excluir este cliente?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => {
            onDeleteCliente(id);
            toast.success('Cliente excluído com sucesso!');
          },
        },
        {
          label: 'Não',
        },
      ],
    });
  };

  const handleEdit = (cliente) => {
    setEditCliente(cliente);
    setShowForm(true);
    setHighlightNome(false);
  };

  const handleCancelEdit = () => {
    setEditCliente(null);
    setShowForm(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Resetar para a primeira página ao mudar o termo de pesquisa
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setCurrentPage(1); // Resetar para a primeira página ao mudar o tipo de pesquisa
  };

  const handleNewClienteClick = () => {
    setShowForm(true);
    setEditCliente(null);
    setHighlightNome(true);
  };

  const handleAddCliente = (cliente) => {
    onAddCliente(cliente);
    toast.success('Cliente adicionado com sucesso!');
  };

  const handleEditCliente = (cliente) => {
    onEditCliente(cliente);
    toast.success('Cliente atualizado com sucesso!');
  };

  // Ordena os clientes em ordem alfabética pelo nome
  const sortedClientes = [...clientes].sort((a, b) => a.nome.localeCompare(b.nome));

  // Filtra os clientes com base no termo de pesquisa e no tipo de pesquisa, considerando nome, email ou telefone
  const filteredClientes = sortedClientes.filter(cliente => {
    const searchTermLower = searchTerm.toLowerCase();
    if (searchType === 'starting') {
      return cliente.nome.toLowerCase().startsWith(searchTermLower) ||
             cliente.email.toLowerCase().startsWith(searchTermLower) ||
             cliente.telefone.toLowerCase().startsWith(searchTermLower);
    } else {
      return cliente.nome.toLowerCase().includes(searchTermLower) ||
             cliente.email.toLowerCase().includes(searchTermLower) ||
             cliente.telefone.toLowerCase().includes(searchTermLower);
    }
  });

  const totalPages = Math.ceil(filteredClientes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentClientes = filteredClientes.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col h-screen bg-white text-black p-4 rounded-lg shadow-lg">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <Link href="/" legacyBehavior>
          <a className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">Voltar</a>
        </Link>
        <button
          onClick={handleNewClienteClick}
          className="bg-[#4c5b6e] text-white px-4 py-2 rounded-lg hover:bg-[#616f83] transition"
        >
          Novo Cliente
        </button>
      </div>
      <div className="relative mb-4">
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Pesquisar cliente"
          className={`p-2 pl-10 border ${searchTerm ? 'border-blue-300' : 'border-gray-300'} rounded-lg w-full text-black`}
        />
        <svg
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="20"
          height="20"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Tipo de Pesquisa:</label>
        <div className="mt-1">
          <label className="inline-flex items-center text-gray-700">
            <input
              type="radio"
              className="form-radio"
              name="searchType"
              value="containing"
              checked={searchType === 'containing'}
              onChange={handleSearchTypeChange}
            />
            <span className="ml-2">Contendo</span>
          </label>
          <label className="inline-flex items-center text-gray-700 ml-4">
            <input
              type="radio"
              className="form-radio"
              name="searchType"
              value="starting"
              checked={searchType === 'starting'}
              onChange={handleSearchTypeChange}
            />
            <span className="ml-2">Iniciando por</span>
          </label>
        </div>
      </div>
      {clientes.length === 0 ? (
        <p className="text-gray-700">Nenhum cliente encontrado. Adicione novos clientes para vê-los listados aqui.</p>
      ) : filteredClientes.length === 0 ? (
        <p className="text-gray-700">Nenhum resultado encontrado para sua pesquisa.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {currentClientes.map(cliente => (
            <li key={cliente.id} className="py-4 flex justify-between items-center flex-wrap sm:flex-nowrap bg-gray-100 rounded-lg mb-2 p-4">
              <div className="w-full sm:w-auto flex-grow">
                <p className="text-lg font-medium text-gray-900">{cliente.nome}</p>
                <p className="text-gray-700">{cliente.email}</p>
                <p className="text-gray-700">{cliente.telefone}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(cliente)}
                  className="bg-[#4c5b6e] text-white px-4 py-2 rounded-lg hover:bg-[#616f83] transition w-full sm:w-auto"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(cliente.id)}
                  className="bg-[#ff003d] text-white px-4 py-2 rounded-lg hover:bg-red-400 transition w-full sm:w-auto"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {filteredClientes.length > itemsPerPage && (
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-gray-700">{`Página ${currentPage} de ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg w-full max-w-3xl mx-auto">
            <button
              type="button"
              className="absolute top-0 right-0 m-2 text-gray-400 hover:text-gray-600"
              onClick={handleCancelEdit}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ClienteForm
              onAddCliente={handleAddCliente}
              onEditCliente={handleEditCliente}
              editCliente={editCliente}
              onCancelEdit={handleCancelEdit}
              highlightNome={highlightNome}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClienteList;
