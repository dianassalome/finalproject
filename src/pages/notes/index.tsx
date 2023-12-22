import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import axios from "axios";
import { setData } from "@/state/user/userSlice";
import { useDispatch } from "react-redux";
import { deselectMarker } from "@/state/notebook/notesSlice";

//Style
import emotionStyled from "@emotion/styled";

//Types
import { TPin } from "@/components/NotebookComponents/types";

//Components
import NotebooksDashboard from "@/components/NotebookComponents/NotebooksDashboard";
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
  user_id: number;
  pins?: TPin[] | [];
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

const NotebooksPage = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const dispatch = useDispatch();
  dispatch(setData(user));
  dispatch(deselectMarker())

  return (
    <GeneralContainer>
      <SideBar>
        <NotebooksDashboard />
      </SideBar>
      <MapDisplay />
    </GeneralContainer>
  );
};

export default NotebooksPage;
