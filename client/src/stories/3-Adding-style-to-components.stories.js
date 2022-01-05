import React from "react";
import { number, withKnobs } from "@storybook/addon-knobs";
import styled, { css } from "styled-components";

export default {
  title: "Styling a button",
  decorators: [withKnobs],
};

export const StylingAButton = () => <StyledButton>I am styled !</StyledButton>;
const StyledButton = styled.button`
  background-color: red;
  color: white;
  height: 200px;
  width: 400px;
  font-size: 40px;
`;

const defaultHeight = 200;
const defaultWidth = 400;
const defaultFontSize = 40;
export const StylingAButtonWithDynamicProps = () => (
  <StyledDynamicButton
    height={number("height", defaultHeight)}
    width={number("width", defaultWidth)}
    fontSize={number("fontSize", defaultFontSize)}
  >
    I am styled dynamically!
  </StyledDynamicButton>
);
const StyledDynamicButton = styled.button`
  ${({ height, width, fontSize }) =>
    css`
      background-color: red;
      color: white;
      height: ${height}px;
      width: ${width}px;
      font-size: ${fontSize}px;
    `}
`;
