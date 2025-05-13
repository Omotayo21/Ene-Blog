import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import Loader from "../components/Loader";
//import BaseUrl from "../config";
import { getAllPosts } from "../supabase";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
       const posts = await getAllPosts();
       setPosts(posts);
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
       
        <p className="text-xl mt-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Exploring nature's wonders and sharing insights for a sustainable
          future.
        </p>
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

export default Home;
