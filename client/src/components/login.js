import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null); 
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(username.length == 0 || password.length == 0){
      setErrorMessage("Error: Capture all required data!");
    } else {
      try {
        const response = await axios.post("/api/auth/login", {
          username,
          password,
        });
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } catch (error) {
        console.error("Authentication failed:", error);
        setToken(null);
        localStorage.removeItem("token");
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data); 
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
      }
    }
  };

  const loadSignUp = async (e) => {
    navigate("/register");
  }

  return (
    <div>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}{" "}
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      <div>If you don't have an account: <button onClick={loadSignUp}>Sign Up</button></div>
    </div>
  );
};

export default Login; 