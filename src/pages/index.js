import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">PDV/CAIXA</h1>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <Link href="/nova-venda">
            Iniciar Nova Venda
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/clientes">
            Gerenciar Clientes
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/produtos">
            Gerenciar Produtos
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/pagamento">
            Gerenciar Formas de Pagamento
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
