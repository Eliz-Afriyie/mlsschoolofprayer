import "server-only";

import path from "path";
import { getSupabaseAdmin, hasSupabaseConfig } from "./supabase";

const bucket = "media";
const allowedImageTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

async function uploadSupabaseFile(
  file: File,
  folder: string,
  filename: string
) {
  const supabase = getSupabaseAdmin();
  const key = `${folder}/${filename}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const createResult = await supabase.storage.createBucket(bucket, {
    public: true,
  });

  if (
    createResult.error &&
    !createResult.error.message.toLowerCase().includes("already exists")
  ) {
    throw new Error(createResult.error.message);
  }

  const { error } = await supabase.storage
    .from(bucket)
    .upload(key, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(key);
  return data.publicUrl;
}

async function saveFile(file: File, folder: string, extension: string) {
  if (!hasSupabaseConfig()) {
    throw new Error("Supabase is not configured.");
  }

  const safeExtension = extension.startsWith(".") ? extension : `.${extension}`;
  const filename = `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}${safeExtension}`;

  return uploadSupabaseFile(file, folder, filename);
}

export async function saveImageUpload(
  file: FormDataEntryValue | null,
  fallback: string
) {
  if (!(file instanceof File) || file.size === 0) {
    return fallback;
  }

  if (!allowedImageTypes.has(file.type)) {
    throw new Error("Please upload a JPG, PNG, WebP, or GIF image.");
  }

  if (file.size > 2 * 1024 * 1024) {
    throw new Error("Images must be 2MB or smaller.");
  }

  const extension = path.extname(file.name) || ".jpg";
  return saveFile(file, "images", extension);
}

export async function savePdfUpload(
  file: FormDataEntryValue | null,
  fallback = ""
) {
  if (!(file instanceof File) || file.size === 0) {
    return fallback;
  }

  if (file.type !== "application/pdf") {
    throw new Error("Please upload a PDF file.");
  }

  if (file.size > 8 * 1024 * 1024) {
    throw new Error("PDF files must be 8MB or smaller.");
  }

  return saveFile(file, "pdfs", ".pdf");
}
