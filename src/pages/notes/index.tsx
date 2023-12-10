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
import Title1 from "@/components/Titles/Title1";

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

    const { id, created_at, name, notebooks } = userValidation.data;
    const user = { id, created_at, name, notebooks };

    return { props: { user } };
  } catch (error) {
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

  type TFormTypes = "CREATE_NOTEBOOK" | "EDIT_NOTEBOOK";

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

  const handleNotebookSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const notebookId = parseInt(e.target.value);

    const notebook = userNotebooks.find(({ id }) => id === notebookId);

    setSelectedNotebook(notebook);
  };

  const setForm = (type: TFormTypes) => {
    setModalType(type);
  };

  const updateUserNotebooks = (notebooks: TBasicData[] | [], notebook: TBasicData) => {
    setModalType(false);
    setUserNotebooks(notebooks);
    setSelectedNotebook(notebook)
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
        {selectedNotebook && (
          <div>
            <h3>{selectedNotebook.title}</h3>
            <i onClick={setForm.bind(null, "EDIT_NOTEBOOK")} className="fi fi-rr-edit" />
            <p>{formatDate(selectedNotebook.created_at)}</p>
            <p>{selectedNotebook.description}</p>
          </div>
        )}
      </SideBar>
      <MapDisplay id={selectedNotebook?.id} />
      {modalType === "CREATE_NOTEBOOK" && (
        <CreateNotebookLogic
          updateUserNotebooks={updateUserNotebooks}
          closeModal={closeModal}
        />
      )}
      {selectedNotebook && modalType === "EDIT_NOTEBOOK" && (
        <EditNotebookLogic
          notebookId={selectedNotebook.id}
          updateUserNotebooks={updateUserNotebooks}
          closeModal={closeModal}
          initialData={{
            title: selectedNotebook.title,
            description: selectedNotebook.description,
          }}
        />
      )}
    </GeneralContainer>
  );
};

export default NotebooksPage;
