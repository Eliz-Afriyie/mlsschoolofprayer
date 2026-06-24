This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Supabase Setup

This app uses Supabase as the source of truth for books, devotionals, images,
and PDFs. If Supabase has no rows, the app shows empty lists. It does not mix in
the old local demo data.

1. Open your Supabase project.
2. Go to **SQL Editor**.
3. Paste and run the full script from `supabase/schema.sql`.
4. Add these values to `.env.local` for local development:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_SECRET_KEY=your-secret-or-service-role-key
```

5. Add the same variables in your production host, for example Vercel.

The admin upload forms save records into the `books` and `devotionals` tables.
Uploaded images and PDFs are saved into the public Supabase Storage bucket named
`media`. The app stores the returned public file URL in the matching database
row.

### Website Content Manager

To enable editing homepage, About, Contact, navbar, and footer content:

1. Open the Supabase **SQL Editor**.
2. Paste and run `supabase/cms.sql` once.
3. Redeploy or restart the app.
4. Log in to `/admin`.

The admin sidebar will include Homepage, About Page, Contact Page, and Site
Settings. Text is stored in the `site_content` table as structured JSON. Images
are uploaded to the existing `media` storage bucket.

Admin login is controlled by these environment variables:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change-this-to-a-strong-password
ADMIN_SESSION_SECRET=use-a-long-random-secret
```

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
