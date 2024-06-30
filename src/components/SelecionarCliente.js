import { useState } from 'react';

const SelecionarCliente = ({ clientes, clienteId, setClienteId, onNext }) => {
  const [searchTermCliente, setSearchTermCliente] = useState('');
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  const filteredClientes = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTermCliente.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTermCliente.toLowerCase()) ||
    cliente.telefone.includes(searchTermCliente)
  );

  const handleSelecionarCliente = (cliente) => {
    setClienteId(cliente.id);
    setClienteSelecionado(cliente);
    setSearchTermCliente('');
  };

  const handleRemoverCliente = () => {
    setClienteId('');
    setClienteSelecionado(null);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Cliente:</label>
      {clienteSelecionado ? (
        <div className="flex items-center justify-between p-2 border border-gray-300 rounded-lg bg-gray-100">
          <span>{clienteSelecionado.nome} - {clienteSelecionado.email} - {clienteSelecionado.telefone}</span>
          <button
            onClick={handleRemoverCliente}
            className="ml-2 bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
          >
            Remover
          </button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={searchTermCliente}
            onChange={(e) => setSearchTermCliente(e.target.value)}
            placeholder="Digite nome, email ou telefone"
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
          />
          {searchTermCliente && (
            <ul className="mt-2 border border-gray-300 rounded-lg max-h-40 overflow-y-auto">
              {filteredClientes.length === 0 ? (
                <li className="p-2 text-gray-700">Nenhum cliente encontrado.</li>
              ) : (
                filteredClientes.map(cliente => (
                  <li
                    key={cliente.id}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSelecionarCliente(cliente)}
                  >
                    {cliente.nome} - {cliente.email} - {cliente.telefone}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      )}
      {clienteSelecionado && (
        <button
          onClick={onNext}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Próximo
        </button>
      )}
    </div>
  );
};

export default SelecionarCliente;
