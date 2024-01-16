import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import "./register.scss";

const Register = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const history = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/register", {
        username,
        email,
        password,
        name,
      });

      if (response.status === 201) {
        login();
        setRegistrationSuccess(true);
        history('/login');
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Socially</h1>
          <p>
            "Embark on a journey of connection and expression by signing up 
            today! Our social platform is a vibrant space where you can share, 
            connect, and celebrate moments with like-minded individuals. 
            Join a community that values your voice – a digital playground where friendships blossom, 
            stories unfold, and every interaction adds to the tapestry of your social experience. 
            Don't miss out on the excitement; become a part of our growing network and redefine your online presence!"
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="button" onClick={handleRegister}>
              Register
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Register;
