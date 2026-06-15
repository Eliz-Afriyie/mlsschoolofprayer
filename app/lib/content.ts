import "server-only";

import type { Book, Devotional, UploadedContent } from "./types";
import { getSupabaseAdmin, hasSupabaseConfig } from "./supabase";

const emptyUploads: UploadedContent = {
  books: [],
  devotionals: [],
};

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

type BookRow = {
  id: number;
  title: string;
  author: string;
  category: string;
  price: string;
  rating: number;
  image: string;
  excerpt: string;
  description: string;
  amazon_url: string | null;
  created_at: string;
};

type DevotionalRow = {
  id: number;
  title: string;
  category: string;
  image: string;
  devotional_date: string;
  read_time: string;
  author: string;
  scripture: string;
  excerpt: string;
  pdf_url: string | null;
  created_at: string;
};

function toBook(row: BookRow): Book {
  return {
    id: Number(row.id),
    title: row.title,
    author: row.author,
    category: row.category,
    price: row.price,
    rating: Number(row.rating),
    image: row.image,
    excerpt: row.excerpt,
    description: row.description,
    amazonUrl: row.amazon_url ?? undefined,
    createdAt: row.created_at,
  };
}

function toDevotional(row: DevotionalRow): Devotional {
  return {
    id: Number(row.id),
    title: row.title,
    category: row.category,
    image: row.image,
    date: formatDate(row.created_at),
    readTime: row.read_time,
    author: row.author,
    scripture: row.scripture,
    excerpt: row.excerpt,
    pdfUrl: row.pdf_url ?? undefined,
    createdAt: row.created_at,
  };
}

async function getSupabaseBooks({ publishedOnly = false } = {}) {
  const supabase = getSupabaseAdmin();
  let query = supabase
    .from("books")
    .select(
      "id,title,author,category,price,rating,image,excerpt,description,amazon_url,created_at"
    )
    .order("created_at", { ascending: false });

  if (publishedOnly) {
    query = query.eq("status", "published");
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((item) => toBook(item as BookRow));
}

async function getSupabaseDevotionals({ publishedOnly = false } = {}) {
  const supabase = getSupabaseAdmin();
  let query = supabase
    .from("devotionals")
    .select(
      "id,title,category,image,devotional_date,read_time,author,scripture,excerpt,pdf_url,created_at"
    )
    .order("created_at", { ascending: false });

  if (publishedOnly) {
    query = query.eq("status", "published");
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((item) => toDevotional(item as DevotionalRow));
}

export async function getBooks(): Promise<Book[]> {
  if (!hasSupabaseConfig()) {
    return [];
  }

  return getSupabaseBooks({ publishedOnly: true });
}

export async function getDevotionals(): Promise<Devotional[]> {
  if (!hasSupabaseConfig()) {
    return [];
  }

  return getSupabaseDevotionals({ publishedOnly: true });
}

export async function getUploadCounts() {
  const uploads = await getUploadedContent();

  return {
    books: uploads.books.length,
    devotionals: uploads.devotionals.length,
  };
}

export async function getUploadedContent(): Promise<UploadedContent> {
  if (!hasSupabaseConfig()) {
    return emptyUploads;
  }

  const [books, devotionals] = await Promise.all([
    getSupabaseBooks(),
    getSupabaseDevotionals(),
  ]);

  return { books, devotionals };
}

export async function addBook(book: Omit<Book, "id">) {
  if (!hasSupabaseConfig()) {
    throw new Error("Supabase is not configured.");
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("books").insert({
    title: book.title,
    author: book.author,
    category: book.category,
    price: book.price,
    rating: book.rating,
    image: book.image,
    excerpt: book.excerpt ?? book.description,
    description: book.description,
    amazon_url: book.amazonUrl || null,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function addDevotional(devotional: Omit<Devotional, "id">) {
  if (!hasSupabaseConfig()) {
    throw new Error("Supabase is not configured.");
  }

  const supabase = getSupabaseAdmin();
  const createdDate = new Date().toISOString().slice(0, 10);
  const { error } = await supabase.from("devotionals").insert({
    title: devotional.title,
    category: devotional.category,
    image: devotional.image,
    devotional_date: createdDate,
    read_time: devotional.readTime,
    author: devotional.author,
    scripture: devotional.scripture,
    excerpt: devotional.excerpt,
    pdf_url: devotional.pdfUrl || null,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateBook(
  id: number,
  book: Partial<Omit<Book, "id">>
) {
  if (!hasSupabaseConfig()) {
    throw new Error("Supabase is not configured.");
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("books")
    .update({
      title: book.title,
      author: book.author,
      category: book.category,
      price: book.price,
      rating: book.rating,
      image: book.image,
      excerpt: book.excerpt,
      description: book.description,
      amazon_url: book.amazonUrl || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateDevotional(
  id: number,
  devotional: Partial<Omit<Devotional, "id">>
) {
  if (!hasSupabaseConfig()) {
    throw new Error("Supabase is not configured.");
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("devotionals")
    .update({
      title: devotional.title,
      category: devotional.category,
      image: devotional.image,
      read_time: devotional.readTime,
      author: devotional.author,
      scripture: devotional.scripture,
      excerpt: devotional.excerpt,
      pdf_url: devotional.pdfUrl || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteBook(id: number) {
  if (!hasSupabaseConfig()) {
    throw new Error("Supabase is not configured.");
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("books").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteDevotional(id: number) {
  if (!hasSupabaseConfig()) {
    throw new Error("Supabase is not configured.");
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("devotionals").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
