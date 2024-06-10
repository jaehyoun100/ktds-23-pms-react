import React from "react";
import styled from "@emotion/styled";

function Spacer({ margin }) {
  return <Span style={{ width: margin }}></Span>;
}

const Span = styled.span`
  display: inline-block;
`;

export default Spacer;
