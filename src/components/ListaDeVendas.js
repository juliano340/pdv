import { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';

const ListaDeVendas = ({ vendas, clientes, produtos, formasDePagamento }) => {
  const [vendasList, setVendasList] = useState([]);
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

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
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
                    <button
                      onClick={() => handleVerDetalhes(venda)}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      <FaEye />
                    </button>
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
                      <li key={forma.id}>
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
    </div>
  );
};

export default ListaDeVendas;
