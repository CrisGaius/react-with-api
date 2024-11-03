import React from "react";
import { useDispatch } from "react-redux";

import { Container } from "../../styles/GlobalStyles";
import { Title, Paragraph } from "./styled";
import * as exampleActions from "../../store/modules/example/actions";

// import axios from "../../services/axios";

export default function Login() {
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   async function getStudents() {
  //     const response = await axios.get("/students");
  //     const { data } = response;
  //     console.log(data);
  //   }

  //   getStudents();
  // }, []);

  function handleClick(e) {
    e.preventDefault();

    dispatch(exampleActions.buttonClickRequest());
  }

  return (
    <Container>
      <Title isRed={false}>
        Login
        <small>Hello</small>
      </Title>
      <Paragraph>Lorem ipsum.</Paragraph>
      <a href="/">Link</a>
      <button type="button" onClick={handleClick}>
        Send
      </button>
    </Container>
  );
}
