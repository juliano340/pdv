import { useState, useEffect } from 'react';
import ListaDeVendas from '../components/ListaDeVendas';

const VisualizarVendasPage = () => {
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [formasDePagamento, setFormasDePagamento] = useState([]);
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    // Carregar dados do localStorage ao montar o componente
    const storedClientes = localStorage.getItem('clientes');
    if (storedClientes) setClientes(JSON.parse(storedClientes));

    const storedProdutos = localStorage.getItem('produtos');
    if (storedProdutos) setProdutos(JSON.parse(storedProdutos));

    const storedFormasDePagamento = localStorage.getItem('formasDePagamento');
    if (storedFormasDePagamento) setFormasDePagamento(JSON.parse(storedFormasDePagamento));

    const storedVendas = localStorage.getItem('vendas');
    if (storedVendas) setVendas(JSON.parse(storedVendas));
  }, []);

  return (
    <div className="p-4 mx-4 md:mx-8">
      <h1 className="text-2xl font-bold mb-4">Visualizar Vendas</h1>
      <ListaDeVendas
        vendas={vendas}
        clientes={clientes}
        produtos={produtos}
        formasDePagamento={formasDePagamento}
      />
    </div>
  );
};

export default VisualizarVendasPage;
