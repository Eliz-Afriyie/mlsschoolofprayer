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
import {
  getSiteContent,
  saveSiteContent,
  type AboutContent,
  type ContactContent,
  type HomeContent,
  type SiteSettings,
} from "@/app/lib/site-content";

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

function checked(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function formatBookPrice(formData: FormData) {
  const rawAmount = text(formData, "priceAmount") || text(formData, "price");
  const currency = text(formData, "priceCurrency") === "USD" ? "USD" : "GHS";
  const normalizedAmount = rawAmount.replace(/[^\d.]/g, "");
  const amount = Number(normalizedAmount);

  if (!rawAmount || !Number.isFinite(amount)) {
    return "";
  }

  const formattedAmount = amount.toFixed(2);
  return currency === "USD" ? `$${formattedAmount}` : `GHS ${formattedAmount}`;
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
    const price = formatBookPrice(formData);
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
  const price = formatBookPrice(formData);
  const currentImage = text(formData, "currentImage") || defaultImage.book;
  const image = await saveImageUpload(formData.get("image"), currentImage);

  await updateBook(id, {
    title: text(formData, "title"),
    author: text(formData, "author"),
    category: text(formData, "category"),
    price,
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

async function saveCmsImage(formData: FormData, name: string, current: string) {
  if (checked(formData, `${name}Remove`)) {
    return "";
  }

  return saveImageUpload(formData.get(name), current);
}

export async function updateSiteSettings(
  _previousState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  try {
    await ensureAdmin();
    const current = await getSiteContent("site");
    const content: SiteSettings = {
      siteName: text(formData, "siteName"),
      tagline: text(formData, "tagline"),
      footerDescription: text(formData, "footerDescription"),
      footerImage: await saveCmsImage(
        formData,
        "footerImage",
        current.footerImage
      ),
      email: text(formData, "email"),
      phone: text(formData, "phone"),
      footerVisible: checked(formData, "footerVisible"),
    };

    await saveSiteContent("site", content);
    revalidatePath("/", "layout");
    return { ok: true, message: "Site settings saved." };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Unable to save settings.",
    };
  }
}

export async function updateHomeContent(
  _previousState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  try {
    await ensureAdmin();
    const current = await getSiteContent("home");
    const slides = await Promise.all(
      current.slides.map(async (slide, index) => ({
        image: await saveCmsImage(
          formData,
          `slide${index + 1}Image`,
          slide.image
        ),
        verse: text(formData, `slide${index + 1}Verse`),
        scripture: text(formData, `slide${index + 1}Scripture`),
        description: text(formData, `slide${index + 1}Description`),
        enabled: checked(formData, `slide${index + 1}Enabled`),
      }))
    );
    const content: HomeContent = {
      slides,
      heroVisible: checked(formData, "heroVisible"),
      aboutVisible: checked(formData, "aboutVisible"),
      devotionalsVisible: checked(formData, "devotionalsVisible"),
      booksVisible: checked(formData, "booksVisible"),
      aboutEyebrow: text(formData, "aboutEyebrow"),
      aboutTitle: text(formData, "aboutTitle"),
      aboutText: text(formData, "aboutText"),
      founderImage: await saveCmsImage(
        formData,
        "founderImage",
        current.founderImage
      ),
      devotionalsHeading: text(formData, "devotionalsHeading"),
      booksHeading: text(formData, "booksHeading"),
    };

    await saveSiteContent("home", content);
    revalidatePath("/");
    return { ok: true, message: "Homepage content saved." };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Unable to save homepage.",
    };
  }
}

export async function updateAboutContent(
  _previousState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  try {
    await ensureAdmin();
    const current = await getSiteContent("about");
    const currentHeroImages =
      current.heroImages?.length > 0
        ? current.heroImages
        : [current.heroImage, current.heroImage, current.heroImage];
    const heroImages = await Promise.all(
      [0, 1, 2].map((index) =>
        saveCmsImage(
          formData,
          `heroImage${index + 1}`,
          currentHeroImages[index] ?? current.heroImage
        )
      )
    );
    const content: AboutContent = {
      heroEyebrow: text(formData, "heroEyebrow"),
      heroTitle: text(formData, "heroTitle"),
      heroText: text(formData, "heroText"),
      heroImage: heroImages[0],
      heroImages,
      heroVisible: checked(formData, "heroVisible"),
      heroImagesEnabled: [0, 1, 2].map((index) =>
        checked(formData, `heroImage${index + 1}Enabled`)
      ),
      profileVisible: checked(formData, "profileVisible"),
      contactVisible: checked(formData, "contactVisible"),
      biographyVisible: checked(formData, "biographyVisible"),
      highlightsVisible: checked(formData, "highlightsVisible"),
      profileImage: await saveCmsImage(
        formData,
        "profileImage",
        current.profileImage
      ),
      sectionTitle: text(formData, "sectionTitle"),
      bioOne: text(formData, "bioOne"),
      bioTwo: text(formData, "bioTwo"),
      founderName: text(formData, "founderName"),
      phone: text(formData, "phone"),
      facebookHandle: text(formData, "facebookHandle"),
      facebookUrl: text(formData, "facebookUrl"),
      instagramHandle: text(formData, "instagramHandle"),
      instagramUrl: text(formData, "instagramUrl"),
      youtubeHandle: text(formData, "youtubeHandle"),
      youtubeUrl: text(formData, "youtubeUrl"),
      tiktokHandle: text(formData, "tiktokHandle"),
      tiktokUrl: text(formData, "tiktokUrl"),
    };

    await saveSiteContent("about", content);
    revalidatePath("/");
    revalidatePath("/about");
    return { ok: true, message: "About page content saved." };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Unable to save About page.",
    };
  }
}

export async function updateContactContent(
  _previousState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  try {
    await ensureAdmin();
    const current = await getSiteContent("contact");
    const content: ContactContent = {
      heroVisible: checked(formData, "heroVisible"),
      formVisible: checked(formData, "formVisible"),
      heroTitle: text(formData, "heroTitle"),
      heroText: text(formData, "heroText"),
      heroImage: await saveCmsImage(
        formData,
        "heroImage",
        current.heroImage
      ),
      formTitle: text(formData, "formTitle"),
    };

    await saveSiteContent("contact", content);
    revalidatePath("/contact");
    return { ok: true, message: "Contact page content saved." };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Unable to save Contact page.",
    };
  }
}
