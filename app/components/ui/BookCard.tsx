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
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="h-56 w-full object-cover sm:h-60"
        />
        <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-sm font-bold text-yellow-600 shadow-sm">
          <span className="text-lg leading-none">&#9733;</span>
          <span>{formattedRating}</span>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="truncate text-lg font-semibold leading-7 sm:text-xl">
          {title}
        </h3>

        <p className="mt-1 text-sm text-gray-500">by {author}</p>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
          {description}
        </p>

        <p className="mt-4 text-lg font-bold text-green-700">{price}</p>

        <div className="mt-4">
          {amazonUrl ? (
            <a
              href={amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full justify-center rounded-xl bg-green-700 px-5 py-3 text-white transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700/25"
            >
              Buy Now
            </a>
          ) : (
            <span className="inline-flex w-full justify-center rounded-xl bg-gray-200 px-5 py-3 text-gray-500">
              Buy Now
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
