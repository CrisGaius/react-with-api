import styled from "styled-components";
import { primaryColor } from "../../config/colors";

export const HeaderNavBar = styled.nav`
  background-color: ${primaryColor};
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  a {
    color: #fff;
    font-weight: bold;
  }
`;
