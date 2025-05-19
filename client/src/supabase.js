import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey);

// Image Upload to Storage
// Image Upload to Storage - Fixed version
export const uploadImage = async (file) => {
  const fileName = `posts/${Date.now()}_${file.name}`;

  // Upload with cache control and public access
  const { data, error } = await supabase.storage
    .from("blog-images")
    .upload(fileName, file, {
      cacheControl: 'public, max-age=604800', 
      upsert: false,
    });

  if (error) throw error;

  // Return JUST THE PATH, not the full URL
  return data.path;
};

// Create Post - Fixed version
export const createPost = async ({ title, body, category, imageFile }) => {
  let imageUrl = null;
  if (imageFile) {
    const imagePath = await uploadImage(imageFile);
    // Generate the clean public URL
    imageUrl = `${supabaseUrl}/storage/v1/object/public/blog-images/${imagePath}`;
  }

  const { data, error } = await supabase
    .from("posts")
    .insert({
      title,
      body,
      category,
      image_url: imageUrl,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};
// Get All Posts
export const getAllPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

// Get Single Post
export const getPostById = async (id) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

// Update Post
// Update Post - Fixed version
export const updatePost = async (id, { title, body, category, imageFile }) => {
  const updates = { title, body, category };

  if (imageFile) {
    // Delete old image if exists
    const oldPost = await getPostById(id);
    if (oldPost.image_url) {
      const fileName = oldPost.image_url.split("/").pop();
      await supabase.storage.from("blog-images").remove([`posts/${fileName}`]);
    }

    // Upload new image and get full public URL
    const imagePath = await uploadImage(imageFile);
    updates.image_url = `${supabaseUrl}/storage/v1/object/public/blog-images/${imagePath}`;
  }

  const { data, error } = await supabase
    .from("posts")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Delete Post
export const deletePost = async (id) => {
  // Delete associated image
  const post = await getPostById(id);
  if (post.image_url) {
    const fileName = post.image_url.split("/").pop();
    await supabase.storage.from("blog-images").remove([`posts/${fileName}`]);
  }

  // Delete post
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) throw error;
};
// Add this to your supabase.js
export const searchPosts = async (query) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .or(`title.ilike.%${query}%,body.ilike.%${query}%`);

  if (error) throw error;
  return data;
};