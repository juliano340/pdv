import { useEffect, useState } from 'react';

const ListaDeVendas = ({ vendas, clientes, produtos, formasDePagamento }) => {
  const [vendasList, setVendasList] = useState([]);

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

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Vendas Realizadas</h2>
      {vendasList.length === 0 ? (
        <p className="text-gray-700">Nenhuma venda realizada até o momento.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {vendasList.map(venda => (
            <li key={venda.id} className="py-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-lg font-bold">{obterNomeCliente(venda.clienteId)}</p>
                <p>{venda.data}</p>
              </div>
              <div className="mb-2">
                <p className="font-medium">Produtos:</p>
                <ul className="list-disc list-inside">
                  {venda.itensVenda.map(item => (
                    <li key={item.produtoId}>
                      {obterNomeProduto(item.produtoId)} - {item.quantidade}x R$ {item.preco}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-2">
                <p className="font-medium">Forma de Pagamento: {obterFormaPagamento(venda.formaDePagamento)}</p>
              </div>
              <div className="mb-2">
                <p className="font-bold">Total: R$ {venda.total}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaDeVendas;
