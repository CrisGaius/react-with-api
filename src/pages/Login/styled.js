import styled from "styled-components";

export const Title = styled.h1`
  small {
    font-size: 12px;
    margin-left: 15px;
    color: green;
  }
  color: ${(props) => (props.isRed ? "red" : "blue")};
`;

export const Paragraph = styled.p`
  font-size: 30px;
`;
