type Props = {
  title: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  excerpt: string;
  pdfUrl?: string;
};

export default function DevotionalCard({
  title,
  category,
  image,
  date,
  readTime,
  excerpt,
  pdfUrl,
}: Props) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow hover:shadow-2xl transition pointer">
      {/* Image */}
      <div className=" pb-0">
        <img
          src={image}
          alt={title}
          className="h-48 w-full rounded-2xl object-cover sm:h-56"
        />
      </div>

      {/* Content */}
      <div className="p-3 pb-1">
        {/* Category */}
        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
          {category}
        </span>

        {/* Title */}
        <h3 className="mt-4 text-lg font-semibold leading-7 sm:text-xl sm:leading-8">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 mt-3 leading-7">{excerpt}</p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-5 text-sm text-gray-500">
          <p>{date}</p>
          <p>{readTime}</p>
        </div>
        {pdfUrl ? (
          <a
            href={pdfUrl}
            download
            className="mt-4 inline-flex rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            Download PDF
          </a>
        ) : null}
      </div>
    </div>
  );
}
