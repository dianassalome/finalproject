import emotionStyled from "@emotion/styled";
import NextLink from "./NextLink";
import LogoS from "../Logo/Logo";
import { NextRouter, useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/state/user/userSlice";
import { RootState } from "@/state/store";
import { useState, useEffect } from "react";
import { deleteCookies } from "@/actions/cookies";
import { deselectAll } from "@/state/notebook/notesSlice";

//Alerts
import alertMessages from "@/assets/alertMessages";
import useSnackbar from "../CustomHooks/useSnackbar";

const MobileLink = emotionStyled(NextLink)`
display: flex;
@media (min-width: 700px) {
  display: none;
}
`;

const MobileIcon = emotionStyled.i`
font-size: 28px;
margin: 0 3px;
@media (min-width: 700px) {
  display: none;
}
`;

const DesktopLink = emotionStyled(NextLink)`
display: none;
border-radius: 5px;
padding: 5px 7px;
cursor: pointer;
&:hover {
  background-color: rgb(245, 245, 245);
}
@media (min-width: 700px) {
  display: flex;
}
`;

const NavContainer = emotionStyled.nav`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  position: sticky;
  top: 0;
  background-color: rgb(255, 255, 255);
  z-index: 1001;
  box-shadow: 1px 2px 17px 0px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 1px 2px 17px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 1px 2px 17px 0px rgba(0, 0, 0, 0.1);
  @media (min-width: 700px) {
    height: 50px;
  }
`;

const Options = emotionStyled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const DesktopText = emotionStyled.p`
display: none;
border-radius: 5px;
padding: 5px 7px;
cursor: pointer;
&:hover {
  background-color: rgb(245, 245, 245);
}
@media (min-width: 700px) {
  display: flex;
}
`;

const NavBar = () => {
  const { handleSnackBarOpening, CustomSnackbar } = useSnackbar();
  const router = useRouter();
  const dispatch = useDispatch();

  const validUser = useSelector((state: RootState) => state.user.data.id);

  const handleClickLogOut = () => {
    dispatch(logout());
    dispatch(deselectAll())
    deleteCookies("authToken");
    handleSnackBarOpening(alertMessages.logout.success, "success", {
      name: "INFO",
    });

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
            <MobileLink href="/notes">
              <MobileIcon className="fi fi-rr-books" />
            </MobileLink>
            <MobileLink href="/account">
              <MobileIcon className="fi fi-rs-circle-user" />
            </MobileLink>
            <DesktopLink href="/notes">Notebooks</DesktopLink>
            <DesktopLink href="/account">Account</DesktopLink>
            <div onClick={handleClickLogOut}>
              <MobileIcon className="fi fi-rr-exit" />
              <DesktopText>Log Out</DesktopText>
            </div>
          </>
        ) : (
          <>
            <MobileLink href="/login">
              <MobileIcon className="fi fi-rs-circle-user" />
            </MobileLink>
            <DesktopLink href="/login">Log in</DesktopLink>
          </>
        )}
      </Options>
      <CustomSnackbar />
    </NavContainer>
  );
};

export default NavBar;
