/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

const logoImgStyles = css`
  padding: 2px;
  height: 30px;
  @media (min-width: 820px) {
    height: 42px;
  }
`;

//a navbar é que devia mudar a altura, não?

const Logo = () => {
  return <img src="/logo/logo.png" css={logoImgStyles} alt="milia-logo" />;
};

export default Logo;
