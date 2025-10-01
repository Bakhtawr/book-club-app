import axios from 'axios';
import type { Book, Author } from '../types';

const API_BASE = 'http://localhost:3000'; // Update if needed

// 📚 BOOKS
export const getBooks = async (): Promise<Book[]> => {
  const res = await axios.get(`${API_BASE}/books`);
  return res.data;
};

export const getBookById = async (id: number): Promise<Book> => {
  const res = await axios.get(`${API_BASE}/books/${id}`);
  return res.data;
};

export const createBook = async (book: Partial<Book>) => {
  const res = await axios.post(`${API_BASE}/books`, book);
  return res.data;
};

export const updateBook = async (id: number, book: Partial<Book>) => {
  const res = await axios.put(`${API_BASE}/books/${id}`, book);
  return res.data;
};

export const deleteBook = async (id: number) => {
  await axios.delete(`${API_BASE}/books/${id}`);
};

// 👤 AUTHORS
export const getAuthors = async (): Promise<Author[]> => {
  const res = await axios.get(`${API_BASE}/authors`);
  return res.data;
};

export const getAuthorById = async (id: number): Promise<Author> => {
  const res = await axios.get(`${API_BASE}/authors/${id}`);
  return res.data;
};

export const createAuthor = async (author: Partial<Author>) => {
  const res = await axios.post(`${API_BASE}/authors`, author);
  return res.data;
};

export const updateAuthor = async (id: number, author: Partial<Author>) => {
  const res = await axios.put(`${API_BASE}/authors/${id}`, author);
  return res.data;
};

export const deleteAuthor = async (id: number) => {
  const res = await axios.delete(`${API_BASE}/authors/${id}`);
  return res.data;
};