import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { searchPosts } from "../supabase";
import Loader from "../components/Loader";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const search = async () => {
      const query = new URLSearchParams(location.search).get("q");
      if (query) {
        try {
          const data = await searchPosts(query);
          setResults(data);
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    search();
  }, [location.search]);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Search Results for "{new URLSearchParams(location.search).get("q")}"
      </h1>

      {results.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No matching posts found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
