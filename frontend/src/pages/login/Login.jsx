import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user);
        history('/');
      } else {
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Socially</h1>
          <p>
          "Embark on a journey of connection and expression by signing up today! Our social platform is a vibrant space where you can share, connect, and celebrate moments with like-minded individuals. Join a community that values your voice – a digital playground where friendships blossom, stories unfold, and every interaction adds to the tapestry of your social experience. Don't miss out on the excitement; become a part of our growing network and redefine your online presence!"
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
