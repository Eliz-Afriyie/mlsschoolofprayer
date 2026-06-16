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
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow">
      <img src={image} alt={title} className="h-44 w-full object-cover sm:h-48" />

      <div className="p-4 sm:p-5">
        <h3 className="truncate text-lg font-semibold leading-7 sm:text-xl sm:leading-8">
          {title}
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
          {excerpt}
        </p>

        <div className="mt-4 flex items-center justify-between gap-4 text-sm text-gray-500">
          <p>{date}</p>
          <p>{readTime}</p>
        </div>

        <div className="mt-4">
          {pdfUrl ? (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700/25"
            >
              Read PDF
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
