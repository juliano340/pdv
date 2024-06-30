import { useState, useEffect } from 'react';

const SelecionarCliente = ({ clientes, clienteId, setClienteId, clienteSelecionado, setClienteSelecionado, onNext }) => {
  const [searchTermCliente, setSearchTermCliente] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    if (clienteId && !clienteSelecionado) {
      const cliente = clientes.find(c => c.id === clienteId);
      if (cliente) {
        setClienteSelecionado(cliente);
      }
    }
  }, [clienteId, clienteSelecionado, clientes, setClienteSelecionado]);

  const filteredClientes = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTermCliente.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTermCliente.toLowerCase()) ||
    cliente.telefone.includes(searchTermCliente)
  );

  const handleSelecionarCliente = (cliente) => {
    setClienteId(cliente.id);
    setClienteSelecionado(cliente);
    setSearchTermCliente('');
    setFocusedIndex(-1);
  };

  const handleRemoverCliente = () => {
    setClienteId('');
    setClienteSelecionado(null);
  };

  const handleKeyDown = (e) => {
    if (filteredClientes.length === 0) return;

    if (e.key === 'ArrowDown') {
      setFocusedIndex((prevIndex) => (prevIndex + 1) % filteredClientes.length);
    } else if (e.key === 'ArrowUp') {
      setFocusedIndex((prevIndex) => (prevIndex - 1 + filteredClientes.length) % filteredClientes.length);
    } else if (e.key === 'Enter' && focusedIndex !== -1) {
      handleSelecionarCliente(filteredClientes[focusedIndex]);
    }
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
            onKeyDown={handleKeyDown}
            placeholder="Digite nome, email ou telefone"
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
          />
          {searchTermCliente && (
            <ul className="mt-2 border border-gray-300 rounded-lg max-h-40 overflow-y-auto">
              {filteredClientes.length === 0 ? (
                <li className="p-2 text-gray-700">Nenhum cliente encontrado.</li>
              ) : (
                filteredClientes.map((cliente, index) => (
                  <li
                    key={cliente.id}
                    className={`p-2 hover:bg-gray-200 cursor-pointer ${index === focusedIndex ? 'bg-gray-200' : ''}`}
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
