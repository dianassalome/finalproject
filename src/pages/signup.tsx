//Components
import Signup from "@/components/UserForm/SignupLogic";
import CenterElementsContainer from "@/components/GeneralContainers/CenterElementsContainer";
import type { GetServerSideProps } from "next";
import axios from "axios";

const SignupPage = () => {
  return (
    <CenterElementsContainer>
      <Signup />
    </CenterElementsContainer>
  );
};

export default SignupPage;

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
    return {props: {}}
  }
}
