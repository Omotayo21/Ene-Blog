import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import {getAllPosts} from "../supabase";
import Loader from "../components/Loader";


const EcoCrafts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts();;
        
          const filteredPosts = response.filter(
            (post) => post.category.toLowerCase() === "ecocrafts"
          );
          setPosts(filteredPosts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <Loader />;
  if (error)
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl mt-2 font-serif font-bold text-eco-green mb-4">
          EcoCrafts
        </h1>
        <div className="flex justify-center mb-8">
          <img
            src="/ecocrafts.PNG"
            alt="EcoCrafts"
            className="lg:w-[60rem] h-72 "
          />
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No blog posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EcoCrafts;
