import emotionStyled from "@emotion/styled";

import formatDate from "@/actions/formatDate";
import { useEffect } from "react";

import { useState } from "react";
import EditMarkerLogic from "@/components/MapPinComponents/EditMarkerLogic";
import Button from "@/components/GeneralComponents/Button";
import CreateLogLogic from "@/components/LogComponents/CreateLogLogic";

import axios from "axios";
import { TNotesFormData } from "@/components/NotebookComponents/types";
// import LogMap from "@/components/LogComponents/LogMap";
import LogElement from "@/components/LogComponents/LogElement";

import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { TNotebook } from "@/components/NotebookComponents/types";
import NextLink from "@/components/GeneralComponents/NextLink";
import { getCookies } from "@/actions/cookies";

//Context
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/state/store";
import { selectNotebook, selectMarker } from "@/state/notebook/notesSlice";

const LogsGrid = emotionStyled.div`
display: grid;
grid-template-columns: 1fr;
gap: 1%;
@media (min-width: 700px) {
  grid-template-columns: repeat(3, 1fr);
  gap: 3%;
};
`;


type TUser = {
  id: number | null;
  created_at: number | null;
  name: string;
  notebooks: TNotebook[] | [];
} | null;

type TBasicData = {
  id: number;
  created_at: number;
  title: string;
  description: string;
};


type TLog = TBasicData & {
  file: { url: string; mimetype: string };
  pin_id: number;
  user_id: number;
};

type TPin = TBasicData & {
  location: {
    type: string;
    data: {
      lng: number;
      lat: number;
    };
  };
  notebook_id: number;
  logs: [] | TLog[]
};


type TLogFormData = TNotesFormData & {
  id: number;
  created_at: number;
  file: { url: string; mimetype: string };
  pin_id: number;
  user_id: number;
};

const logInitialData = [
  {
    id: 0,
    created_at: 0,
    title: "",
    description: "",
    pin_id: 0,
    user_id: 0,
  },
];

const GeneralContainer = emotionStyled.div`
display:flex;
flex-direction: column;
padding: 5% 10%;
`;

const ButtonContainer = emotionStyled.div`
display: flex;
justify-content: center;
padding: 10px 0;
`;

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


const MarkerDisplay = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const [modalMode, setModalMode] = useState<
    "EDIT_MARKER" | "ADD_FILE" | false
  >(false);

  const dispatch = useDispatch()

  const storedMarker = useSelector(
    (state: RootState) => state.notes.marker
  );

  const storedNotebook = useSelector(
    (state: RootState) => state.notes.notebook
  );

  const [markerLogs, setMarkerLogs] = useState(storedMarker?.logs)

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = await getCookies("authToken");

      const pin = await axios.get(
        `https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/pin/${storedMarker?.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMarkerLogs(pin.data.logs)
      } catch (error) {
        console.log(error)
      }
    } 
    fetchLogs()
  }, [])

  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      setModalMode(false);
    }
  };

  const onLogCreation = (marker: TPin) => {
    console.log("MARKER AQUI", marker)
    setMarkerLogs(marker.logs)
    dispatch(selectMarker(marker))
    setModalMode(false);
  };

  const updateLogs = (marker: TPin) => {
    setMarkerLogs(marker.logs)

    
    dispatch(selectMarker(marker))
  }

  const updateNotebookMarkers = async () => {
    await fetchNotebook()
    setModalMode(false)
  }

  const fetchNotebook = async () => {
    try {
      const token = await getCookies("authToken");

      const notebook = await axios.get(
        `https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/notebook/${storedNotebook?.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch(selectNotebook(notebook.data))

    } catch (error) {
      console.log(error);
    }
  };

  console.log("MARKER LOGS", markerLogs, storedMarker)


  return (
    <GeneralContainer>
      <NextLink href={`/notes`}>
        <i className="fi fi-br-angle-small-left" /> {storedNotebook?.title}
      </NextLink>
      {storedMarker && <>
        <h2>{storedMarker.title}</h2>
        <i
          onClick={() => setModalMode("EDIT_MARKER")}
          className="fi fi-rr-edit"
        />
        <p>{formatDate(storedMarker.created_at)}</p>
        <p>{storedMarker.description}</p>
      </>}
      <ButtonContainer>
        <Button onClick={() => setModalMode("ADD_FILE")}>Add file</Button>
      </ButtonContainer>
      {storedMarker && modalMode === "EDIT_MARKER" && (
        <EditMarkerLogic
          storedMarker={storedMarker}
          closeModal={closeModal}
          updateNotebookMarkers={updateNotebookMarkers}
        />
      )}
      <LogsGrid>
        {/* {storedMarker && <LogMap />} */}
        {markerLogs &&
        markerLogs.map((log: TLogFormData) => (
          <LogElement key={log.id} log={log} updateLogs={updateLogs}/>
        ))}
      </LogsGrid>
      {storedMarker && modalMode === "ADD_FILE" && (
        <CreateLogLogic
          markerId={storedMarker.id}
          closeModal={closeModal}
          onLogCreation={onLogCreation}
        />
      )}
    </GeneralContainer>
  );
};

export default MarkerDisplay;
