import React, { useState, useContext } from "react";
import axios from "axios";
import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { AuthContext } from "../../context/authContext";

const Share = () => {
  const { currentUser } = useContext(AuthContext);

  const [postDesc, setPostDesc] = useState("");
  const [postImg, setPostImg] = useState(null);

  const handleShare = async () => {
    try {
      const postData = {
        userId: currentUser._id,
        desc: postDesc,
        img: postImg, // Assuming postImg is the URL or file data for the image
      };

      await axios.post("/api/createPost", postData);

      // Optionally, reset form fields or show a success message
      setPostDesc("");
      setPostImg(null);
    } catch (error) {
      console.error("Error sharing post:", error);
      // Handle error as needed
    }
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img src={currentUser.profilePic} alt="" />
          <input
            type="text"
            placeholder={`What's on your mind ${currentUser.name}?`}
            value={postDesc}
            onChange={(e) => setPostDesc(e.target.value)}
          />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setPostImg(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleShare}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
