import UserForm from "@/components/UserForm/UserForm";
import axios from "axios";
import { useState } from "react";
import { TFormData } from "@/components/UserForm/types";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { login, setData } from "@/state/user/userSlice";
import {setCookies} from "@/actions/cookies";

// import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
// import { getCookies } from "@/actions/cookies";

const initialFormData: TFormData = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState<TFormData>(initialFormData);

  const router = useRouter();
 
  const dispatch = useDispatch();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const { email, password } = formData;

      const response = await axios.post(
        "https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/auth/login",
        { email, password }
      );

      await setCookies("authToken", response.data.authToken)
      
      dispatch(login(response.data.authToken));

      console.log(response.data.authToken);

      // const user = await axios.get(
      //   "https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/auth/me",
      //   { headers: { Authorization: `Bearer ${response.data.authToken}` } }
      // );

      // const { id, created_at, name, notebooks } = user.data;

      // dispatch(setData({ id, created_at, name, notebooks }));

      // console.log(user.data);

      router.push("/notes");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    {/* <h1>{data}</h1> */}
    <UserForm
      formType="Log in"
      onSubmit={onSubmit}
      onInputChange={onInputChange}
      formData={formData}
      disabled={false}
    />
    </>
  );
};



// export const getServerSideProps: GetServerSideProps<{data: string | undefined}> = async (context) => {
  
//   const data = await getCookies("authToken")

//   return {
//     props: {
//       data
//     },
//   };
// };


export default Login;
