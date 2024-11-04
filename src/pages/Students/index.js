import React from "react";

import { Container } from "../../styles/GlobalStyles";
import axios from "../../services/axios";

export default function Students() {
  React.useEffect(() => {
    async function getData() {
      const response = await axios.get("/students");
      console.log(response.data);
    }

    getData();
  }, []);
  return (
    <Container>
      <h1>Students</h1>
    </Container>
  );
}
