import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AdicionarPagamentos = ({ formasDePagamento, formasSelecionadas, setFormasSelecionadas, total, onPrevious, onComplete }) => {
  const [formaDePagamento, setFormaDePagamento] = useState('');
  const [formaPagamentoDetalhes, setFormaPagamentoDetalhes] = useState(null);
  const [valorForma, setValorForma] = useState('');
  const [parcelas, setParcelas] = useState(1);
  const [valorPago, setValorPago] = useState(0);

  useEffect(() => {
    const totalPago = formasSelecionadas.reduce((acc, forma) => acc + parseFloat(String(forma.valor).replace(',', '.')), 0);
    setValorPago(totalPago);
  }, [formasSelecionadas]);

  const handleAdicionarForma = () => {
    const valorFormaFloat = parseFloat(String(valorForma).replace(',', '.'));
    if (!formaDePagamento || !valorForma || isNaN(valorFormaFloat) || valorFormaFloat <= 0) {
      toast.error('Por favor, selecione uma forma de pagamento e insira um valor válido.');
      return;
    }

    const forma = formasDePagamento.find(f => f.id === parseInt(formaDePagamento));
    if (!forma) {
      toast.error('Forma de pagamento não encontrada.');
      return;
    }

    const novaForma = {
      ...forma,
      valor: valorFormaFloat,
      parcelas: forma.tipo === 'CARTÃO' && forma.cartaoTipo === 'crédito' && forma.permiteParcelamento ? parcelas : 1,
    };

    const novoTotalPago = valorPago + valorFormaFloat;
    if (novoTotalPago > total) {
      toast.error('O valor total pago não pode ser superior ao valor da venda.');
      return;
    }

    setFormasSelecionadas([...formasSelecionadas, novaForma]);
    setFormaDePagamento('');
    setFormaPagamentoDetalhes(null);
    setValorForma('');
    setParcelas(1);
  };

  const handleRemoverForma = (formaId) => {
    const novasFormas = formasSelecionadas.filter(forma => forma.id !== formaId);
    setFormasSelecionadas(novasFormas);
  };

  const handleFormaDePagamentoChange = (e) => {
    const formaId = e.target.value;
    setFormaDePagamento(formaId);
    const forma = formasDePagamento.find(f => f.id === parseInt(formaId));
    setFormaPagamentoDetalhes(forma);
    setParcelas(1);
  };

  const valorRestante = total - valorPago;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Forma de Pagamento:</label>
      <select
        value={formaDePagamento}
        onChange={handleFormaDePagamentoChange}
        className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
      >
        <option value="" disabled>Selecione uma forma de pagamento</option>
        {formasDePagamento.map(forma => (
          <option key={forma.id} value={forma.id}>
            {forma.tipo === 'CARTÃO' ? `${forma.tipo} - ${forma.bandeira} - ${forma.cartaoTipo.toUpperCase()} ${forma.permiteParcelamento ? `(até ${forma.maxParcelas}x)` : ''}` : forma.tipo}
          </option>
        ))}
      </select>
      {formaPagamentoDetalhes && (
        <div className="mt-2">
          
          
        </div>
      )}
      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-700">Valor:</label>
        <input
          type="text"
          value={valorForma}
          onChange={(e) => setValorForma(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
        />
      </div>
      <button
        onClick={handleAdicionarForma}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Adicionar Forma de Pagamento
      </button>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Formas de Pagamento Selecionadas:</label>
        {formasSelecionadas.length === 0 ? (
          <p className="text-gray-700">Nenhuma forma de pagamento selecionada.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {formasSelecionadas.map(forma => (
              <li key={`${forma.id}-${forma.valor}`} className="py-4 flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium text-gray-900">{forma.tipo}</p>
                  {forma.tipo === 'CARTÃO' && (
                    <div>
                      <p className="text-gray-700">Bandeira: {forma.bandeira}</p>
                      <p className="text-gray-700">Tipo: {forma.cartaoTipo?.charAt(0).toUpperCase() + forma.cartaoTipo?.slice(1)}</p>
                      {forma.cartaoTipo === 'crédito' && forma.permiteParcelamento && (
                        <p className="text-gray-700">Parcelas: {forma.parcelas}x</p>
                      )}
                    </div>
                  )}
                  <p className="text-gray-700">Valor: R$ {forma.valor.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => handleRemoverForma(forma.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-4">
        <p className="text-lg font-medium">Valor Total: R$ {total.toFixed(2)}</p>
        <p className="text-lg font-medium">Valor Pago: R$ {valorPago.toFixed(2)}</p>
        <p className="text-lg font-medium">Valor a Pagar: R$ {valorRestante.toFixed(2)}</p>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={onPrevious}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
        >
          Anterior
        </button>
        <button
          onClick={onComplete}
          disabled={valorRestante !== 0}
          className={`bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition ${valorRestante !== 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Concluir Venda
        </button>
      </div>
    </div>
  );
};

export default AdicionarPagamentos;
