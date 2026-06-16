type Props = {
  title: string;
  author: string;
  image: string;
  price: string;
  rating: number;
  description: string;
  amazonUrl?: string;
};

export default function BookCard({
  title,
  author,
  image,
  price,
  rating,
  description,
  amazonUrl,
}: Props) {
  const formattedRating = Number.isFinite(rating) ? rating.toFixed(1) : "0.0";

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow transition hover:shadow-xl">
      <img src={image} alt={title} className="h-64 w-full object-cover sm:h-72" />

      <div className="p-5 sm:p-6">
        <h3 className="text-lg font-semibold leading-7 sm:text-xl">{title}</h3>

        <p className="mt-2 text-gray-500">by {author}</p>

        <p className="mt-4 line-clamp-2 text-sm leading-7 text-gray-600">
          {description}
        </p>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-lg font-bold text-green-700">{price}</p>
            <p className="inline-flex items-center gap-1 text-sm font-semibold text-yellow-600">
              <span className="text-xl leading-none">★</span>
              <span>{formattedRating}</span>
            </p>
          </div>

          {amazonUrl ? (
            <a
              href={amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-green-700 px-5 py-3 text-white transition hover:bg-green-800"
            >
              Buy Now
            </a>
          ) : (
            <span className="rounded-xl bg-gray-200 px-5 py-3 text-gray-500">
              Buy Now
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
