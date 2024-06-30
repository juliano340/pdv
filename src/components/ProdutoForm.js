import { useState, useEffect } from 'react';

const ProdutoForm = ({ onAddProduto, onEditProduto, editProduto, onCancelEdit, highlightNome }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [estoque, setEstoque] = useState('');
  const [highlightFields, setHighlightFields] = useState({ nome: false, preco: false });

  useEffect(() => {
    if (editProduto) {
      setNome(editProduto.nome);
      setDescricao(editProduto.descricao);
      setPreco(editProduto.preco.toString().replace('.', ','));
      setEstoque(editProduto.estoque);
      setHighlightFields({ nome: false, preco: false });
    } else {
      setNome('');
      setDescricao('');
      setPreco('');
      setEstoque('');
    }
  }, [editProduto]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome || !preco) {
      setHighlightFields({
        nome: !nome,
        preco: !preco,
      });
      return;
    }

    const precoFormatado = parseFloat(preco.replace(',', '.'));

    const novoProduto = {
      id: editProduto ? editProduto.id : Date.now(),
      nome,
      descricao,
      preco: precoFormatado,
      estoque,
    };

    if (editProduto) {
      onEditProduto(novoProduto);
    } else {
      onAddProduto(novoProduto);
    }

    onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit} className={`p-4 shadow rounded-lg bg-gray-50 w-full `}>
      <h3 className="text-xl font-bold mb-4">{editProduto ? 'Editar Produto' : 'Adicionar Produto'}</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => {
            setNome(e.target.value);
            if (e.target.value) {
              setHighlightFields((prev) => ({ ...prev, nome: false }));
            }
          }}
          className={`mt-1 p-2 border ${highlightFields.nome ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full`}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Descrição:</label>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Preço:</label>
        <input
          type="text"
          value={preco}
          onChange={(e) => {
            setPreco(e.target.value);
            if (e.target.value) {
              setHighlightFields((prev) => ({ ...prev, preco: false }));
            }
          }}
          className={`mt-1 p-2 border ${highlightFields.preco ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full`}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Estoque:</label>
        <input
          type="text"
          value={estoque}
          onChange={(e) => setEstoque(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
          {editProduto ? 'Atualizar' : 'Adicionar'}
        </button>
        <button type="button" onClick={onCancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ProdutoForm;
