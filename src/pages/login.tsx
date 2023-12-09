import styled from "@emotion/styled";
import type { GetServerSideProps } from "next";
import axios from "axios";

//Components
import Login from "@/components/UserComponents/LoginLogic";
import CenterElementsContainer from "@/components/GeneralContainers/CenterElementsContainer";
import NextLink from "@/components/NextLink";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/state/user/userSlice";
import { RootState } from "@/state/store";

const FaintLink = styled(NextLink)`
  color: rgb(61, 61, 61);
  text-decoration: underline;
  font-size: 12px;
  &:hover {
    color: rgb(0, 0, 0);
  }
`;

const LoginPage = () => {
  const userInStore = useSelector((state: RootState) => state.user);
  console.log("USER IN STORE - LOGIN PAGE", userInStore);

  return (
    <CenterElementsContainer>
      <Login />
      <FaintLink href="/signup">
        New here? Get started by creating an account.
      </FaintLink>
    </CenterElementsContainer>
  );
};

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = context.req.headers.cookie;

    const cleanCookie = cookies?.replace("authToken=", "");

    const userValidation = await axios.get(
      "https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/auth/me",
      { headers: { Authorization: `Bearer ${cleanCookie}` } }
    );

    return {
      redirect: {
        permanent: false,
        destination: `/notes`,
      },
    };
  } catch (error) {
    return { props: {} };
  }
};
