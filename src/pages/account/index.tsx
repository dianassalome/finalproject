import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import axios from "axios";
import styled from "@emotion/styled";
import { useState } from "react";
import { TFormData } from "@/components/UserForm/types";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setData, logout } from "@/state/user/userSlice";

//Components
import CenterElementsContainer from "@/components/GeneralContainers/CenterElementsContainer";
import Button from "@/components/Button";
import UserForm from "@/components/UserForm/UserForm";
import { userAgent } from "next/server";

const RedButton = styled(Button)`
  background-color: rgb(255, 0, 0);
  &:hover {
    background-color: rgb(220, 20, 60);
  }
`;

const AccountSettings = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const initialFormData: TFormData = {
    name: user.name,
    email: user.email,
    password: "",
  };

  const [editMode, setEditMode] = useState(false);
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

      const { name, email } = formData;

      const response = await axios.patch(
        `https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/user/${user.id}`,
        { name, email },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      const { id, created_at, name: username, notebooks } = response.data;
      const updatedUser = { id, created_at, name: username, notebooks };

      console.log(updatedUser);
      dispatch(setData(updatedUser));

      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditButton = () => {
    setEditMode(!editMode);
  };

  const handleDeleteButton = async () => {
    try {
      await axios.delete(
        `https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/user/${user.id}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      dispatch(logout());
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CenterElementsContainer>
        <Button onClick={handleEditButton}>
          {editMode ? (
            <i className="fi fi-br-cross-circle" />
          ) : (
            <i className="fi fi-rr-edit" />
          )}
        </Button>
        <UserForm
          formType={""}
          formData={formData}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          disabled={editMode ? false : true}
        />

        <RedButton onClick={handleDeleteButton}>Delete account</RedButton>
      </CenterElementsContainer>
    </>
  );
};

export default AccountSettings;

type TUser = {
  token: string | undefined;
  id: number | null;
  created_at: number | null;
  email: string;
  name: string;
} | null;

export const getServerSideProps = (async (context) => {
  try {
    const cookies = context.req.headers.cookie;

    const cleanCookie = cookies?.replace("authToken=", "");

    const userValidation = await axios.get(
      "https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/auth/me",
      { headers: { Authorization: `Bearer ${cleanCookie}` } }
    );

    console.log("USER VALIDATION INSIDE ACTION", userValidation.data);

    const { id, created_at, email, name } = userValidation.data;
    const user = { id, created_at, email, name, token: cleanCookie };

    return { props: { user } };
  } catch (error) {
    console.log("ESTOU A PASSAR AQUI", error);
    return {
      redirect: {
        permanent: false,
        destination: `/login`,
      },
    };
  }
}) satisfies GetServerSideProps<{
  user: TUser;
}>;
