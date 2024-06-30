import { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import 'chart.js/auto'; // Importação necessária para Chart.js funcionar corretamente

const Dashboard = () => {
  const [totalVendas, setTotalVendas] = useState(0);
  const [vendasPorPeriodo, setVendasPorPeriodo] = useState({});
  const [formasDePagamentoData, setFormasDePagamentoData] = useState({});
  const [produtosMaisVendidos, setProdutosMaisVendidos] = useState({});
  const [clientesMaisCompraram, setClientesMaisCompraram] = useState({});
  const [vendas, setVendas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [formasDePagamento, setFormasDePagamento] = useState([]);

  useEffect(() => {
    const storedVendas = JSON.parse(localStorage.getItem('vendas')) || [];
    const storedClientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const storedProdutos = JSON.parse(localStorage.getItem('produtos')) || [];
    const storedFormasDePagamento = JSON.parse(localStorage.getItem('formasDePagamento')) || [];

    setVendas(storedVendas);
    setClientes(storedClientes);
    setProdutos(storedProdutos);
    setFormasDePagamento(storedFormasDePagamento);
  }, []);

  useEffect(() => {
    calcularIndicadores();
  }, [vendas]);

  const calcularIndicadores = () => {
    // Total de Vendas
    const total = vendas.reduce((acc, venda) => acc + venda.total, 0);
    setTotalVendas(total);

    // Vendas por Período
    const vendasPorDia = vendas.reduce((acc, venda) => {
      const data = new Date(venda.data);
      if (!isNaN(data.getTime())) {
        const mesAno = `${String(data.getMonth() + 1).padStart(2, '0')}/${data.getFullYear()}`;
        acc[mesAno] = (acc[mesAno] || 0) + venda.total;
      }
      return acc;
    }, {});
    setVendasPorPeriodo(vendasPorDia);

    // Distribuição das Formas de Pagamento
    const formasDePagamentoCount = vendas.reduce((acc, venda) => {
      venda.formasSelecionadas.forEach(forma => {
        acc[forma.tipo] = (acc[forma.tipo] || 0) + forma.valor;
      });
      return acc;
    }, {});
    setFormasDePagamentoData(formasDePagamentoCount);

    // Produtos Mais Vendidos
    const produtosCount = vendas.reduce((acc, venda) => {
      venda.itensVenda.forEach(item => {
        const produto = produtos.find(p => p.id === item.produtoId);
        if (produto) {
          acc[produto.nome] = (acc[produto.nome] || 0) + item.quantidade;
        }
      });
      return acc;
    }, {});
    setProdutosMaisVendidos(produtosCount);

    // Clientes que mais compraram
    const clientesCount = vendas.reduce((acc, venda) => {
      const cliente = clientes.find(c => c.id === venda.clienteId);
      if (cliente) {
        acc[cliente.nome] = (acc[cliente.nome] || 0) + venda.total;
      }
      return acc;
    }, {});
    setClientesMaisCompraram(clientesCount);
  };

  const dataVendasPorPeriodo = {
    labels: Object.keys(vendasPorPeriodo),
    datasets: [
      {
        label: 'Vendas',
        data: Object.values(vendasPorPeriodo),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const dataFormasDePagamento = {
    labels: Object.keys(formasDePagamentoData),
    datasets: [
      {
        data: Object.values(formasDePagamentoData),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  const dataProdutosMaisVendidos = {
    labels: Object.keys(produtosMaisVendidos),
    datasets: [
      {
        label: 'Quantidade Vendida',
        data: Object.values(produtosMaisVendidos),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const dataClientesMaisCompraram = {
    labels: Object.keys(clientesMaisCompraram),
    datasets: [
      {
        label: 'Total Gasto',
        data: Object.values(clientesMaisCompraram),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Dashboard de Vendas</h1>
      <div className="mb-4">
        <h2 className="text-xl font-bold">Total de Vendas: R$ {totalVendas.toFixed(2)}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Vendas por Período</h2>
          <div className="h-64">
            <Bar data={dataVendasPorPeriodo} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Formas de Pagamento</h2>
          <div className="h-64">
            <Pie data={dataFormasDePagamento} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Produtos Mais Vendidos</h2>
          <div className="h-64">
            <Bar data={dataProdutosMaisVendidos} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Clientes que Mais Compraram</h2>
          <div className="h-64">
            <Bar data={dataClientesMaisCompraram} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
      <Link href="/" legacyBehavior>
        <a className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition">
          <FaArrowLeft size="1.5em" />
        </a>
      </Link>
    </div>
  );
};

export default Dashboard;
