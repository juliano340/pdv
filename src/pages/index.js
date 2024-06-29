import Link from 'next/link';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e1d2d]">
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">Sistema de Gestão</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/clientes" legacyBehavior>
            <a className="block p-6 bg-[#233243] rounded-lg shadow-lg hover:bg-[#4c5b6e] transition">
              <h2 className="text-xl font-bold mb-2 text-white">Gerenciar Clientes</h2>
              <p className="text-gray-300">Acesse para adicionar, editar ou remover clientes.</p>
            </a>
          </Link>
          <Link href="/produtos" legacyBehavior>
            <a className="block p-6 bg-[#233243] rounded-lg shadow-lg hover:bg-[#4c5b6e] transition">
              <h2 className="text-xl font-bold mb-2 text-white">Gerenciar Produtos</h2>
              <p className="text-gray-300">Acesse para adicionar, editar ou remover produtos.</p>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
