import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/state/store";
import { setData, logout } from "@/state/user/userSlice";
import { useRouter } from "next/router";

//Functions
import formatDate from "@/actions/formatDate";

//Style
import emotionStyled from "@emotion/styled";

//Types
import { TBasicData } from "@/components/NotebookComponents/types";

//Components
import NotebooksDashboard from "@/components/NotebookComponents/NotebooksDashboard";
import CreateNotebookLogic from "@/components/NotebookComponents/CreateNotebookLogic";
import EditNotebookLogic from "@/components/NotebookComponents/EditNotebookLogic";
import MapDisplay from "@/components/MapPinComponents/MapDisplay";

const SideBar = emotionStyled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  justify-content: start;
  gap: 5px;
  word-wrap: break-word;
  height: 50vh;
  overflow: auto;
  margin-bottom: 10px;
  @media (min-width: 700px) {
    width: 320px;
    // max-width: 320px;
    height: auto;
  }
`;

const GeneralContainer = emotionStyled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
  @media (min-width: 700px) {
    flex-direction: row;
    height: 70vh;
    width: 100%;
  }
`;
const Container = emotionStyled.div`
width: 100%;
@media (max-width: 700px) {
  height: 350px;
}
`;
const PlaceholderContainer = emotionStyled.div`
display: flex;
height: 100%;
justify-content: center;
align-items: center;
font-size: 20px;
border-top: 1px solid rgb(230,230,230);
@media (min-width: 700px) {
  border: none;
  border-left: 1px solid rgb(230,230,230);
}
`;

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

    const token = cookies?.replace("authToken=", "");

    const userValidation = await axios.get(
      "https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/auth/me",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { id, created_at, name, notebooks } = userValidation.data;
    const user = { id, created_at, name, notebooks };

    return notebooks.length
      ? {
          redirect: {
            permanent: false,
            destination: `/notes/${notebooks[0].id}`,
          },
        }
      : { props: { user } };
  } catch (error) {
    console.log(error)
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
  type TFormTypes = "CREATE_NOTEBOOK";

  const dispatch = useDispatch();
  dispatch(setData(user));

  const [userNotebooks, setUserNotebooks] = useState<TBasicData[] | []>(
    user.notebooks
  );

  const [modalType, setModalType] = useState<TFormTypes | false>(false);

  const selectedNotebooksInitialState = userNotebooks[0];
  const [selectedNotebook, setSelectedNotebook] = useState<
    TBasicData | undefined
  >(selectedNotebooksInitialState);

  const router = useRouter();

  const handleNotebookSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const notebookId = parseInt(e.target.value);

    const notebook = userNotebooks.find(({ id }) => id === notebookId);

    setSelectedNotebook(notebook);
  };

  const setForm = (type: TFormTypes) => {
    setModalType(type);
  };

  const updateUserNotebooks = (notebook: TBasicData) => {
    console.log("ESTOU NO NOTESID", notebook?.id);
    setModalType(false);
    notebook?.id ? router.push(`/notes/${notebook.id}`) : router.push(`/notes`);
  };

  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    e.target === e.currentTarget && setModalType(false);
  };

  return (
    <GeneralContainer>
      <SideBar>
        <NotebooksDashboard
          notebooks={userNotebooks}
          handleNotebookSelection={handleNotebookSelection}
          setForm={setForm}
          selectedNotebook={selectedNotebook}
        />
      </SideBar>
      <Container>
        <PlaceholderContainer>
          <p>You have no notebooks.</p>
        </PlaceholderContainer>
      </Container>
      {modalType === "CREATE_NOTEBOOK" && (
        <CreateNotebookLogic
          updateUserNotebooks={updateUserNotebooks}
          closeModal={closeModal}
        />
      )}
    </GeneralContainer>
  );
};

export default NotebooksPage;
