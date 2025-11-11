// --- src/pages/EditPost.jsx ---
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePost } from "../services/api";
import "../styles/editPost.css";

const EditPost = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPostById(id);
        setFormData({
          title: post.title,
          content: post.content,
          image: post.image || "",
        });
        setPreview(post.image || "");
      } catch (err) {
        setError(err.message || "Failed to load post");
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const formPayload = new FormData();
      formPayload.append("title", formData.title);
      formPayload.append("content", formData.content);
      if (formData.image instanceof File) formPayload.append("image", formData.image);

      await updatePost(id, formPayload);
      setSuccess("Post updated successfully!");
      setTimeout(() => navigate(`/post/${id}`), 1500);
    } catch (err) {
      setError(err.message || "Failed to update post");
    }
  };

  return (
    <div className="edit-post-container">
      <h2>Edit Post</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          required
        ></textarea>

        <input type="file" onChange={handleImageChange} />
        {preview && <img src={preview} alt="Preview" className="image-preview" />}

        <button type="submit" className="submit-btn">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
/* --- END OF src/pages/EditPost.jsx --- */