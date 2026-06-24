"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, Save } from "lucide-react";
import type {
  AboutContent,
  ContactContent,
  HomeContent,
  SiteSettings,
} from "@/app/lib/site-content";
import {
  updateAboutContent,
  updateContactContent,
  updateHomeContent,
  updateSiteSettings,
  type AdminActionState,
} from "../actions";

const initialState: AdminActionState = { message: "" };

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  defaultValue: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-gray-700">
      {label}
      <input
        name={name}
        type={type}
        defaultValue={type === "file" ? undefined : defaultValue}
        required={type === "file" ? false : required}
        accept={type === "file" ? "image/*" : undefined}
        className="h-11 rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-green-700"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  defaultValue,
  rows = 4,
}: {
  label: string;
  name: string;
  defaultValue: string;
  rows?: number;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-gray-700">
      {label}
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        required
        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm leading-6 outline-none focus:border-green-700"
      />
    </label>
  );
}

function ImageField({
  label,
  name,
  current,
}: {
  label: string;
  name: string;
  current: string;
}) {
  return (
    <div className="grid gap-3">
      <p className="text-sm font-semibold text-gray-700">{label}</p>
      {current ? (
        <img
          src={current}
          alt=""
          className="h-44 w-full rounded-xl border border-gray-200 object-cover"
        />
      ) : null}
      <input
        name={name}
        type="file"
        accept="image/*"
        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
      />
    </div>
  );
}

function SaveButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-green-700 px-5 font-semibold text-white transition hover:bg-green-800 disabled:opacity-60"
    >
      {pending ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
      {pending ? "Saving..." : "Save Changes"}
    </button>
  );
}

function Message({ state }: { state: AdminActionState }) {
  return state.message ? (
    <p
      className={`rounded-xl px-4 py-3 text-sm ${
        state.ok ? "bg-green-50 text-green-800" : "bg-red-50 text-red-700"
      }`}
    >
      {state.message}
    </p>
  ) : null;
}

function Panel({
  title,
  text,
  children,
}: {
  title: string;
  text: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-950">{title}</h2>
        <p className="mt-1 text-sm text-gray-500">{text}</p>
      </div>
      {children}
    </div>
  );
}

export function SiteSettingsForm({ content }: { content: SiteSettings }) {
  const [state, action] = useActionState(updateSiteSettings, initialState);

  return (
    <Panel title="Site Settings" text="Manage shared brand, footer, and contact details.">
      <form action={action} className="grid gap-5">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Website Name" name="siteName" defaultValue={content.siteName} />
          <Field label="Tagline" name="tagline" defaultValue={content.tagline} />
          <Field label="Email" name="email" type="email" defaultValue={content.email} />
          <Field label="Phone" name="phone" defaultValue={content.phone} />
        </div>
        <TextArea
          label="Footer Description"
          name="footerDescription"
          defaultValue={content.footerDescription}
        />
        <ImageField label="Footer Image" name="footerImage" current={content.footerImage} />
        <Message state={state} />
        <SaveButton />
      </form>
    </Panel>
  );
}

export function HomeContentForm({ content }: { content: HomeContent }) {
  const [state, action] = useActionState(updateHomeContent, initialState);

  return (
    <Panel title="Homepage" text="Manage hero slides, founder preview, and section headings.">
      <form action={action} className="grid gap-7">
        {content.slides.map((slide, index) => (
          <div key={index} className="grid gap-4 border-b border-gray-100 pb-7">
            <h3 className="text-lg font-bold">Hero Slide {index + 1}</h3>
            <ImageField
              label="Background Image"
              name={`slide${index + 1}Image`}
              current={slide.image}
            />
            <Field
              label="Verse"
              name={`slide${index + 1}Verse`}
              defaultValue={slide.verse}
            />
            <Field
              label="Scripture"
              name={`slide${index + 1}Scripture`}
              defaultValue={slide.scripture}
            />
            <TextArea
              label="Description"
              name={`slide${index + 1}Description`}
              defaultValue={slide.description}
              rows={3}
            />
          </div>
        ))}
        <h3 className="text-lg font-bold">Founder Preview</h3>
        <ImageField label="Founder Image" name="founderImage" current={content.founderImage} />
        <Field label="Eyebrow" name="aboutEyebrow" defaultValue={content.aboutEyebrow} />
        <Field label="Heading" name="aboutTitle" defaultValue={content.aboutTitle} />
        <TextArea label="Description" name="aboutText" defaultValue={content.aboutText} />
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Devotionals Heading"
            name="devotionalsHeading"
            defaultValue={content.devotionalsHeading}
          />
          <Field
            label="Books Heading"
            name="booksHeading"
            defaultValue={content.booksHeading}
          />
        </div>
        <Message state={state} />
        <SaveButton />
      </form>
    </Panel>
  );
}

export function AboutContentForm({ content }: { content: AboutContent }) {
  const [state, action] = useActionState(updateAboutContent, initialState);

  return (
    <Panel title="About Page" text="Manage founder biography, images, phone, and social links.">
      <form action={action} className="grid gap-5">
        <div className="grid gap-4 border-b border-gray-100 pb-6">
          <h3 className="text-lg font-bold text-gray-950">
            About Hero Slider
          </h3>
          {[0, 1, 2].map((index) => (
            <ImageField
              key={index}
              label={`Hero Image ${index + 1}`}
              name={`heroImage${index + 1}`}
              current={
                content.heroImages?.[index] ??
                content.heroImage
              }
            />
          ))}
        </div>
        <ImageField
          label="Founder Profile Image"
          name="profileImage"
          current={content.profileImage}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Hero Eyebrow" name="heroEyebrow" defaultValue={content.heroEyebrow} />
          <Field label="Hero Title" name="heroTitle" defaultValue={content.heroTitle} />
        </div>
        <TextArea label="Hero Description" name="heroText" defaultValue={content.heroText} />
        <Field label="Section Title" name="sectionTitle" defaultValue={content.sectionTitle} />
        <TextArea label="Biography Paragraph 1" name="bioOne" defaultValue={content.bioOne} />
        <TextArea label="Biography Paragraph 2" name="bioTwo" defaultValue={content.bioTwo} />
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Founder Name" name="founderName" defaultValue={content.founderName} />
          <Field label="Phone" name="phone" defaultValue={content.phone} />
        </div>
        {(["facebook", "instagram", "youtube", "tiktok"] as const).map((social) => (
          <div key={social} className="grid gap-4 md:grid-cols-2">
            <Field
              label={`${social} Handle`}
              name={`${social}Handle`}
              required={false}
              defaultValue={content[`${social}Handle`]}
            />
            <Field
              label={`${social} URL`}
              name={`${social}Url`}
              type="url"
              required={false}
              defaultValue={content[`${social}Url`]}
            />
          </div>
        ))}
        <Message state={state} />
        <SaveButton />
      </form>
    </Panel>
  );
}

export function ContactContentForm({ content }: { content: ContactContent }) {
  const [state, action] = useActionState(updateContactContent, initialState);

  return (
    <Panel title="Contact Page" text="Manage the contact page hero and form heading.">
      <form action={action} className="grid gap-5">
        <ImageField label="Hero Image" name="heroImage" current={content.heroImage} />
        <Field label="Hero Title" name="heroTitle" defaultValue={content.heroTitle} />
        <TextArea label="Hero Description" name="heroText" defaultValue={content.heroText} />
        <Field label="Form Heading" name="formTitle" defaultValue={content.formTitle} />
        <Message state={state} />
        <SaveButton />
      </form>
    </Panel>
  );
}
