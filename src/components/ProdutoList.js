import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import ProdutoForm from './ProdutoForm';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ProdutoList = ({ produtos, onDeleteProduto, onEditProduto, onAddProduto }) => {
  const [editProduto, setEditProduto] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [highlightNome, setHighlightNome] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('containing'); // 'containing' or 'starting'
  const itemsPerPage = 5; // Número de produtos por página

  const formRef = useRef(null); // Referência para o formulário

  useEffect(() => {
    if (showForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showForm]);

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirmação de exclusão',
      message: 'Você tem certeza que deseja excluir este produto?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => {
            onDeleteProduto(id);
            toast.success('Produto excluído com sucesso!');
          },
        },
        {
          label: 'Não',
        },
      ],
    });
  };

  const handleEdit = (produto) => {
    setEditProduto(produto);
    setShowForm(true);
    setHighlightNome(false);
  };

  const handleCancelEdit = () => {
    setEditProduto(null);
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

  const handleNewProdutoClick = () => {
    setShowForm(true);
    setEditProduto(null);
    setHighlightNome(true);
  };

  // Ordena os produtos em ordem alfabética pelo nome
  const sortedProdutos = [...produtos].sort((a, b) => a.nome.localeCompare(b.nome));

  // Filtra os produtos com base no termo de pesquisa e no tipo de pesquisa, considerando apenas o nome do produto
  const filteredProdutos = sortedProdutos.filter(produto => {
    const searchTermLower = searchTerm.toLowerCase();
    if (searchType === 'starting') {
      return produto.nome.toLowerCase().startsWith(searchTermLower);
    } else {
      return produto.nome.toLowerCase().includes(searchTermLower);
    }
  });

  const totalPages = Math.ceil(filteredProdutos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProdutos = filteredProdutos.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col h-screen bg-[#0e1d2d] text-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <Link href="/" legacyBehavior>
          <a className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">Voltar</a>
        </Link>
        <button
          onClick={handleNewProdutoClick}
          className="bg-[#4c5b6e] text-white px-4 py-2 rounded-lg hover:bg-[#616f83] transition"
        >
          Novo Produto
        </button>
      </div>
      <div className="relative mb-4">
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Pesquisar produto"
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
        <label className="block text-sm font-medium text-gray-300">Tipo de Pesquisa:</label>
        <div className="mt-1">
          <label className="inline-flex items-center text-gray-300">
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
          <label className="inline-flex items-center text-gray-300 ml-4">
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
      {produtos.length === 0 ? (
        <p className="text-gray-300">Nenhum produto encontrado. Adicione novos produtos para vê-los listados aqui.</p>
      ) : filteredProdutos.length === 0 ? (
        <p className="text-gray-300">Nenhum resultado encontrado para sua pesquisa.</p>
      ) : (
        <ul className="divide-y divide-gray-700">
          {currentProdutos.map(produto => (
            <li key={produto.id} className="py-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
              <div className="w-full sm:w-auto flex-grow">
                <p className="text-lg font-medium text-gray-100">{produto.nome}</p>
                <p className="text-gray-400">{produto.descricao}</p>
                <p className="text-gray-400">{`Preço: R$ ${produto.preco}`}</p>
                <p className="text-gray-400">{`Estoque: ${produto.estoque}`}</p>
              </div>
              <div className="flex space-x-2 w-full sm:w-auto mt-2 sm:mt-0">
                <button
                  onClick={() => handleEdit(produto)}
                  className="bg-[#4c5b6e] text-white px-4 py-2 rounded-lg hover:bg-[#616f83] transition w-full sm:w-auto"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(produto.id)}
                  className="bg-[#233243] text-white px-4 py-2 rounded-lg hover:bg-red-400 transition w-full sm:w-auto"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {filteredProdutos.length > itemsPerPage && (
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-gray-300">{`Página ${currentPage} de ${totalPages}`}</span>
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
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
          <div className="flex items-center justify-center min-h-screen p-2 sm:p-4 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl w-full mx-2 sm:mx-auto relative">
              <button
                type="button"
                className="absolute top-0 right-0 m-2 text-gray-400 hover:text-gray-600"
                onClick={handleCancelEdit}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full mx-auto">
                <ProdutoForm
                  onAddProduto={onAddProduto}
                  onEditProduto={onEditProduto}
                  editProduto={editProduto}
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

export default ProdutoList;
