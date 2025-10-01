import { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../service/api';
import type { Book } from '../types';
import EditBookForm from './EditBookForm'; 
import Toast from '../components/Toast';

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    getBooks().then(setBooks);
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteBook(id);
      Toast.success('Book deleted!');
      setBooks(prev => prev.filter(book => book.id !== id));
    } catch (err: any) {
      console.error('❌ Delete failed:', err.response?.data || err.message || err);
      Toast.error('Failed to delete book.');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-indigo-700">📚 Beautiful Book Library</h2>

      {selectedBook && (
        <div className="mb-8 border border-indigo-200 rounded-lg shadow-lg p-6 bg-indigo-50">
          <EditBookForm
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
          />
        </div>
      )}

      {books.length === 0 ? (
        <p className="text-gray-500 text-center">No books found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map(book => (
            <li
              key={book.id}
              className="bg-white border border-gray-200 hover:shadow-xl shadow-md p-5 rounded-xl relative group transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">{book.title}</h3>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Author:</span> {book.author?.name ?? 'Unknown'}
              </p>
              <p className="text-sm text-gray-500 mb-1">{book.description}</p>
              <p className="text-xs text-gray-400 italic">Published: {book.publishedYear}</p>

              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => setSelectedBook(book)}
                  className="bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 text-sm shadow"
                  title="Edit this book"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200 text-sm shadow"
                  title="Delete this book"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Books;
