import { useEffect, useState } from 'react';
import { getAuthors, deleteAuthor, updateAuthor } from '../service/api';
import type { Author } from '../types';
import Toast from '../components/Toast';

const Authors = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');

  const fetchAuthors = async () => {
    const data = await getAuthors();
    setAuthors(data);
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteAuthor(id);
      Toast.success('Author deleted!');
      setAuthors(prev => prev.filter(a => a.id !== id));
    } catch (err: any) {
      console.error('❌ Delete failed:', err.response?.data || err.message);
      Toast.error('Failed to delete author.');
    }
  };

  const handleUpdate = async () => {
    if (!editName.trim()) return;
    try {
      await updateAuthor(editingId!, { name: editName });
      Toast.success('Author updated!');
      setEditingId(null);
      setEditName('');
      fetchAuthors();
    } catch (err: any) {
      console.error('❌ Update failed:', err.response?.data || err.message);
      Toast.error('Failed to update author.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">👤 Author List</h2>
      <ul className="space-y-4">
        {authors.map(author => (
          <li key={author.id} className="bg-white shadow p-4 rounded relative group">
            {editingId === author.id ? (
              <div className="flex gap-2">
                <input
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button onClick={handleUpdate} className="text-green-600 hover:text-green-800">💾</button>
                <button onClick={() => setEditingId(null)} className="text-gray-600 hover:text-gray-800">❌</button>
              </div>
            ) : (
              <>
                <p className="text-lg font-semibold">{author.name}</p>
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button onClick={() => { setEditingId(author.id); setEditName(author.name); }} className="text-blue-600 hover:text-blue-800">✏️</button>
                  <button onClick={() => handleDelete(author.id)} className="text-red-600 hover:text-red-800">🗑️</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Authors;