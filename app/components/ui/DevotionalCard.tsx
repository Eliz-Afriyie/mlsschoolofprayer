type Props = {
  title: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  excerpt: string;
};

export default function DevotionalCard({
  title,
  category,
  image,
  date,
  readTime,
  excerpt,
}: Props) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow hover:shadow-2xl transition pointer">
      {/* Image */}
      <div className=" pb-0">
        <img
          src={image}
          alt={title}
          className="w-full h-56 object-cover rounded-2xl"
        />
      </div>

      {/* Content */}
      <div className="p-3 pb-1">
        {/* Category */}
        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
          {category}
        </span>

        {/* Title */}
        <h3 className="font-semibold text-xl mt-4 leading-8">{title}</h3>

        {/* Excerpt */}
        <p className="text-gray-600 mt-3 leading-7">{excerpt}</p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-5 text-sm text-gray-500">
          <p>{date}</p>
          <p>{readTime}</p>
        </div>
      </div>
    </div>
  );
}
