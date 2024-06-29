import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProdutoList from '../components/ProdutoList';

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    // Carregar produtos do localStorage ao montar o componente
    const storedProdutos = localStorage.getItem('produtos');
    if (storedProdutos) {
      setProdutos(JSON.parse(storedProdutos));
    }
  }, []);

  const handleAddProduto = (novoProduto) => {
    const updatedProdutos = [...produtos, novoProduto];
    setProdutos(updatedProdutos);
    localStorage.setItem('produtos', JSON.stringify(updatedProdutos));
  };

  const handleEditProduto = (produtoEditado) => {
    const updatedProdutos = produtos.map(produto => (produto.id === produtoEditado.id ? produtoEditado : produto));
    setProdutos(updatedProdutos);
    localStorage.setItem('produtos', JSON.stringify(updatedProdutos));
  };

  const handleDeleteProduto = (id) => {
    const updatedProdutos = produtos.filter(produto => produto.id !== id);
    setProdutos(updatedProdutos);
    localStorage.setItem('produtos', JSON.stringify(updatedProdutos));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Produtos</h1>
      <ProdutoList
        produtos={produtos}
        onAddProduto={handleAddProduto}
        onEditProduto={handleEditProduto}
        onDeleteProduto={handleDeleteProduto}
      />
    </div>
  );
};

export default Produtos;
