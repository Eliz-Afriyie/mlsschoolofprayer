"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Eye, EyeOff, Loader2, RotateCcw, Save, Trash2 } from "lucide-react";
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
import { ConfirmationModal } from "./AdminDashboardWidgets";

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
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [removed, setRemoved] = useState(false);

  return (
    <div className="grid gap-3">
      <p className="text-sm font-semibold text-gray-700">{label}</p>
      {current && !removed ? (
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
      <input
        type="hidden"
        name={`${name}Remove`}
        value={removed ? "on" : ""}
      />
      {current ? (
        removed ? (
          <button
            type="button"
            onClick={() => setRemoved(false)}
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            <RotateCcw size={16} />
            Undo image removal
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmRemove(true)}
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
          >
            <Trash2 size={16} />
            Remove current image
          </button>
        )
      ) : null}

      {confirmRemove ? (
        <ConfirmationModal
          title={`Remove ${label.toLowerCase()}?`}
          description="The image will disappear from this content after you save. The original file will remain safely in Supabase Storage."
          onClose={() => setConfirmRemove(false)}
          tone="warning"
        >
          <button
            type="button"
            onClick={() => {
              setRemoved(true);
              setConfirmRemove(false);
            }}
            className="rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
          >
            Remove image
          </button>
        </ConfirmationModal>
      ) : null}
    </div>
  );
}

function ToggleField({
  label,
  description,
  name,
  defaultChecked,
}: {
  label: string;
  description: string;
  name: string;
  defaultChecked: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-gray-200 bg-[#F7F8F5] p-4">
      <span>
        <span className="flex items-center gap-2 font-semibold text-gray-900">
          {defaultChecked ? <Eye size={17} /> : <EyeOff size={17} />}
          {label}
        </span>
        <span className="mt-1 block text-sm text-gray-500">{description}</span>
      </span>
      <input
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        className="h-5 w-5 accent-green-700"
      />
    </label>
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
        <ToggleField
          label="Show Footer"
          description="Turn the website footer on or off."
          name="footerVisible"
          defaultChecked={content.footerVisible}
        />
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
        <div className="grid gap-3 md:grid-cols-2">
          <ToggleField
            label="Show Hero"
            description="Display the homepage slider."
            name="heroVisible"
            defaultChecked={content.heroVisible}
          />
          <ToggleField
            label="Show About Preview"
            description="Display the founder preview block."
            name="aboutVisible"
            defaultChecked={content.aboutVisible}
          />
          <ToggleField
            label="Show Devotionals"
            description="Display featured devotionals."
            name="devotionalsVisible"
            defaultChecked={content.devotionalsVisible}
          />
          <ToggleField
            label="Show Books"
            description="Display featured books."
            name="booksVisible"
            defaultChecked={content.booksVisible}
          />
        </div>
        {content.slides.map((slide, index) => (
          <div key={index} className="grid gap-4 border-b border-gray-100 pb-7">
            <h3 className="text-lg font-bold">Hero Slide {index + 1}</h3>
            <ToggleField
              label={`Enable Slide ${index + 1}`}
              description="Disabled slides remain saved but do not appear."
              name={`slide${index + 1}Enabled`}
              defaultChecked={slide.enabled}
            />
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
        <div className="grid gap-3 md:grid-cols-2">
          <ToggleField
            label="Show Hero"
            description="Display the About hero slider."
            name="heroVisible"
            defaultChecked={content.heroVisible}
          />
          <ToggleField
            label="Show Founder Image"
            description="Display the founder profile image block."
            name="profileVisible"
            defaultChecked={content.profileVisible}
          />
          <ToggleField
            label="Show Contact Details"
            description="Display name, phone, and social icons."
            name="contactVisible"
            defaultChecked={content.contactVisible}
          />
          <ToggleField
            label="Show Biography"
            description="Display the About biography text."
            name="biographyVisible"
            defaultChecked={content.biographyVisible}
          />
          <ToggleField
            label="Show Highlights"
            description="Display ministry highlight cards."
            name="highlightsVisible"
            defaultChecked={content.highlightsVisible}
          />
        </div>
        <div className="grid gap-4 border-b border-gray-100 pb-6">
          <h3 className="text-lg font-bold text-gray-950">
            About Hero Slider
          </h3>
          {[0, 1, 2].map((index) => (
            <div key={index} className="grid gap-3 rounded-xl border border-gray-200 p-4">
              <ToggleField
                label={`Enable Hero Image ${index + 1}`}
                description="Keep the image saved while hiding it from the slider."
                name={`heroImage${index + 1}Enabled`}
                defaultChecked={content.heroImagesEnabled?.[index] ?? true}
              />
              <ImageField
                label={`Hero Image ${index + 1}`}
                name={`heroImage${index + 1}`}
                current={content.heroImages?.[index] ?? content.heroImage}
              />
            </div>
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
        <div className="grid gap-3 md:grid-cols-2">
          <ToggleField
            label="Show Hero"
            description="Display the Contact page hero."
            name="heroVisible"
            defaultChecked={content.heroVisible}
          />
          <ToggleField
            label="Show Contact Form"
            description="Display the message form."
            name="formVisible"
            defaultChecked={content.formVisible}
          />
        </div>
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
