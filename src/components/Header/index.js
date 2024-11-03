import React from "react";
import { FaHome, FaSignInAlt, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { HeaderNavBar } from "./styled";

export default function Header() {
  const buttonClicked = useSelector((state) => state.example.buttonClicked);
  return (
    <HeaderNavBar>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/login">
        <FaUserAlt size={24} />
      </Link>
      <Link to="/aaa">
        <FaSignInAlt size={24} />
      </Link>
      {buttonClicked ? "Clicked" : "Not Clicked"}
    </HeaderNavBar>
  );
}
