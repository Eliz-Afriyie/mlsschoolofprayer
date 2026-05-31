import "server-only";

import { promises as fs } from "fs";
import path from "path";
import { books as staticBooks } from "@/data/books";
import { devotionals as staticDevotionals } from "@/data/devotionals";
import type { Book, Devotional, UploadedContent } from "./types";

const uploadsPath = path.join(process.cwd(), "data", "uploads.json");

const emptyUploads: UploadedContent = {
  books: [],
  devotionals: [],
};

async function readUploads(): Promise<UploadedContent> {
  try {
    const file = await fs.readFile(uploadsPath, "utf8");
    const parsed = JSON.parse(file) as Partial<UploadedContent>;

    return {
      books: Array.isArray(parsed.books) ? parsed.books : [],
      devotionals: Array.isArray(parsed.devotionals) ? parsed.devotionals : [],
    };
  } catch (error) {
    const nodeError = error as NodeJS.ErrnoException;

    if (nodeError.code === "ENOENT") {
      return emptyUploads;
    }

    throw error;
  }
}

async function writeUploads(content: UploadedContent) {
  await fs.mkdir(path.dirname(uploadsPath), { recursive: true });
  await fs.writeFile(uploadsPath, JSON.stringify(content, null, 2));
}

export async function getBooks(): Promise<Book[]> {
  const uploads = await readUploads();
  return [...uploads.books, ...staticBooks];
}

export async function getDevotionals(): Promise<Devotional[]> {
  const uploads = await readUploads();
  return [...uploads.devotionals, ...staticDevotionals];
}

export async function getUploadCounts() {
  const uploads = await readUploads();

  return {
    books: uploads.books.length,
    devotionals: uploads.devotionals.length,
  };
}

export async function getUploadedContent(): Promise<UploadedContent> {
  return readUploads();
}

export async function addBook(book: Omit<Book, "id">) {
  const uploads = await readUploads();
  const existing = [...uploads.books, ...staticBooks];
  const nextId = Math.max(0, ...existing.map((item) => item.id)) + 1;

  uploads.books.unshift({
    id: nextId,
    ...book,
  });

  await writeUploads(uploads);
}

export async function addDevotional(devotional: Omit<Devotional, "id">) {
  const uploads = await readUploads();
  const existing = [...uploads.devotionals, ...staticDevotionals];
  const nextId = Math.max(0, ...existing.map((item) => item.id)) + 1;

  uploads.devotionals.unshift({
    id: nextId,
    ...devotional,
  });

  await writeUploads(uploads);
}

export async function updateBook(
  id: number,
  book: Partial<Omit<Book, "id">>
) {
  const uploads = await readUploads();
  const index = uploads.books.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new Error("Only uploaded books can be edited.");
  }

  uploads.books[index] = {
    ...uploads.books[index],
    ...book,
  };

  await writeUploads(uploads);
}

export async function updateDevotional(
  id: number,
  devotional: Partial<Omit<Devotional, "id">>
) {
  const uploads = await readUploads();
  const index = uploads.devotionals.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new Error("Only uploaded devotionals can be edited.");
  }

  uploads.devotionals[index] = {
    ...uploads.devotionals[index],
    ...devotional,
  };

  await writeUploads(uploads);
}

export async function deleteBook(id: number) {
  const uploads = await readUploads();
  uploads.books = uploads.books.filter((item) => item.id !== id);
  await writeUploads(uploads);
}

export async function deleteDevotional(id: number) {
  const uploads = await readUploads();
  uploads.devotionals = uploads.devotionals.filter((item) => item.id !== id);
  await writeUploads(uploads);
}
