import { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const AdicionarProdutos = ({ produtos, itensVenda, setItensVenda, onPrevious, onNext }) => {
  const [searchTermProduto, setSearchTermProduto] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    calcularSubtotal();
  }, [itensVenda]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const calcularSubtotal = () => {
    const total = itensVenda.reduce((acc, item) => {
      const preco = parseFloat(String(item.preco).replace(',', '.'));
      return acc + (preco * item.quantidade);
    }, 0);
    setSubtotal(total);
  };

  const filteredProdutos = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(searchTermProduto.toLowerCase())
  );

  const handleAdicionarProduto = (produtoId) => {
    const produto = produtos.find(p => p.id === produtoId);
    const itemExistente = itensVenda.find(item => item.produtoId === produtoId);

    if (itemExistente) {
      setItensVenda(itensVenda.map(item =>
        item.produtoId === produtoId
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      ));
    } else {
      setItensVenda([...itensVenda, { produtoId, quantidade: 1, preco: produto.preco }]);
    }
    setSearchTermProduto('');
    setHighlightedIndex(-1);
  };

  const handleAlterarQuantidade = (produtoId, quantidade) => {
    const quantidadeAtualizada = Math.max(1, quantidade);
    setItensVenda(itensVenda.map(item =>
      item.produtoId === produtoId
        ? { ...item, quantidade: quantidadeAtualizada }
        : item
    ));
  };

  const handleIncrementarQuantidade = (produtoId) => {
    handleAlterarQuantidade(produtoId, itensVenda.find(item => item.produtoId === produtoId).quantidade + 1);
  };

  const handleDecrementarQuantidade = (produtoId) => {
    handleAlterarQuantidade(produtoId, itensVenda.find(item => item.produtoId === produtoId).quantidade - 1);
  };

  const handleRemoverProduto = (produtoId) => {
    setItensVenda(itensVenda.filter(item => item.produtoId !== produtoId));
  };

  const handleKeyDown = (e) => {
    if (filteredProdutos.length === 0) return;

    if (e.key === 'ArrowDown') {
      setHighlightedIndex((prevIndex) => (prevIndex + 1) % filteredProdutos.length);
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) => (prevIndex - 1 + filteredProdutos.length) % filteredProdutos.length);
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && highlightedIndex < filteredProdutos.length) {
        handleAdicionarProduto(filteredProdutos[highlightedIndex].id);
      }
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Produtos:</label>
      <input
        type="text"
        value={searchTermProduto}
        onChange={(e) => setSearchTermProduto(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Digite o nome do produto..."
        className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
      />
      {searchTermProduto && (
        <ul className="mt-2 border border-gray-300 rounded-lg max-h-40 overflow-y-auto">
          {filteredProdutos.length === 0 ? (
            <li className="p-2 text-gray-700">Nenhum produto encontrado.</li>
          ) : (
            filteredProdutos.map((produto, index) => (
              <li
                key={produto.id}
                className={`p-2 hover:bg-gray-200 cursor-pointer ${index === highlightedIndex ? 'bg-gray-300' : ''}`}
                onClick={() => handleAdicionarProduto(produto.id)}
              >
                {produto.nome} - R$ {parseFloat(produto.preco).toFixed(2)}
              </li>
            ))
          )}
        </ul>
      )}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Produtos Selecionados:</label>
        {itensVenda.length === 0 ? (
          <p className="text-gray-700">Nenhum produto selecionado.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {itensVenda.map(item => {
              const produto = produtos.find(p => p.id === item.produtoId);
              return (
                <li key={item.produtoId} className="py-4 flex justify-between items-center">
                  <div>
                    <p className="text-lg font-medium text-gray-900">{produto.nome}</p>
                    <p className="text-gray-700">Preço Unitário: R$ {parseFloat(item.preco).toFixed(2)}</p>
                    <div className="flex items-center">
                      <label className="block text-sm font-medium text-gray-700 mr-2">Quantidade:</label>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => handleDecrementarQuantidade(item.produtoId)}
                          className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
                          disabled={item.quantidade <= 1}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantidade}
                          onChange={(e) => handleAlterarQuantidade(item.produtoId, Math.max(1, parseInt(e.target.value) || 1))}
                          className="p-2 border border-gray-300 rounded-lg w-16 text-center"
                        />
                        <button
                          type="button"
                          onClick={() => handleIncrementarQuantidade(item.produtoId)}
                          className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  {isMobile ? (
                    <button
                      onClick={() => handleRemoverProduto(item.produtoId)}
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                    >
                      <FaTrashAlt />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRemoverProduto(item.produtoId)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Remover
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
        <div className="mt-4">
          <p className="text-lg font-bold">Subtotal: R$ {isNaN(subtotal) ? 0 : subtotal.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={onPrevious}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
        >
          Anterior
        </button>
        {itensVenda.length > 0 && (
          <button
            onClick={onNext}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Próximo
          </button>
        )}
      </div>
    </div>
  );
};

export default AdicionarProdutos;
