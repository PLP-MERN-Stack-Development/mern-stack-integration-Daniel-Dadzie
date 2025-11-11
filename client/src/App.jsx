import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import PostDetails from "./pages/PostDetails";
import Posts from "./pages/Posts";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./styles/global.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={
              <ProtectedRoute>
                <CreatePost />
                </ProtectedRoute>} />
            <Route path="/edit/:id" element={
              <ProtectedRoute>
                <EditPost />
                </ProtectedRoute>} />
            <Route path="/post/:id" element={<PostDetails />} />
            <Route path="/posts" element={<Posts />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
