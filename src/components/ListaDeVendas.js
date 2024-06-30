import { useEffect, useState } from 'react';
import { FaEye, FaTrashAlt, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListaDeVendas = ({ vendas, clientes, produtos, formasDePagamento }) => {
  const [vendasList, setVendasList] = useState(vendas);
  const [detalheVenda, setDetalheVenda] = useState(null);

  useEffect(() => {
    setVendasList(vendas);
  }, [vendas]);

  const obterNomeCliente = (clienteId) => {
    const cliente = clientes.find(c => c.id === clienteId);
    return cliente ? cliente.nome : 'Cliente não encontrado';
  };

  const obterNomeProduto = (produtoId) => {
    const produto = produtos.find(p => p.id === produtoId);
    return produto ? produto.nome : 'Produto não encontrado';
  };

  const obterFormaPagamento = (formaId) => {
    const forma = formasDePagamento.find(f => f.id === formaId);
    return forma ? forma.tipo : 'Forma de pagamento não encontrada';
  };

  const handleVerDetalhes = (venda) => {
    setDetalheVenda(venda);
  };

  const fecharDetalhes = () => {
    setDetalheVenda(null);
  };

  const handleExcluirVenda = (id) => {
    const novasVendas = vendasList.filter(venda => venda.id !== id);
    setVendasList(novasVendas);
    localStorage.setItem('vendas', JSON.stringify(novasVendas));
    toast.success('Venda excluída com sucesso!');
  };

  return (
    <div className="relative p-4 bg-white rounded-lg shadow-lg overflow-x-auto">
      <ToastContainer />
      <h2 className="text-xl font-bold mb-4">Vendas Realizadas</h2>
      {vendasList.length === 0 ? (
        <p className="text-gray-700">Nenhuma venda realizada até o momento.</p>
      ) : (
        <>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Cliente</th>
                <th className="py-2 px-4 border-b text-left">Data</th>
                <th className="py-2 px-4 border-b text-left">Total</th>
                <th className="py-2 px-4 border-b text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {vendasList.map(venda => (
                <tr key={venda.id}>
                  <td className="py-2 px-4 border-b text-left">{obterNomeCliente(venda.clienteId)}</td>
                  <td className="py-2 px-4 border-b text-left">{venda.data}</td>
                  <td className="py-2 px-4 border-b text-left">R$ {venda.total.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleVerDetalhes(venda)}
                        className="text-blue-500 hover:text-blue-700 transition"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleExcluirVenda(venda.id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {detalheVenda && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
              <div className="bg-white p-6 rounded-lg w-full max-w-lg mx-auto">
                <h2 className="text-xl font-bold mb-4">Detalhes da Venda</h2>
                <div className="mb-2">
                  <p className="font-medium">Cliente: {obterNomeCliente(detalheVenda.clienteId)}</p>
                </div>
                <div className="mb-2">
                  <p className="font-medium">Data: {detalheVenda.data}</p>
                </div>
                <div className="mb-2">
                  <p className="font-medium">Produtos:</p>
                  <ul className="list-disc list-inside">
                    {detalheVenda.itensVenda.map(item => (
                      <li key={item.produtoId}>
                        {obterNomeProduto(item.produtoId)} - {item.quantidade}x R$ {Number(item.preco).toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-2">
                  <p className="font-medium">Formas de Pagamento:</p>
                  <ul className="list-disc list-inside">
                    {detalheVenda.formasSelecionadas.map(forma => (
                      <li key={`${forma.id}-${forma.valor}`}>
                        {obterFormaPagamento(forma.id)} - R$ {Number(forma.valor).toFixed(2)} {forma.tipo === 'CARTÃO' ? `(${forma.bandeira}, ${forma.cartaoTipo}, ${forma.permiteParcelamento ? `${forma.parcelas}x` : ''})` : ''}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-2">
                  <p className="font-bold">Total: R$ {Number(detalheVenda.total).toFixed(2)}</p>
                </div>
                <button
                  onClick={fecharDetalhes}
                  className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                  Fechar
                </button>
              </div>
            </div>
          )}
        </>
      )}
      <Link href="/" legacyBehavior>
        <a className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition">
          <FaArrowLeft size="1.5em" />
        </a>
      </Link>
    </div>
  );
};

// Função para carregar os dados no servidor a cada requisição
export async function getServerSideProps() {
  // Carregar dados do localStorage (em um cenário real, você carregaria de um banco de dados)
  const vendas = JSON.parse(localStorage.getItem('vendas')) || [];
  const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
  const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
  const formasDePagamento = JSON.parse(localStorage.getItem('formasDePagamento')) || [];

  return {
    props: {
      vendas,
      clientes,
      produtos,
      formasDePagamento,
    },
  };
}

export default ListaDeVendas;
