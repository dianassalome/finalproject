import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/state/store";
import { setData, logout } from "@/state/user/userSlice";
import { useRouter } from "next/router";
import NavBar from "@/components/NavBar";

//Components
import FormLogic from "@/components/NotesForm/FormLogic";
import Button from "@/components/Button";
import CenterElementsContainer from "@/components/GeneralContainers/CenterElementsContainer";
// import Note from "./note";

import NotebookListElement from "@/components/NotesForm/NotebookListElement";
import Title1 from "@/components/Titles/Title1";

type TNotebook = {
  id: number;
  created_at: number;
  title: string;
  description: string;
};

type TUser = {
  id: number | null;
  created_at: number | null;
  name: string;
  notebooks: TNotebook[] | [];
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

    const { id, created_at, name, notebooks } = userValidation.data;
    const user = { id, created_at, name, notebooks };

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

const NotebooksPage = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const initialModal = {
    fetchType: "",
    url: "",
    customFormData: {
      title: "",
      description: "",
    },
  };

  const dispatch = useDispatch();
  dispatch(setData(user));

  const [userNotebooks, setUserNotebooks] = useState<TNotebook[] | []>(
    user.notebooks
  );

  const [modal, setModal] = useState(initialModal);
  const [selectedNotebook, setSelectedNotebook] = useState<TNotebook | null>(
    null
  );

  const handleCreateButton = () => {
    setModal({
      fetchType: "post",
      url: "https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/notebook",
      customFormData: { title: "", description: "" },
    });
  };

  const handleEditButton = (id: number, title: string, description: string) => {
    setModal({
      fetchType: "patch",
      url: `https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/notebook/${id}`,
      customFormData: { title, description },
    });
  };

  const resetModal = () => {
    setModal(initialModal);
  };

  const handleNotebookClick = (
    id: number,
    created_at: number,
    title: string,
    description: string
  ) => {
    setSelectedNotebook({ id, created_at, title, description });
  };

  // console.log(selectedNotebook);

  return (
    <>
    {/* <NavBar validUser={true}/> */}
    <CenterElementsContainer>
      <Title1>My Notebooks</Title1>
      <Button onClick={handleCreateButton}>Create new notebook</Button>

      {userNotebooks &&
        userNotebooks.map(({ id, created_at, title, description }) => (
          <div
            key={id}
            onClick={handleNotebookClick.bind(
              null,
              id,
              created_at,
              title,
              description
            )}
          >
            <NotebookListElement
              handleEditButton={handleEditButton}
              title={title}
              created_at={created_at}
              description={description}
            ></NotebookListElement>
            {/* <span>{title}</span>
            <button
              onClick={handleEditButton.bind(null, id, title, description)}
            >
              <i className="fi fi-rr-edit"></i>
            </button> */}
          </div>
        ))}
      {modal.fetchType && (
        <FormLogic
          fetchType={modal.fetchType}
          url={modal.url}
          customFormData={modal.customFormData}
          resetModal={resetModal}
          setUserNotebooks={setUserNotebooks}
        />
      )}
      {/* {selectedNotebook && (
        <Note
          id={selectedNotebook.id}
          title={selectedNotebook.title}
          description={selectedNotebook.description}
          created_at={selectedNotebook.created_at}
        />
      )} */}
    </CenterElementsContainer>
    </>
  );
};

export default NotebooksPage;
