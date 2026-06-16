type Props = {
  title: string;
  image: string;
  date: string;
  readTime: string;
  excerpt: string;
  pdfUrl?: string;
};

export default function DevotionalCard({
  title,
  image,
  date,
  readTime,
  excerpt,
  pdfUrl,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow transition hover:shadow-2xl">
      <img src={image} alt={title} className="h-48 w-full object-cover sm:h-56" />

      <div className="p-5 sm:p-6">
        <h3 className="text-lg font-semibold leading-7 sm:text-xl sm:leading-8">
          {title}
        </h3>

        <p className="mt-3 line-clamp-2 leading-7 text-gray-600">{excerpt}</p>

        <div className="mt-5 flex items-center justify-between gap-4 text-sm text-gray-500">
          <p>{date}</p>
          <p>{readTime}</p>
        </div>

        {pdfUrl ? (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            Read PDF
          </a>
        ) : null}
      </div>
    </div>
  );
}
