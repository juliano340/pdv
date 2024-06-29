import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const ProdutoForm = ({ onAddProduto, onEditProduto, editProduto, onCancelEdit, highlightNome }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [estoque, setEstoque] = useState('');
  const [error, setError] = useState('');
  const [highlightFields, setHighlightFields] = useState({
    nome: false,
    descricao: false,
    preco: false,
    estoque: false,
  });

  useEffect(() => {
    if (editProduto) {
      setNome(editProduto.nome);
      setDescricao(editProduto.descricao);
      setPreco(editProduto.preco);
      setEstoque(editProduto.estoque);
    } else {
      setNome('');
      setDescricao('');
      setPreco('');
      setEstoque('');
    }
  }, [editProduto]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const highlight = {
      nome: !nome,
      descricao: !descricao,
      preco: !preco,
      estoque: !estoque,
    };

    setHighlightFields(highlight);

    if (!nome || !descricao || !preco || !estoque) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    if (editProduto) {
      onEditProduto({ ...editProduto, nome, descricao, preco, estoque });
      onCancelEdit();
      toast.success('Produto atualizado com sucesso!');
    } else {
      const novoProduto = { id: Date.now(), nome, descricao, preco, estoque };
      onAddProduto(novoProduto);
      onCancelEdit();
      toast.success('Produto adicionado com sucesso!');
    }

    setNome('');
    setDescricao('');
    setPreco('');
    setEstoque('');
    setError('');
    setHighlightFields({ nome: false, descricao: false, preco: false, estoque: false });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-4 shadow rounded-lg ${editProduto ? 'bg-[#4c5b6e]' : 'bg-[#384658]'} w-full max-w-4xl mx-auto`}
    >
      <h3 className="text-xl font-bold mb-4 text-white">{editProduto ? 'Editar Produto' : 'Adicionar Produto'}</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => {
            setNome(e.target.value);
            if (e.target.value) {
              setHighlightFields((prev) => ({ ...prev, nome: false }));
            }
          }}
          className={`mt-1 p-2 border ${highlightFields.nome ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full text-black`}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">Descrição:</label>
        <textarea
          value={descricao}
          onChange={(e) => {
            setDescricao(e.target.value);
            if (e.target.value) {
              setHighlightFields((prev) => ({ ...prev, descricao: false }));
            }
          }}
          className={`mt-1 p-2 border ${highlightFields.descricao ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full text-black`}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">Preço:</label>
        <input
          type="number"
          value={preco}
          onChange={(e) => {
            setPreco(e.target.value);
            if (e.target.value) {
              setHighlightFields((prev) => ({ ...prev, preco: false }));
            }
          }}
          className={`mt-1 p-2 border ${highlightFields.preco ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full text-black`}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">Estoque:</label>
        <input
          type="number"
          value={estoque}
          onChange={(e) => {
            setEstoque(e.target.value);
            if (e.target.value) {
              setHighlightFields((prev) => ({ ...prev, estoque: false }));
            }
          }}
          className={`mt-1 p-2 border ${highlightFields.estoque ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full text-black`}
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex flex-col sm:flex-row sm:space-x-2">
        <button
          type="submit"
          className="bg-[#233243] text-white px-4 py-2 rounded-lg hover:bg-[#384658] transition mb-2 sm:mb-0 w-full sm:w-auto"
        >
          {editProduto ? 'Atualizar Produto' : 'Adicionar Produto'}
        </button>
        <button
          type="button"
          onClick={onCancelEdit}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition w-full sm:w-auto"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ProdutoForm;
