import Link from 'next/link';
import FormasDePagamento from '../components/FormasDePagamento';

const FormasDePagamentoPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold ">Gerenciar Formas de Pagamento</h1>
      <FormasDePagamento />
    </div>
  );
};

export default FormasDePagamentoPage;
