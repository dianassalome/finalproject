import styled from "@emotion/styled";
import type { GetServerSideProps } from "next";
import axios from "axios";

//Components
import Login from "@/components/UserComponents/LoginLogic";
import CenterElementsContainer from "@/components/GeneralContainers/CenterElementsContainer";
import NextLink from "@/components/NextLink";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import emotionStyled from "@emotion/styled";

const FaintLink = styled(NextLink)`
  color: rgb(61, 61, 61);
  text-decoration: underline;
  font-size: 12px;
  &:hover {
    color: rgb(0, 0, 0);
  }
`;

const Container = emotionStyled(CenterElementsContainer)`
height: 100%;
min-height: 70vh;
`

const LoginPage = () => {
  const userInStore = useSelector((state: RootState) => state.user);

  return (
    <Container>
      <Login />
      <FaintLink href="/signup">
        New here? Get started by creating an account.
      </FaintLink>
    </Container>
  );
};

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = context.req.headers.cookie;

    const token = cookies?.replace("authToken=", "");

    await axios.get(
      "https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/auth/me",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return {
      redirect: {
        permanent: false,
        destination: `/notes`,
      },
    };
  } catch (error) {
    console.log(error)
    return { props: {} };
  }
};
