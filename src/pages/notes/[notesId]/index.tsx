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
} | null

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const notebookId = context.query.notesId

    const cookies = context.req.headers.cookie;

    const token = cookies?.replace("authToken=", "");

    const userValidation = await axios.get(
      "https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/auth/me",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { id, created_at, name, notebooks } = userValidation.data;
    const user = { id, created_at, name, notebooks};

    const notebook = await axios.get(
      `https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/notebook/${notebookId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    // if (typeof notebookId === "string") {
    //   const queryNotebook = notebooks.find((notebook: TNotebook) => notebook.id === parseInt(notebookId))
    
      return { props: { user, queryNotebook: notebook.data } };
    
    // }

    // return { props: { user} };
 
  } catch (error) {
    console.log(error)
    return {
      redirect: {
        permanent: false,
        destination: `/notes`,
      },
    };
  }
}

const NotebooksPage = ({
  user, queryNotebook
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  type TFormTypes = "CREATE_NOTEBOOK" | "EDIT_NOTEBOOK";

  const dispatch = useDispatch();
  dispatch(setData(user));
  console.log("USER",user, user.notebooks)
  const router = useRouter()

  const [modalType, setModalType] = useState<TFormTypes | false>(false);

  const handleNotebookSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const notebookId = parseInt(e.target.value);

    router.push(`/notes/${notebookId}`)
  };

  const setForm = (type: TFormTypes) => {
    setModalType(type);
  };

  const updateUserNotebooks = (
    notebook: TBasicData
  ) => {
    console.log("ESTOU NO NOTESID", notebook?.id)
    setModalType(false);
    notebook?.id ? router.push(`/notes/${notebook.id}`) : router.push(`/notes`)
  };

  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    e.target === e.currentTarget && setModalType(false);
  };

  return (
    <GeneralContainer>
      <SideBar>
        <NotebooksDashboard
          notebooks={user.notebooks}
          handleNotebookSelection={handleNotebookSelection}
          setForm={setForm}
          selectedNotebook={queryNotebook}
        />
        <div>
            <h3>{queryNotebook.title}</h3>
            <i
              onClick={setForm.bind(null, "EDIT_NOTEBOOK")}
              className="fi fi-rr-edit"
            />
            <p>{formatDate(queryNotebook.created_at)}</p>
            <p>{queryNotebook.description}</p>
          </div>
      </SideBar>
      <MapDisplay id={queryNotebook.id} />
      {modalType === "CREATE_NOTEBOOK" && (
        <CreateNotebookLogic
          updateUserNotebooks={updateUserNotebooks}
          closeModal={closeModal}
        />
      )}
      {modalType === "EDIT_NOTEBOOK" && (
        <EditNotebookLogic
          notebookId={queryNotebook.id}
          updateUserNotebooks={updateUserNotebooks}
          closeModal={closeModal}
          initialData={{
            title: queryNotebook.title,
            description: queryNotebook.description,
          }}
        />
      )}
    </GeneralContainer>
  );
};

export default NotebooksPage;
