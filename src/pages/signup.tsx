//Components
import Signup from "@/components/UserComponents/SignupLogic";
import CenterElementsContainer from "@/components/GeneralContainers/CenterElementsContainer";
import type { GetServerSideProps } from "next";
import axios from "axios";
import emotionStyled from "@emotion/styled";

const Container = emotionStyled(CenterElementsContainer)`
height: 100%;
min-height: 70vh;
`

const SignupPage = () => {
  return (
    <Container>
      <Signup />
    </Container>
  );
};

export default SignupPage;

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
