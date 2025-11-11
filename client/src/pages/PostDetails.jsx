// --- src/pages/PostDetails.jsx ---
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getPostById, addComment } from "../services/api";
import "../styles/PostDetails.css";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  const fetchPost = useCallback(async () => {
    try {
      const res = await getPostById(id);
      setPost(res?.data?.post || null);
      setComments(res?.data?.comments || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch post.");
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText) return;

    try {
      await addComment(id, { content: commentText });
      setCommentText("");
      fetchPost(); // refresh comments
    } catch (err) {
      console.error(err);
      setError("Failed to add comment.");
    }
  };

  const paginatedComments = comments.slice((page - 1) * limit, page * limit);
  const totalPages = Math.ceil(comments.length / limit);

  if (!post) return <p>Loading post...</p>;

  return (
    <div className="post-details-container">
      <h2>{post.title}</h2>
      <p className="author">By: {post.author?.username || "Unknown"}</p>
      {post.image && <img src={post.image} alt={post.title} className="post-image" />}
      <p className="content">{post.content}</p>

      <div className="comments-section">
        <h3>Comments</h3>
        {paginatedComments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          paginatedComments.map((comment) => (
            <div key={comment._id} className="comment-card">
              <p className="comment-author">{comment.author?.username || "Anonymous"}</p>
              <p>{comment.content}</p>
            </div>
          ))
        )}

        {totalPages > 1 && (
          <div className="comments-pagination">
            <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>
              Prev
            </button>
            <span>Page {page} of {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
              Next
            </button>
          </div>
        )}

        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          />
          <button type="submit">Post Comment</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default PostDetails;
