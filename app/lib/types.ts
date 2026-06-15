export type Book = {
  id: number;
  title: string;
  author: string;
  image: string;
  rating: number;
  category: string;
  price: string;
  description: string;
  excerpt?: string;
  amazonUrl?: string;
};

export type Devotional = {
  id: number;
  title: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
  scripture: string;
  excerpt: string;
  pdfUrl?: string;
};

export type UploadedContent = {
  books: Book[];
  devotionals: Devotional[];
};
