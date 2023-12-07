/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import NextLink from "./NextLink";
import LogoS from "./Logo/Logo";
import { NextRouter, useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/state/user/userSlice";
import { RootState } from "@/state/store";
import { css, jsx } from "@emotion/react";
import { useState, useEffect } from "react";

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  position: sticky;
  top: 0;
  background-color: rgb(255, 255, 255);
  z-index: 2;
  box-shadow: 1px 2px 17px 0px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 1px 2px 17px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 1px 2px 17px 0px rgba(0, 0, 0, 0.1);
`;

const Options = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Icon = styled.i`
  font-size: 25px;
`;

const mobileStyles = css`
  display: flex;
  font-size: 28px;
  margin: 0 3px;
  @media (min-width: 500px) {
    display: none;
  }
`;

const desktopStyles = css`
  display: none;
  border-radius: 5px;
  padding: 5px 7px;
  cursor: pointer;
  &:hover {
    background-color: rgb(245, 245, 245);
  }
  @media (min-width: 500px) {
    display: flex;
  }
`;

const NavBar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const validUser = useSelector((state: RootState) => state.user.data.id);

  console.log("I'M RENDERING", validUser)

  const handleClickLogOut = () => {
    console.log("IM TRYING TO SHUT DOWN")
    dispatch(logout());
    // router.reload()
    router.push("/");
  };

  return (
    <NavContainer>
      <div>
        <NextLink href="/">
          <LogoS />
        </NextLink>
      </div>
      <Options>
        {validUser ? (
          <>
            <NextLink href="/notes">
              <i className="fi fi-rr-books" css={mobileStyles} />
              <p css={desktopStyles}>Notebooks</p>
            </NextLink>
            <NextLink href="/account">
              <i className="fi fi-rs-circle-user" css={mobileStyles} />
              <p css={desktopStyles}>Account</p>
            </NextLink>
            <div onClick={handleClickLogOut}>
              <i className="fi fi-rr-exit" css={mobileStyles} />
              <p css={desktopStyles}>Log Out</p>
            </div>
          </>
        ) : (
          <NextLink href="/login">
            <i className="fi fi-rs-circle-user" css={mobileStyles} />
            <p css={desktopStyles}>Log in</p>
          </NextLink>
        )}
      </Options>
    </NavContainer>
  );
};

export default NavBar;
