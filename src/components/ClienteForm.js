import { useState, useEffect } from 'react';

const ClienteForm = ({ onAddCliente, onEditCliente, editCliente, onCancelEdit, highlightNome }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [highlightFields, setHighlightFields] = useState({ nome: false, email: false, telefone: false });

  useEffect(() => {
    if (editCliente) {
      setNome(editCliente.nome);
      setEmail(editCliente.email);
      setTelefone(editCliente.telefone);
      setHighlightFields({ nome: false, email: false, telefone: false });
    } else {
      setNome('');
      setEmail('');
      setTelefone('');
    }
  }, [editCliente]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome || !email || !telefone) {
      setHighlightFields({
        nome: !nome,
        email: !email,
        telefone: !telefone,
      });
      return;
    }

    const novoCliente = {
      id: editCliente ? editCliente.id : Date.now(),
      nome,
      email,
      telefone,
    };

    if (editCliente) {
      onEditCliente(novoCliente);
    } else {
      onAddCliente(novoCliente);
    }

    onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit} className={`p-4 shadow rounded-lg bg-gray-50 w-full ${highlightNome ? 'border border-red-500' : ''}`}>
      <h3 className="text-xl font-bold mb-4">{editCliente ? 'Editar Cliente' : 'Adicionar Cliente'}</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Nome:</label>
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
        <label className="block text-sm font-medium text-gray-700">Email:</label>
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
        <label className="block text-sm font-medium text-gray-700">Telefone:</label>
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
      <div className="flex justify-end space-x-2">
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
          {editCliente ? 'Atualizar' : 'Adicionar'}
        </button>
        <button type="button" onClick={onCancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ClienteForm;
