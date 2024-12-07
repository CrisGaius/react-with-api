import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { isEmail, isInt, isFloat } from "validator";
import { toast } from "react-toastify";
import { get } from "lodash";
import { useDispatch } from "react-redux";
import { Container } from "../../styles/GlobalStyles";
import { Form } from "./styled";
import Loading from "../../components/Loading/index";
import axios from "../../services/axios";
import history from "../../services/history";
import * as actions from "../../store/modules/auth/actions";

export default function Student({ match }) {
  const dispatch = useDispatch();

  const id = match.params.id || 0;
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);

        const { data } = await axios.get(`/students/${id}`);
        // const Photo = get(data, "Photos[0].url", "");

        setName(data.name);
        setLastName(data.last_name);
        setEmail(data.email);
        setAge(data.age);
        setWeight(data.weight);
        setHeight(data.height);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);

        const status = get(err, "response.status", 0);
        const errors = get(err, "response.data.errors", []);
        const errorsList = [];
        errorsList.push(errors);

        if (status === 400) errorsList.map((error) => toast.error(error));

        history.push("/");
      }
    }

    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formHasErrors = false;

    if (name.length < 3 || name.length > 255) {
      toast.error("Name must have 3 to 255 characters.");
      formHasErrors = true;
    }

    if (lastName.length < 3 || lastName.length > 255) {
      toast.error("Last Name must have 3 to 255 characters.");
      formHasErrors = true;
    }

    if (!isEmail(email)) {
      toast.error("Invalid email address.");
      formHasErrors = true;
    }

    if (!isInt(String(age))) {
      toast.error("Age must be greater than zero.");
      formHasErrors = true;
    }

    if (!isFloat(String(weight))) {
      toast.error("Weight must be greater than zero.");
      formHasErrors = true;
    }

    if (!isFloat(String(height))) {
      toast.error("Height must be greater than zero.");
      formHasErrors = true;
    }

    if (formHasErrors) return;

    try {
      setIsLoading(true);
      if (id) {
        await axios.put(`/students/${id}`, {
          name,
          last_name: lastName,
          email,
          age,
          weight,
          height,
        });
        toast.success("Student successfully edited!");
      } else {
        const { data } = await axios.post("/students", {
          name,
          last_name: lastName,
          email,
          age,
          weight,
          height,
        });
        toast.success("Student successfully created!");
        history.push(`/student/${data.id}/edit`);
      }
      setIsLoading(false);
    } catch (err) {
      const status = get(err, "response.status", 0);
      const errors = get(err, "response.data.errors", []);
      const errorsList = [];
      errorsList.push(errors);

      if (errorsList.length > 0) {
        errorsList.forEach((error) => toast.error(error));
      } else {
        toast.error("Unknown error.");
      }

      if (status === 401) dispatch(actions.loginFailure());
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? "Edit Student" : "New Student"}</h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
        />
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Weight"
        />
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Height"
        />
        <button type="submit">{id ? "Edit" : "Create"}</button>
      </Form>
    </Container>
  );
}

Student.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
