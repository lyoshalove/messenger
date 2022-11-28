import axios from "axios";
import React, { useState } from "react";
import "./styles.sass";

export const Auth: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        axios
          .post("http://localhost:3000/auth/registration", {
            firstName: name,
            lastName: surname,
            email,
            password,
          })
          .then((data) => console.log(data));
      }}
    >
      <input
        type="text"
        name="firstName"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        name="lastName"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />
      <input
        type="text"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>auth</button>
    </form>
  );
};
