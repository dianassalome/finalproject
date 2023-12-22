import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import axios from "axios";
import { useState } from "react";
import { TFormData } from "@/components/UserComponents/types";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setData, logout } from "@/state/user/userSlice";
import emotionStyled from "@emotion/styled";

//Alerts
import alertMessages from "@/assets/alertMessages";
import useSnackbar from "@/components/CustomHooks/useSnackbar";

//Components
import CenterElementsContainer from "@/components/GeneralContainers/CenterElementsContainer";
import Button from "@/components/GeneralComponents/Button";
import UserForm from "@/components/UserComponents/UserForm";
import { RedButton } from "@/components/FormComponents/RedButton";

const Container = emotionStyled(CenterElementsContainer)`
height: 100%;
min-height: 70vh;
`;

const AccountSettings = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { handleSnackBarOpening, CustomSnackbar } = useSnackbar();

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

      dispatch(setData(updatedUser));

      handleSnackBarOpening(alertMessages.edit.success, "success", {
        name: "INFO",
      });

      setEditMode(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message);
        const message = error.response?.data.message;
        handleSnackBarOpening(message, "error", { name: "INFO" });
      } else {
        console.error(error);
      }
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

      handleSnackBarOpening(alertMessages.delete.success, "success", {
        name: "INFO",
      });

      dispatch(logout());
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message);
        const message = error.response?.data.message;
        handleSnackBarOpening(message, "error", { name: "INFO" });
      } else {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Container>
        <Button onClick={handleEditButton}>
          {editMode ? (
            <>
              <i className="fi fi-br-cross-circle" /> Cancel
            </>
          ) : (
            <>
              <i className="fi fi-rr-edit" /> Edit
            </>
          )}
        </Button>
        <UserForm
          formType={""}
          formData={formData}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          disabled={editMode ? false : true}
        />
        <RedButton
          onClick={handleSnackBarOpening.bind(
            null,
            alertMessages.delete.warning,
            "warning",
            { name: "CHOICE", function: handleDeleteButton, button: "Delete" }
          )}
        >
          Delete account
        </RedButton>
      </Container>
      <CustomSnackbar />
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

    const { id, created_at, email, name } = userValidation.data;
    const user = { id, created_at, email, name, token: cleanCookie };

    return { props: { user } };
  } catch (error) {
    console.log(error);
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
