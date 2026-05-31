type Props = {
  title: string;
  author: string;
  image: string;
  category: string;
  price: string;
  rating: number;
  description: string;
};

export default function BookCard({
  title,
  author,
  image,
  category,
  price,
  rating,
  description,
}: Props) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow hover:shadow-xl transition">
      {/* Image */}
      <div className="pb-0">
        <img
          src={image}
          alt={title}
          className="w-full h-72 object-cover rounded-2xl"
        />
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Category */}
        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
          {category}
        </span>

        {/* Title */}
        <h3 className="font-semibold text-xl mt-4 leading-7">{title}</h3>

        {/* Author */}
        <p className="text-gray-500 mt-2">by {author}</p>

        {/* Description */}
        <p className="text-gray-600 mt-4 leading-7 text-sm">{description}</p>

        {/* Bottom */}
        <div className="flex items-center justify-between mt-6">
          <div>
            <p className="font-bold text-lg text-green-700">{price}</p>

            <p className="text-sm text-yellow-500">⭐ {rating}</p>
          </div>

          <button className="bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-xl transition">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
