import { useState, useEffect } from 'react';

const FormaDePagamentoForm = ({ onAddForma, onEditForma, editForma, onCancel }) => {
  const [tipo, setTipo] = useState('');
  const [bandeira, setBandeira] = useState('');
  const [cartaoTipo, setCartaoTipo] = useState(''); // 'crédito' ou 'débito'
  const [permiteParcelamento, setPermiteParcelamento] = useState(false);
  const [maxParcelas, setMaxParcelas] = useState(1);

  useEffect(() => {
    if (editForma) {
      setTipo(editForma.tipo);
      setBandeira(editForma.bandeira || '');
      setCartaoTipo(editForma.cartaoTipo || '');
      setPermiteParcelamento(editForma.permiteParcelamento || false);
      setMaxParcelas(editForma.maxParcelas || 1);
    } else {
      setTipo('');
      setBandeira('');
      setCartaoTipo('');
      setPermiteParcelamento(false);
      setMaxParcelas(1);
    }
  }, [editForma]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const novaForma = {
      id: editForma ? editForma.id : Date.now(),
      tipo,
      bandeira: tipo === 'CARTÃO' ? bandeira : null,
      cartaoTipo: tipo === 'CARTÃO' ? cartaoTipo : null,
      permiteParcelamento: tipo === 'CARTÃO' && cartaoTipo === 'crédito' ? permiteParcelamento : false,
      maxParcelas: tipo === 'CARTÃO' && cartaoTipo === 'crédito' ? maxParcelas : 1,
    };

    if (editForma) {
      onEditForma(novaForma);
    } else {
      onAddForma(novaForma);
    }

    onCancel();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg mx-auto">
        <h2 className="text-xl font-bold mb-4">{editForma ? 'Editar Forma de Pagamento' : 'Nova Forma de Pagamento'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tipo:</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
              required
            >
              <option value="" disabled>Selecione uma forma de pagamento</option>
              <option value="DINHEIRO">Dinheiro</option>
              <option value="PIX">PIX</option>
              <option value="CARTÃO">Cartão</option>
            </select>
          </div>
          {tipo === 'CARTÃO' && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Bandeira:</label>
                <input
                  type="text"
                  value={bandeira}
                  onChange={(e) => setBandeira(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tipo de Cartão:</label>
                <select
                  value={cartaoTipo}
                  onChange={(e) => setCartaoTipo(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  required
                >
                  <option value="" disabled>Selecione o tipo de cartão</option>
                  <option value="crédito">Crédito</option>
                  <option value="débito">Débito</option>
                </select>
              </div>
              {cartaoTipo === 'crédito' && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Permite Parcelamento:</label>
                    <input
                      type="checkbox"
                      checked={permiteParcelamento}
                      onChange={(e) => setPermiteParcelamento(e.target.checked)}
                      className="mt-1"
                    />
                  </div>
                  {permiteParcelamento && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Máximo de Parcelas:</label>
                      <input
                        type="number"
                        value={maxParcelas}
                        onChange={(e) => setMaxParcelas(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                        min="2"
                        required
                      />
                    </div>
                  )}
                </>
              )}
            </>
          )}
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              {editForma ? 'Atualizar' : 'Adicionar'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormaDePagamentoForm;
