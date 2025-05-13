import { Link } from "react-router-dom";

const BlogCard = ({ post }) => {
    const date = new Date(post.createdAt);

    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    function getOrdinalSuffix(day) {
      if (day > 3 && day < 21) return "th"; // 4-20
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    }

    const day = date.getDate();
    const ordinalDay = `${day}${getOrdinalSuffix(day)}`;
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    const fullFormattedDate = `${month} ${ordinalDay} ${year}`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg h-full">
      {post.image_url && (
        <div className="h-48 overflow-hidden">
          <img
            src={post.image_url}
            alt={post.title}
            loading="lazy"
            decoding="async"
            style={{ contentVisibility: "auto" }}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2 break-words">
          {post.title}
        </h3>
        <span className=" text-[0.5rem] text-gray-600 dark:text-gray-200 mb-2">
          {fullFormattedDate}
        </span>
        <p className="text-gray-600 dark:text-gray-200 mb-4 line-clamp-3">
          {post.body.substring(0, 150)}...
        </p>
        <Link
          to={`/post/${post.id}`}
          className="inline-flex items-center text-eco-green font-medium hover:text-eco-brown transition"
        >
          Read More
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
