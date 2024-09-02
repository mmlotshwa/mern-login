import React, { useState } from "react";
import axios from "axios";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const doSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const response = await axios.post("/api/auth/register", {
        username,
        password,
        email
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Registration failed:", error.response.data.error);
      setMessage(error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={doSubmit}>
        <input
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          placeholder="Password"
          required
        />
         <input
          type="email"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          placeholder="username@domain.com"
          required
        />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Registration;