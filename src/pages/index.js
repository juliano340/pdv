import Link from 'next/link';

const Home = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Sistema de Gestão</h1>
      <div className="space-y-4">
        <Link href="/clientes" legacyBehavior>
          <a className="block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Gerenciar Clientes
          </a>
        </Link>
        <Link href="/produtos" legacyBehavior>
          <a className="block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Gerenciar Produtos
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
