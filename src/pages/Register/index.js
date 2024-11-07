import React, { useState } from "react";
import { toast } from "react-toastify";
import { isEmail } from "validator";
import { get } from "lodash";

import { Container } from "../../styles/GlobalStyles";
import { Form } from "./styled";
import axios from "../../services/axios";
import history from "../../services/history";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    let formErrors = false;

    if (name.length < 3 || name.length > 255) {
      formErrors = true;
      toast.error("Field name should stay between 3 and 255 characters.");
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error("Email isn't valid.");
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error("Field password should stay between 6 and 50 characters.");
    }

    if (formErrors) return;

    try {
      await axios.post("/users/", {
        name,
        password,
        email,
      });

      toast.success("Você fez seu cadastro");
      history.push("/login");
    } catch (error) {
      const errors = get(error, "response.data.errors", []);

      errors.map((err) => toast.error(err));
    }
  }

  return (
    <Container>
      <h1>Create your account</h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
          />
        </label>

        <button type="submit">Create my account</button>
      </Form>
    </Container>
  );
}
