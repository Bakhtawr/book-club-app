// src/api/client.ts
export const API_URL = import.meta.env.VITE_API_URL;

export async function fetchBooks() {
  const res = await fetch(`${API_URL}/books`);
  return res.json();
}

export async function fetchAuthors() {
  const res = await fetch(`${API_URL}/authors`);
  return res.json();
}