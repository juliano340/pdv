import Link from 'next/link';
import FormasDePagamento from '../components/FormasDePagamento';

const FormasDePagamentoPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Formas de Pagamento</h1>
      <FormasDePagamento />
    </div>
  );
};

export default FormasDePagamentoPage;
