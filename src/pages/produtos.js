import { useState } from 'react';
import Link from 'next/link';
import ProdutoList from '../components/ProdutoList';

const Produtos = () => {
  const initialProdutos = [
    { id: 1, nome: 'Produto A', descricao: 'Descrição do Produto A', preco: 100, estoque: 50 },
    { id: 2, nome: 'Produto B', descricao: 'Descrição do Produto B', preco: 200, estoque: 30 },
    // Adicione mais produtos conforme necessário
  ];

  const [produtos, setProdutos] = useState(initialProdutos);

  const handleAddProduto = (novoProduto) => {
    setProdutos([...produtos, novoProduto]);
  };

  const handleEditProduto = (produtoEditado) => {
    setProdutos(produtos.map(produto => (produto.id === produtoEditado.id ? produtoEditado : produto)));
  };

  const handleDeleteProduto = (id) => {
    setProdutos(produtos.filter(produto => produto.id !== id));
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
