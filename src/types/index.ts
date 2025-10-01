export interface Author {
    id: number;
    name: string;
    bio?: string;
  }
  
  export interface Book {
    id: number;
    title: string;
    authorId: number;
    description?: string;
    publishedYear?: number;
    author: Author; 
  }