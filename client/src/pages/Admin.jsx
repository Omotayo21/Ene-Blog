import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import BaseUrl from "../config";

const Admin = () => {
  const [posts, setPosts] = useState([]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("Sustainability");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [postToDelete, setPostToDelete] = useState(null);

 
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/posts`);
        setPosts(response.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

 

  /*const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`/api/posts/${currentPostId}`, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        console.log(title, category, body, image);
        await axios.post("http://localhost:5000/api/posts/create", {
          title,
          category,
          body,
          image,
        });
      }

      // Refresh posts
      const response = await axios.get("http://localhost:5000/api/posts");
      setPosts(response.data);
      resetForm();
    } catch (err) {
      console.error("Error saving post:", err);
    }
  };*/

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate image size
    if (file.size > 10 * 1024 * 1024) {
      alert("Image size should be less than 2MB");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    setSelectedImage(file); // Store the File object
  };
   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       const formData = new FormData();
       formData.append("title", title);
       formData.append("category", category);
       formData.append("body", body);
       if (selectedImage) {
         formData.append("image", selectedImage);
       }

       if (isEditing) {
         await axios.put(
           `${BaseUrl}/api/posts/${currentPostId}`,
           formData,
           {
             headers: {
               "Content-Type": "multipart/form-data",
             },
           }
         );
       } else {
         await axios.post(`${BaseUrl}/api/posts/create`, formData, {
           headers: {
             "Content-Type": "multipart/form-data",
           },
         });
       }

       // Refresh posts
       const response = await axios.get(`${BaseUrl}/api/posts`);
       setPosts(response.data);
       resetForm();
     } catch (err) {
       console.error("Error saving post:", err.response?.data || err.message);
       alert(err.response?.data?.message || "Error saving post");
     }
   };
  const handleEdit = (post) => {
    setTitle(post.title),
      setBody(post.body),
      setCategory(post.category),
      setSelectedImage(null);

    setImagePreview(post.image || "");
    setCurrentPostId(post._id);
    setIsEditing(true);
  };

const confirmDelete = (id) => {
  setPostToDelete(id);
  setShowDeleteModal(true);
};

const handleConfirmDelete = async () => {
  try {
    await axios.delete(`${BaseUrl}/api/posts/${postToDelete}`);
    setPosts(posts.filter((post) => post._id !== postToDelete));
    setShowDeleteModal(false);
    setPostToDelete(null);
  } catch (err) {
    console.error("Error deleting post:", err);
  }
};


  const resetForm = () => {
    setTitle("");
    setBody("");
    setCategory("EcoChronicles");
    setSelectedImage(null);
    setImagePreview("");
    setIsEditing(false);
    setCurrentPostId(null);
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-eco-green">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Post Form */}
        <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-eco-green mb-4">
            {isEditing ? "Edit Post" : "Create New Post"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-white  mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-eco-green"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-white mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-eco-green dark:bg-gray-700 dark:text-white"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="EcoChronicles">EcoChronicles</option>
                <option value="EcoCrafts">EcoCrafts</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 dark:text-white mb-2">
                Post Image
              </label>
              <div className="flex flex-col items-center gap-4 w-full">
                <input
                  type="file"
                  name="image"
                  id="postImage"
                  className="hidden"
                  onChange={handlePhotoChange}
                  accept="image/jpg, image/png, image/jpeg"
                />
                <label
                  htmlFor="postImage"
                  className={`flex w-full max-w-xs cursor-pointer flex-col items-center gap-2 rounded-xl bg-gray-100 dark:bg-gray-700 bg-cover bg-center p-4 ${
                    imagePreview ? "h-48" : "h-32"
                  }`}
                  style={{
                    backgroundImage: imagePreview
                      ? `linear-gradient(0deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), url(${imagePreview})`
                      : "",
                  }}
                >
                  {!imagePreview && (
                    <span className="text-sm font-semibold text-eco-green">
                      + Upload Image
                    </span>
                  )}
                </label>
                <p className="text-xs text-gray-500 dark:text-white text-center max-w-xs">
                  Image must be below 20MB. Use PNG or JPG format.
                </p>
              </div>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-white mb-2"
                htmlFor="body"
              >
                Content
              </label>
              <textarea
                id="body"
                name="body"
                rows="8"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-eco-green"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-eco-green text-white py-2 px-4 rounded hover:bg-eco-teal transition"
              >
                {isEditing ? "Update Post" : "Publish Post"}
              </button>

              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Posts List */}
        <div className="bg-white  dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-eco-green mb-4">Your Posts</h2>

          {posts.length === 0 ? (
            <p className="text-gray-500 dark:text-white">
              No posts yet. Create your first post!
            </p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post._id} className="border-b pb-4 last:border-b-0">
                  <h3 className="font-bold text-lg break-words">{post.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {post.category} •{" "}
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(post)}
                      className="text-sm bg-eco-teal text-white px-3 py-1 rounded hover:bg-eco-green transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(post._id)}
                      className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-700 opacity-90  flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
            <p className="text-gray-600 mb-6">
              Do you really want to delete this post? This action cannot be
              undone.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
