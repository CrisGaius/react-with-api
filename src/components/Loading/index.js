import React from "react";
import PropTypes from "prop-types";
import { ContainerLoading } from "./styled";

export default function Loading({ isLoading }) {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!isLoading) return <></>;

  return (
    <ContainerLoading>
      <div />
      <span>Loading...</span>
    </ContainerLoading>
  );
}

Loading.defaultProps = {
  isLoading: false,
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
};
