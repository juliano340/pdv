import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SelecionarCliente from './SelecionarCliente';
import AdicionarProdutos from './AdicionarProdutos';
import AdicionarPagamentos from './AdicionarPagamentos';

const VendaRapida = ({ clientes, produtos, formasDePagamento, onAddVenda }) => {
  const [clienteId, setClienteId] = useState('');
  const [itensVenda, setItensVenda] = useState([]);
  const [formasSelecionadas, setFormasSelecionadas] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    calcularTotal();
  }, [itensVenda, formasSelecionadas]);

  const calcularTotal = () => {
    const total = itensVenda.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    setTotal(total);
  };

  const handleEncerrarVenda = () => {
    if (formasSelecionadas.length === 0) {
      toast.error('Por favor, adicione pelo menos uma forma de pagamento.');
      return;
    }

    const totalFormas = formasSelecionadas.reduce((acc, forma) => acc + forma.valor, 0);
    if (totalFormas !== total) {
      toast.error('O total das formas de pagamento deve ser igual ao total da venda.');
      return;
    }

    const novaVenda = {
      id: Date.now(),
      clienteId,
      itensVenda,
      formasSelecionadas,
      total,
      data: new Date().toLocaleString(),
    };

    onAddVenda(novaVenda);
    toast.success('Venda realizada com sucesso!');
    setClienteId('');
    setItensVenda([]);
    setFormasSelecionadas([]);
    setTotal(0);
    setCurrentStep(1);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <ToastContainer />
      {/* <h2 className="text-xl font-bold mb-4">Adicionar produtos:</h2> */}
      {currentStep === 1 && (
        <SelecionarCliente
          clientes={clientes}
          clienteId={clienteId}
          setClienteId={setClienteId}
          onNext={() => setCurrentStep(2)}
        />
      )}
      {currentStep === 2 && (
        <AdicionarProdutos
          produtos={produtos}
          itensVenda={itensVenda}
          setItensVenda={setItensVenda}
          onPrevious={() => setCurrentStep(1)}
          onNext={() => setCurrentStep(3)}
        />
      )}
      {currentStep === 3 && (
        <AdicionarPagamentos
          formasDePagamento={formasDePagamento}
          formasSelecionadas={formasSelecionadas}
          setFormasSelecionadas={setFormasSelecionadas}
          total={total}
          onPrevious={() => setCurrentStep(2)}
          onComplete={handleEncerrarVenda}
        />
      )}
    </div>
  );
};

export default VendaRapida;
