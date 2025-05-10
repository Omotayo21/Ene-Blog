import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import BaseUrl from "../config";

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

      
  
 
  if (loading) return <Loader />
  if (error)
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  if (!post) return <div className="text-center py-12">Post not found</div>;
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
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-serif font-bold text-gray-800 dark:text-gray-200 break-words">
        {post.title}
      </h1>
      <span className=" text-[0.8rem] text-gray-600 dark:text-gray-200 mb-2">
        {fullFormattedDate}
      </span>
      <article className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
        <div className="h-96 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8">
          

          <div className="blog-content text-gray-700 dark:text-gray-200 leading-relaxed">
            {post.body.split("\n").map((paragraph, i) => (
              <p key={i} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
