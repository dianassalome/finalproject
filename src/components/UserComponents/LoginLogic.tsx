import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { login } from "@/state/user/userSlice";

//Functions
import { setCookies } from "@/actions/cookies";

//Components
import UserForm from "@/components/UserComponents/UserForm";

//Types
import { TFormData } from "@/components/UserComponents/types";

const Login = () => {
  const [formData, setFormData] = useState<TFormData>({email: "", password: ""});

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

      await setCookies("authToken", response.data.authToken);

      //acho qu evou retirar o token da store
      dispatch(login(response.data.authToken));

      router.push("/notes");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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


export default Login;
