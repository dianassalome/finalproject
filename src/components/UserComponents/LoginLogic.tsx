import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

//Alerts
import alertMessages from "@/assets/alertMessages";
import useSnackbar from "../CustomHooks/useSnackbar";

//Functions
import { setCookies } from "@/actions/cookies";

//Components
import UserForm from "@/components/UserComponents/UserForm";

//Types
import { TFormData } from "@/components/UserComponents/types";

const Login = () => {
  const {handleSnackBarOpening, CustomSnackbar} = useSnackbar()
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<TFormData>({
    email: "",
    password: "",
  });

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
  
      handleSnackBarOpening(alertMessages.login.success, "success", {name: "INFO"});

      setTimeout(() => {
        router.push("/notes");
      }, 1000);
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message);
        const message = error.response?.data.message;
        handleSnackBarOpening(message, "error", {name: "INFO"});
      } else {
        console.error(error);
      }
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
      <CustomSnackbar/>
    </>
  );
};

export default Login;
