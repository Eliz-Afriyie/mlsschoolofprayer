"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearAdminSession,
  createAdminSession,
  getAdminCredentials,
  isAdminAuthenticated,
} from "@/app/lib/admin-auth";
import {
  addBook,
  addDevotional,
  deleteBook,
  deleteDevotional,
  updateBook,
  updateDevotional,
} from "@/app/lib/content";
import { saveImageUpload, savePdfUpload } from "@/app/lib/media";

export type AdminActionState = {
  ok?: boolean;
  message: string;
};

const defaultImage = {
  book: "/books/book-1.webp",
  devotional: "/devotional/devo.jpg",
};

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

async function ensureAdmin() {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Unauthorized");
  }
}

export async function loginAdmin(
  _previousState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  const username = text(formData, "username");
  const password = text(formData, "password");
  const credentials = getAdminCredentials();

  if (username !== credentials.username || password !== credentials.password) {
    return {
      ok: false,
      message: "The username or password is incorrect.",
    };
  }

  await createAdminSession(username);
  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function createBook(
  _previousState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  try {
    await ensureAdmin();

    const title = text(formData, "title");
    const author = text(formData, "author");
    const category = text(formData, "category");
    const price = text(formData, "price");
    const rating = Number(text(formData, "rating") || "5");
    const excerpt = text(formData, "excerpt");
    const description = text(formData, "description") || excerpt;
    const amazonUrl = text(formData, "amazonUrl");

    if (!title || !author || !category || !price || !excerpt) {
      return {
        ok: false,
        message: "Please fill in every required book field.",
      };
    }

    const image = await saveImageUpload(
      formData.get("image"),
      defaultImage.book
    );

    await addBook({
      title,
      author,
      category,
      price,
      rating: Number.isFinite(rating) ? rating : 5,
      excerpt,
      description,
      amazonUrl,
      image,
    });

    revalidatePath("/");
    revalidatePath("/books");

    return {
      ok: true,
      message: "Book uploaded successfully.",
    };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Unable to upload the book.",
    };
  }
}

export async function createDevotional(
  _previousState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  try {
    await ensureAdmin();

    const title = text(formData, "title");
    const category = text(formData, "category");
    const readTime = text(formData, "readTime");
    const author = text(formData, "author");
    const scripture = text(formData, "scripture");
    const excerpt = text(formData, "excerpt");

    if (
      !title ||
      !category ||
      !readTime ||
      !author ||
      !scripture ||
      !excerpt
    ) {
      return {
        ok: false,
        message: "Please fill in every required devotional field.",
      };
    }

    const image = await saveImageUpload(
      formData.get("image"),
      defaultImage.devotional
    );
    const pdfUrl = await savePdfUpload(formData.get("pdf"));

    await addDevotional({
      title,
      category,
      date: "",
      readTime,
      author,
      scripture,
      excerpt,
      image,
      pdfUrl,
    });

    revalidatePath("/");
    revalidatePath("/devotional");

    return {
      ok: true,
      message: "Devotional uploaded successfully.",
    };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to upload the devotional.",
    };
  }
}

export async function editBook(formData: FormData) {
  await ensureAdmin();

  const id = Number(text(formData, "id"));
  const rating = Number(text(formData, "rating") || "5");
  const excerpt = text(formData, "excerpt");
  const currentImage = text(formData, "currentImage") || defaultImage.book;
  const image = await saveImageUpload(formData.get("image"), currentImage);

  await updateBook(id, {
    title: text(formData, "title"),
    author: text(formData, "author"),
    category: text(formData, "category"),
    price: text(formData, "price"),
    rating: Number.isFinite(rating) ? rating : 5,
    excerpt,
    description: excerpt,
    amazonUrl: text(formData, "amazonUrl"),
    image,
  });

  revalidatePath("/");
  revalidatePath("/books");
  revalidatePath("/admin");
}

export async function editDevotional(formData: FormData) {
  await ensureAdmin();

  const id = Number(text(formData, "id"));
  const currentImage =
    text(formData, "currentImage") || defaultImage.devotional;
  const currentPdf = text(formData, "currentPdf");
  const image = await saveImageUpload(formData.get("image"), currentImage);
  const pdfUrl = await savePdfUpload(formData.get("pdf"), currentPdf);

  await updateDevotional(id, {
    title: text(formData, "title"),
    category: text(formData, "category"),
    readTime: text(formData, "readTime"),
    author: text(formData, "author"),
    scripture: text(formData, "scripture"),
    excerpt: text(formData, "excerpt"),
    image,
    pdfUrl,
  });

  revalidatePath("/");
  revalidatePath("/devotional");
  revalidatePath("/admin");
}

export async function removeBook(formData: FormData) {
  await ensureAdmin();
  await deleteBook(Number(text(formData, "id")));

  revalidatePath("/");
  revalidatePath("/books");
  revalidatePath("/admin");
}

export async function removeDevotional(formData: FormData) {
  await ensureAdmin();
  await deleteDevotional(Number(text(formData, "id")));

  revalidatePath("/");
  revalidatePath("/devotional");
  revalidatePath("/admin");
}
