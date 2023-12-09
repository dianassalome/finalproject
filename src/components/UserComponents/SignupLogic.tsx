import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

//Functions
import { setCookies } from "@/actions/cookies";

//Components
import UserForm from "@/components/UserComponents/UserForm";

//Types
import { TFormData } from "@/components/UserComponents/types";

const Signup = () => {
  const [formData, setFormData] = useState<TFormData>({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

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

      const { name, email, password } = formData;

      const response = await axios.post(
        "https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/auth/signup",
        { name, email, password }
      );

      await setCookies("authToken", response.data.authToken);

      router.push("/notes");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserForm
      formType="Sign up"
      onSubmit={onSubmit}
      onInputChange={onInputChange}
      formData={formData}
      disabled={false}
    />
  );
};

export default Signup;
