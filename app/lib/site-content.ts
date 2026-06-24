import "server-only";

import { getSupabaseAdmin, hasSupabaseConfig } from "./supabase";

export type HeroSlide = {
  image: string;
  verse: string;
  scripture: string;
  description: string;
  enabled: boolean;
};

export type SiteSettings = {
  siteName: string;
  tagline: string;
  footerDescription: string;
  footerImage: string;
  email: string;
  phone: string;
  footerVisible: boolean;
};

export type HomeContent = {
  slides: HeroSlide[];
  heroVisible: boolean;
  aboutVisible: boolean;
  devotionalsVisible: boolean;
  booksVisible: boolean;
  aboutEyebrow: string;
  aboutTitle: string;
  aboutText: string;
  founderImage: string;
  devotionalsHeading: string;
  booksHeading: string;
};

export type AboutContent = {
  heroVisible: boolean;
  heroImagesEnabled: boolean[];
  profileVisible: boolean;
  contactVisible: boolean;
  biographyVisible: boolean;
  highlightsVisible: boolean;
  heroEyebrow: string;
  heroTitle: string;
  heroText: string;
  heroImage: string;
  heroImages: string[];
  heroImagePositions: string[];
  profileImage: string;
  sectionTitle: string;
  bioOne: string;
  bioTwo: string;
  founderName: string;
  phone: string;
  facebookHandle: string;
  facebookUrl: string;
  instagramHandle: string;
  instagramUrl: string;
  youtubeHandle: string;
  youtubeUrl: string;
  tiktokHandle: string;
  tiktokUrl: string;
};

export type ContactContent = {
  heroVisible: boolean;
  formVisible: boolean;
  heroTitle: string;
  heroText: string;
  heroImage: string;
  formTitle: string;
};

export const defaultSiteSettings: SiteSettings = {
  siteName: "mlsschoolofprayer",
  tagline: "Reflections of His Word & Prayer",
  footerDescription:
    "Inspiring hearts and equipping believers through God's Word.",
  footerImage: "/devotional/devo6.jpg",
  email: "hello@graceandtruth.com",
  phone: "+1 (234) 456-7890",
  footerVisible: true,
};

export const defaultHomeContent: HomeContent = {
  slides: [
    {
      image: "/herobg.png",
      verse: "\"Be still, and know that I am God.\"",
      scripture: "Psalm 46:10",
      description:
        "Daily devotionals to strengthen your faith and deepen your walk with God.",
      enabled: true,
    },
    {
      image: "/herobg2.jpg",
      verse: "\"The Lord is my shepherd; I shall not want.\"",
      scripture: "Psalm 23:1",
      description:
        "Find peace, hope, and encouragement through the truth of Scripture.",
      enabled: true,
    },
    {
      image: "/hero3.jpg",
      verse: "\"I can do all things through Christ.\"",
      scripture: "Philippians 4:13",
      description:
        "Grow spiritually with Christian books, articles, and devotionals.",
      enabled: true,
    },
  ],
  heroVisible: true,
  aboutVisible: true,
  devotionalsVisible: true,
  booksVisible: true,
  aboutEyebrow: "About Prophet Lingston",
  aboutTitle: "A voice of prayer, biblical direction, and spiritual growth.",
  aboutText:
    "Prophet Lingston is an associate pastor at Fountain Gate Chapel International, Desert Pastures. Through the School of Prayer, he equips believers with strategic prayer education, biblical devotionals, and practical direction for a stronger walk with God.",
  founderImage: "",
  devotionalsHeading: "Latest Devotionals",
  booksHeading: "Featured Books",
};

export const defaultAboutContent: AboutContent = {
  heroVisible: true,
  heroImagesEnabled: [true, true, true],
  profileVisible: true,
  contactVisible: true,
  biographyVisible: true,
  highlightsVisible: true,
  heroEyebrow: "About the Founder",
  heroTitle: "Prophet Lingston",
  heroText:
    "Associate pastor at Fountain Gate Chapel International, Desert Pastures, and the voice behind the School of Prayer.",
  heroImage: "/devotional/devo-hero.jpg",
  heroImages: [
    "/devotional/devo-hero.jpg",
    "/herobg2.jpg",
    "/hero3.jpg",
  ],
  heroImagePositions: ["center top", "center center", "center center"],
  profileImage: "",
  sectionTitle: "About Prophet Lingston",
  bioOne:
    "Prophet Lingston is an associate pastor at Fountain Gate Chapel International, Desert Pastures. His ministry is centered on helping believers grow in prayer, receive biblical direction, and walk with spiritual discipline and confidence.",
  bioTwo:
    "Through the School of Prayer, he provides strategic prayer education, devotionals, teachings, and faith-building resources for the body of Christ.",
  founderName: "Prophet Lingston",
  phone: "+233 XX XXX XXXX",
  facebookHandle: "MLS School of Prayer",
  facebookUrl: "",
  instagramHandle: "@mlsschoolofprayer",
  instagramUrl: "",
  youtubeHandle: "MLS School of Prayer",
  youtubeUrl: "",
  tiktokHandle: "@mlsschoolofprayer",
  tiktokUrl: "",
};

export const defaultContactContent: ContactContent = {
  heroVisible: true,
  formVisible: true,
  heroTitle: "Contact Us",
  heroText:
    "We'd love to hear from you. Reach out for questions, prayer requests, or collaborations.",
  heroImage: "/hero3.jpg",
  formTitle: "Send us a message",
};

type ContentMap = {
  site: SiteSettings;
  home: HomeContent;
  about: AboutContent;
  contact: ContactContent;
};

const defaults: ContentMap = {
  site: defaultSiteSettings,
  home: defaultHomeContent,
  about: defaultAboutContent,
  contact: defaultContactContent,
};

export async function getSiteContent<K extends keyof ContentMap>(
  section: K
): Promise<ContentMap[K]> {
  if (!hasSupabaseConfig()) {
    return defaults[section];
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("site_content")
    .select("content")
    .eq("section", section)
    .maybeSingle();

  if (error) {
    if (error.code === "42P01") {
      return defaults[section];
    }
    throw new Error(error.message);
  }

  const storedContent = (data?.content ?? {}) as Partial<ContentMap[K]>;

  if (section === "about") {
    const storedAbout = storedContent as Partial<AboutContent>;

    if (
      !Array.isArray(storedAbout.heroImages) &&
      typeof storedAbout.heroImage === "string" &&
      storedAbout.heroImage
    ) {
      storedAbout.heroImages = [
        storedAbout.heroImage,
        defaultAboutContent.heroImages[1],
        defaultAboutContent.heroImages[2],
      ];
    }

    if (!Array.isArray(storedAbout.heroImagesEnabled)) {
      storedAbout.heroImagesEnabled = defaultAboutContent.heroImagesEnabled;
    }

    if (!Array.isArray(storedAbout.heroImagePositions)) {
      storedAbout.heroImagePositions =
        defaultAboutContent.heroImagePositions;
    }
  }

  if (section === "home") {
    const storedHome = storedContent as Partial<HomeContent>;

    if (Array.isArray(storedHome.slides)) {
      storedHome.slides = storedHome.slides.map((slide) => ({
        ...slide,
        enabled: slide.enabled ?? true,
      }));
    }
  }

  return {
    ...defaults[section],
    ...storedContent,
  };
}

export async function saveSiteContent<K extends keyof ContentMap>(
  section: K,
  content: ContentMap[K]
) {
  if (!hasSupabaseConfig()) {
    throw new Error("Supabase is not configured.");
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("site_content").upsert({
    section,
    content,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    throw new Error(error.message);
  }
}
