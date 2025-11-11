import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Posts
export const getPosts = async (page = 1, limit = 5, search = "", category = "") => {
  const params = { page, limit };
  if (search) params.search = search;
  if (category) params.category = category;
  const res = await API.get("/posts", { params });
  return res.data; // { posts, total }
};

export const getPostById = async (id) => {
  const res = await API.get(`/posts/${id}`);
  return res.data; // { post, comments }
};

export const createPost = async (postData, token) => {
  const res = await API.post("/posts", postData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updatePost = async (id, postData, token) => {
  const res = await API.put(`/posts/${id}`, postData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deletePost = async (id, token) => {
  const res = await API.delete(`/posts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Comments
export const getComments = async (postId) => {
  const res = await API.get(`/comments/${postId}`);
  return res.data;
};

export const addComment = async (postId, commentData, token) => {
  const res = await API.post(`/comments/${postId}`, commentData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Auth
export const registerUser = async (userData) => {
  const res = await API.post("/auth/register", userData);
  return res.data;
};

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});

export const login = async (credentials) => {
  const res = await API.post("/auth/login", credentials);
  // return res.data;

  localStorage.setItem("user", JSON.stringify(res.data));
  localStorage.setItem("token", res.data.token);

  return res.data;
};
