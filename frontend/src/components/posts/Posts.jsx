import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../post/Post";
import "./posts.scss";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.post("/api/getPosts");
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="posts">
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Post post={post} key={post._id} />
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default Posts;
