import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBox, faCreditCard } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e1d2d]">
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">Sistema de Gestão</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/clientes" legacyBehavior>
            <a className="block p-6 bg-[#233243] rounded-lg shadow-lg hover:bg-[#4c5b6e] transition">
              <div className="flex items-center mb-2">
                <FontAwesomeIcon icon={faUsers} className="text-white mr-2" size="lg" />
                <h2 className="text-xl font-bold text-white">Gerenciar Clientes</h2>
              </div>
              <p className="text-gray-300">Acesse para adicionar, editar ou remover clientes.</p>
            </a>
          </Link>
          <Link href="/produtos" legacyBehavior>
            <a className="block p-6 bg-[#233243] rounded-lg shadow-lg hover:bg-[#4c5b6e] transition">
              <div className="flex items-center mb-2">
                <FontAwesomeIcon icon={faBox} className="text-white mr-2" size="lg" />
                <h2 className="text-xl font-bold text-white">Gerenciar Produtos</h2>
              </div>
              <p className="text-gray-300">Acesse para adicionar, editar ou remover produtos.</p>
            </a>
          </Link>
          <Link href="/formas-de-pagamento" legacyBehavior>
            <a className="block p-6 bg-[#233243] rounded-lg shadow-lg hover:bg-[#4c5b6e] transition">
              <div className="flex items-center mb-2">
                <FontAwesomeIcon icon={faCreditCard} className="text-white mr-2" size="lg" />
                <h2 className="text-xl font-bold text-white">Gerenciar Formas de Pagamento</h2>
              </div>
              <p className="text-gray-300">Acesse para adicionar, editar ou remover formas de pagamento.</p>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
