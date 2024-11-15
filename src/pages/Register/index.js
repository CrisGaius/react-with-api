import React, { useState } from "react";
import { toast } from "react-toastify";
import { isEmail } from "validator";

import { useSelector, useDispatch } from "react-redux";
import { Container } from "../../styles/GlobalStyles";
import { Form } from "./styled";

import Loading from "../../components/Loading";
import * as actions from "../../store/modules/auth/actions";

export default function Register() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.id);
  const userEmail = useSelector((state) => state.auth.user.email);
  const userName = useSelector((state) => state.auth.user.name);
  const isLoading = useSelector((state) => state.auth.user.isLoading);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  React.useEffect(() => {
    if (!userId) return;

    setEmail(userEmail);
    setName(userName);
  }, [userEmail, userId, userName]);

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

    if (!userId && (password.length < 6 || password.length > 50)) {
      formErrors = true;
      toast.error("Field password should stay between 6 and 50 characters.");
    }

    if (formErrors) return;

    dispatch(actions.registerRequest({ name, email, password, userId }));
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{userId ? "Edit Data" : "Create your account"}</h1>
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

        <button type="submit">{userId ? "Save" : "Create your account"}</button>
      </Form>
    </Container>
  );
}
