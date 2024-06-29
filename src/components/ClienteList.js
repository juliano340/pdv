import { useState, useRef, useEffect } from 'react';
import ClienteForm from './ClienteForm';
import { toast } from 'react-toastify';
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

  // Ordena os clientes em ordem alfabética pelo nome
  const sortedClientes = [...clientes].sort((a, b) => a.nome.localeCompare(b.nome));

  // Filtra os clientes com base no termo de pesquisa e no tipo de pesquisa
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
    <div className="flex flex-col h-screen">
      <div className="p-4 bg-white shadow rounded-lg flex-grow overflow-y-auto">
        <div className="relative mb-4">
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Pesquisar cliente"
            className={`p-2 pl-10 border ${searchTerm ? 'border-blue-300' : 'border-gray-300'} rounded-lg w-full`}
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Lista de Clientes</h2>
          <button
            onClick={handleNewClienteClick}
            className="bg-[#00875E] text-white px-4 py-2 rounded-lg hover:bg-[#A7CC15] transition"
          >
            Novo Cliente
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Tipo de Pesquisa:</label>
          <div className="mt-1">
            <label className="inline-flex items-center">
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
            <label className="inline-flex items-center ml-4">
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
          <p className="text-gray-500">Nenhum cliente encontrado. Adicione novos clientes para vê-los listados aqui.</p>
        ) : filteredClientes.length === 0 ? (
          <p className="text-gray-500">Nenhum resultado encontrado para sua pesquisa.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {currentClientes.map(cliente => (
              <li key={cliente.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium">{cliente.nome}</p>
                  <p className="text-gray-500">{cliente.email}</p>
                  <p className="text-gray-500">{cliente.telefone}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(cliente)}
                    className="bg-[#F56217] text-white px-4 py-2 rounded-lg hover:bg-[#F5CC17] transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(cliente.id)}
                    className="bg-[#04394E] text-white px-4 py-2 rounded-lg hover:bg-red-400 transition"
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
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition disabled:opacity-50"
            >
              Anterior
            </button>
            <span>{`Página ${currentPage} de ${totalPages}`}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full relative">
              <button
                type="button"
                className="absolute top-0 right-0 m-2 text-gray-400 hover:text-gray-600"
                onClick={handleCancelEdit}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <ClienteForm
                  onAddCliente={onAddCliente}
                  onEditCliente={onEditCliente}
                  editCliente={editCliente}
                  onCancelEdit={handleCancelEdit}
                  highlightNome={highlightNome}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClienteList;
