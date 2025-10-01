import { useState, useEffect } from 'react';
import { updateBook, getAuthors } from '../service/api';
import type { Author, Book } from '../types';
import Toast from '../components/Toast';

interface EditBookFormProps {
  book: Book;
  onClose: () => void;
}

const EditBookForm = ({ book, onClose }: EditBookFormProps) => {
  const [form, setForm] = useState({
    title: book.title,
    description: book.description ?? '',
    publishedYear: String(book.publishedYear),
    authorId: String(book.authorId),
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
      await updateBook(book.id, {
        ...form,
        authorId: Number(form.authorId),
        publishedYear: Number(form.publishedYear),
      });
      Toast.success('✅ Book updated successfully!');
      onClose();
    } catch (err) {
      console.error(err);
      Toast.error('❌ Failed to update book.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 max-w-xl mx-auto animate-fade-in"
    >
      <h2 className="text-3xl font-bold text-indigo-700 mb-4 flex items-center gap-2">
        ✏️ Edit Book
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
            placeholder="Brief description"
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
            placeholder="e.g. 2023"
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
            <option value="">Select an author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end mt-6 gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default EditBookForm;
