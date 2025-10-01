import { useState, useEffect } from 'react';
import { createBook, getAuthors } from '../service/api';
import type { Author } from '../types';
import Toast from '../components/Toast';

const CreateBookForm = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    publishedYear: '',
    authorId: '',
  });

  const [authors, setAuthors] = useState<Author[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getAuthors()
      .then(setAuthors)
      .catch(() => setError('⚠️ Failed to load authors.'));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.publishedYear || !form.authorId) {
      setError('⚠️ Please fill all required fields.');
      return;
    }

    try {
      await createBook({
        ...form,
        authorId: Number(form.authorId),
        publishedYear: Number(form.publishedYear),
      });

      Toast.success('✅ Book created successfully!');
      setForm({ title: '', description: '', publishedYear: '', authorId: '' });
      setError('');
    } catch (err) {
      console.error(err);
      Toast.error('❌ Failed to create book.');
      setError('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 max-w-xl mx-auto mt-10 animate-fade-in"
    >
      <h2 className="text-3xl font-bold text-indigo-700 mb-4 flex items-center gap-2">
        ➕ Add New Book
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter book title"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Optional description"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <div>
          <label htmlFor="publishedYear" className="block text-sm font-medium text-gray-700 mb-1">
            Published Year <span className="text-red-500">*</span>
          </label>
          <input
            id="publishedYear"
            name="publishedYear"
            type="number"
            value={form.publishedYear}
            onChange={handleChange}
            placeholder="e.g. 2025"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <div>
          <label htmlFor="authorId" className="block text-sm font-medium text-gray-700 mb-1">
            Author <span className="text-red-500">*</span>
          </label>
          <select
            id="authorId"
            name="authorId"
            value={form.authorId}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            <option value="">Select Author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
      >
        Create Book
      </button>
    </form>
  );
};

export default CreateBookForm;
