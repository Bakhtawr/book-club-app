import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Books from './pages/Books';
import CreateBookForm from './pages/CreateBookForm';
import AuthorPage from './pages/AuthorsPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="p-6">
          <Routes>
            <Route path="/" element={<Books />} />
            <Route path="/books/new" element={<CreateBookForm />} />
            <Route path="/authors" element={<AuthorPage />} />
            {/* Add more routes if needed */}
          </Routes>
        </main>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </BrowserRouter>
  );
}

export default App;

// ✅ Header component below
function Header() {
  const navLinkClass =
    'px-4 py-2 rounded-md text-sm font-medium transition hover:bg-indigo-100 hover:text-indigo-800';

  const activeClass = 'bg-indigo-600 text-white';

  return (
    <header className="bg-white shadow sticky top-0 z-10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-700">📚 Book Dashboard</h1>
        <div className="flex gap-4">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? activeClass : 'text-gray-700'}`
            }
          >
            Books
          </NavLink>
          <NavLink
            to="/authors"
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? activeClass : 'text-gray-700'}`
            }
          >
            Authors
          </NavLink>
          <NavLink
            to="/books/new"
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? activeClass : 'text-gray-700'}`
            }
          >
            ➕ Add Book
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
