import React, { useState } from "react";
import axios from "axios";
import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";

const Post = ({ post, onDelete }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [liked, setLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = async () => {
    try {
      // Assume you have an API endpoint to toggle like status
      await axios.post(`/api/likePost/${post._id}`, { liked: !liked });

      // Update like state and count
      setLiked(!liked);
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleDelete = async () => {
    try {
      // Assume you have an API endpoint to delete a post
      await axios.delete(`/api/deletePost/${post._id}`);

      // Call the onDelete callback to remove the post from the UI
      onDelete(post._id);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          <button className="deleteButton" onClick={handleDelete}>
            Delete
          </button>
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={post.img} alt="" />
        </div>
        <div className="info">
          <div className="item" onClick={handleLike}>
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            {likeCount} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments />}
      </div>
    </div>
  );
};

export default Post;
