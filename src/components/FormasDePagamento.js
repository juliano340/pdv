import { useState, useEffect } from 'react';
import Link from 'next/link';
import FormaDePagamentoForm from './FormaDePagamentoForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const FormasDePagamento = () => {
  const [formasDePagamento, setFormasDePagamento] = useState([]);
  const [editForma, setEditForma] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Carregar formas de pagamento do localStorage ao montar o componente
    const storedFormas = localStorage.getItem('formasDePagamento');
    if (storedFormas) {
      setFormasDePagamento(JSON.parse(storedFormas));
    }
  }, []);

  const handleAddForma = (novaForma) => {
    const updatedFormas = [...formasDePagamento, novaForma];
    setFormasDePagamento(updatedFormas);
    localStorage.setItem('formasDePagamento', JSON.stringify(updatedFormas));
    toast.success('Forma de pagamento adicionada com sucesso!');
  };

  const handleEditForma = (formaEditada) => {
    const updatedFormas = formasDePagamento.map(forma => (forma.id === formaEditada.id ? formaEditada : forma));
    setFormasDePagamento(updatedFormas);
    localStorage.setItem('formasDePagamento', JSON.stringify(updatedFormas));
    toast.success('Forma de pagamento atualizada com sucesso!');
  };

  const handleDeleteForma = (id) => {
    confirmAlert({
      title: 'Confirmação de exclusão',
      message: 'Você tem certeza que deseja excluir esta forma de pagamento?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => {
            const updatedFormas = formasDePagamento.filter(forma => forma.id !== id);
            setFormasDePagamento(updatedFormas);
            localStorage.setItem('formasDePagamento', JSON.stringify(updatedFormas));
            toast.success('Forma de pagamento excluída com sucesso!');
          },
        },
        {
          label: 'Não',
        },
      ],
    });
  };

  return (
    <div className="mt-4 rounded-lg shadow-lg p-4">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <Link href="/" legacyBehavior>
            <a className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">Voltar</a>
          </Link>
          <button
            onClick={() => {
              setEditForma(null);
              setShowForm(true);
            }}
            className="bg-[#4c5b6e] text-white px-4 py-2 rounded-lg hover:bg-[#616f83] transition"
          >
            Nova Forma de Pagamento
          </button>
        </div>
      </div>
      <ul className="mt-4">
        {formasDePagamento.length === 0 ? (
          <p className="text-gray-500">Nenhuma forma de pagamento cadastrada.</p>
        ) : (
          formasDePagamento.map(forma => (
            <li key={forma.id} className="mb-2 p-4 bg-gray-200 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold">{forma.tipo}</p>
                  {forma.tipo === 'CARTÃO' && (
                    <>
                      <p>Bandeira: {forma.bandeira}</p>
                      <p>Tipo: {forma.cartaoTipo.charAt(0).toUpperCase() + forma.cartaoTipo.slice(1)}</p>
                      {forma.cartaoTipo === 'crédito' && forma.permiteParcelamento && (
                        <p>Máx Parcelas: {forma.maxParcelas}</p>
                      )}
                    </>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditForma(forma);
                      setShowForm(true);
                    }}
                    className="bg-[#4c5b6e] text-white px-4 py-2 rounded-lg hover:bg-[#616f83] transition w-full sm:w-auto"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteForma(forma.id)}
                    className="bg-[#ff003d] text-white px-4 py-2 rounded-lg hover:bg-red-400 transition w-full sm:w-auto"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
      {showForm && (
        <FormaDePagamentoForm
          onAddForma={handleAddForma}
          onEditForma={handleEditForma}
          editForma={editForma}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default FormasDePagamento;
