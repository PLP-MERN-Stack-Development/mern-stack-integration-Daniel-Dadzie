// import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { getPosts } from "../services/api";
import "../styles/Home.css";

const Home = () => {
// //   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const data = await getPosts();
//         setPosts(data);
//       } catch (err) {
//         console.error("Error fetching posts:", err);
//       }
//     };
//     fetchPosts();
//   }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to MERN Blog</h1>
          <p>Sharing knowledge, ideas, and inspiration through tech blogs.</p>
          <div className="hero-buttons">
            <Link to="/posts">
              <button className="hero-btn">View Posts</button>
            </Link>
            <Link to="/create">
              <button className="hero-btn">Create Post</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      
    </div>
  );
};

export default Home;
