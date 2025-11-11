import React, { useEffect, useState } from "react";
import { getPosts, deletePost } from "../services/api";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const data = await getPosts();
    setPosts(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(id);  // Call API
        setPosts(posts.filter(post => post._id !== id)); // Update state
        alert("Post deleted successfully");
      } catch (error) {
        console.error(error);
        alert("Failed to delete post");
      }
    }
  };

  return (
    <div>
      {posts.map(post => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <button onClick={() => handleDelete(post._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default PostList;
