// --- src/pages/Posts.jsx ---
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../services/api";
import "../styles/Post.css";

const Posts = () => {
  const [postsData, setPostsData] = useState({ posts: [], total: 0 });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 5;

  // Fetch posts with safe handling
  const fetchPosts = useCallback(async () => {
    try {
      const res = await getPosts(page, limit, search);
      setPostsData({
        posts: res?.data?.posts || [],
        total: res?.data?.total || 0,
      });
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      setPostsData({ posts: [], total: 0 });
    }
  }, [page, search]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const totalPages = Math.ceil(postsData.total / limit);

  return (
    <div className="posts-container">
      <h2>All Posts</h2>

      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); // reset to page 1 when searching
        }}
        className="search-input"
      />

      <div className="posts-list">
        {postsData.posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          postsData.posts.map((post) => (
            <div className="post-card" key={post._id}>
              {post.image && (
                <img src={post.image} alt={post.title} className="post-image" />
              )}
              <h3>{post.title}</h3>
              <p>By: {post.author?.username || "Unknown"}</p>
              <Link to={`/posts/${post._id}`} className="view-btn">
                View Post
              </Link>
            </div>
          ))
        )}
      </div>

      {postsData.total > 0 && (
        <div className="pagination">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Posts;
