import { useState } from 'react';
import { createAuthor } from '../service/api';
import Toast from '../components/Toast';

const CreateAuthorForm = ({ onCreated }: { onCreated?: () => void }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Author name is required.');
      return;
    }
    try {
      await createAuthor({ name });
      Toast.success('Author created!');
      setName('');
      setError('');
      onCreated?.();
    } catch (err: any) {
      console.error('❌ Author creation failed:', err.response?.data || err.message);
      Toast.error('Failed to create author.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow rounded space-y-4">
      <h2 className="text-xl font-bold text-gray-800">➕ Add Author</h2>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Author name"
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">
        Create Author
      </button>
    </form>
  );
};

export default CreateAuthorForm;