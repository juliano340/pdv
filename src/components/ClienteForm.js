import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const ClienteForm = ({ onAddCliente, onEditCliente, editCliente, onCancelEdit, highlightNome }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [error, setError] = useState('');
  const [highlightFields, setHighlightFields] = useState({
    nome: false,
    email: false,
    telefone: false,
  });

  useEffect(() => {
    if (editCliente) {
      setNome(editCliente.nome);
      setEmail(editCliente.email);
      setTelefone(editCliente.telefone);
    } else {
      setNome('');
      setEmail('');
      setTelefone('');
    }
  }, [editCliente]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const highlight = {
      nome: !nome,
      email: !email,
      telefone: !telefone,
    };

    setHighlightFields(highlight);

    if (!nome || !email || !telefone) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    if (editCliente) {
      onEditCliente({ ...editCliente, nome, email, telefone });
      onCancelEdit();
      toast.success('Cliente atualizado com sucesso!');
    } else {
      const novoCliente = { id: Date.now(), nome, email, telefone };
      onAddCliente(novoCliente);
      onCancelEdit(); // Esconde o formulário após adicionar o cliente
      toast.success('Cliente adicionado com sucesso!');
    }

    setNome('');
    setEmail('');
    setTelefone('');
    setError('');
    setHighlightFields({ nome: false, email: false, telefone: false }); // Remover destaque dos campos
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-4 m-4 shadow rounded-lg ${editCliente ? 'bg-[#4c5b6e]' : 'bg-[#384658]'} w-full max-w-4xl mx-auto`}
    >
      <h3 className="text-xl font-bold mb-4 text-white">{editCliente ? 'Editar Cliente' : 'Adicionar Cliente'}</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => {
            setNome(e.target.value);
            if (e.target.value) {
              setHighlightFields((prev) => ({ ...prev, nome: false }));
            }
          }}
          className={`mt-1 p-2 border ${highlightFields.nome ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full`}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (e.target.value) {
              setHighlightFields((prev) => ({ ...prev, email: false }));
            }
          }}
          className={`mt-1 p-2 border ${highlightFields.email ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full`}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">Telefone:</label>
        <input
          type="text"
          value={telefone}
          onChange={(e) => {
            setTelefone(e.target.value);
            if (e.target.value) {
              setHighlightFields((prev) => ({ ...prev, telefone: false }));
            }
          }}
          className={`mt-1 p-2 border ${highlightFields.telefone ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full`}
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex flex-col sm:flex-row sm:space-x-2">
        <button
          type="submit"
          className="bg-[#233243] text-white px-4 py-2 rounded-lg hover:bg-[#384658] transition mb-2 sm:mb-0 w-full sm:w-auto"
        >
          {editCliente ? 'Atualizar Cliente' : 'Adicionar Cliente'}
        </button>
        <button
          type="button"
          onClick={onCancelEdit}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition w-full sm:w-auto"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ClienteForm;
