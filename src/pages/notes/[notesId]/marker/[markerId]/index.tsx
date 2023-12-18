import emotionStyled from "@emotion/styled";

import { TPin } from "@/components/NotebookComponents/types";
import formatDate from "@/actions/formatDate";

import { useState } from "react";
import EditMarkerLogic from "@/components/MapPinComponents/EditMarkerLogic";
import Button from "@/components/Button";
import CreateLogLogic from "@/components/LogComponents/CreateLogLogic";

import axios from "axios";
import { TNotesFormData } from "@/components/NotebookComponents/types";
import LogMap from "@/components/LogComponents/LogMap";
import { GetServerSideProps } from "next";
import { TNotebook } from "@/components/NotebookComponents/types";
import NextLink from "@/components/NextLink";

const LogsGrid = emotionStyled.div`
display: grid;
grid-template-columns: 1fr;
gap: 1%;
@media (min-width: 700px) {
  grid-template-columns: repeat(3, 1fr);
  gap: 3%;
};
`;

type TMarkerDisplayProps = {
  notebook: TNotebook;
  marker: TPin & { logs: TLogFormData[] | [] };
  // closeModal: React.MouseEventHandler<HTMLElement>;
  // updateNotebookMarkers: Function;
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const markerId = context.query.markerId;
    const notebookId = context.query.notesId;

    const cookies = context.req.headers.cookie;

    const token = cookies?.replace("authToken=", "");

    const userValidation = await axios.get(
      "https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/auth/me",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { id, created_at, name, notebooks } = userValidation.data;
    // const user = { id, created_at, name, notebooks};

    const marker = await axios.get(
      `https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/pin/${markerId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (typeof notebookId === "string") {
      const notebook = notebooks.find(
        ({ id }: { id: number }) => id === parseInt(notebookId)
      );

      return { props: { notebook, marker: marker.data } };
    }

    return { props: { marker: marker.data } };
  } catch (error) {
    console.log(error)
    return {
      redirect: {
        permanent: false,
        destination: `/notes`,
      },
    };
  }
};

const MarkerDisplay = ({ marker, notebook }: TMarkerDisplayProps) => {
  console.log("ENTREI AQUI");
  const [modalMode, setModalMode] = useState<"EDIT_MARKER" | "ADD_FILE" | false>(false);

  // const [addFile, setAddFile] = useState(false);

  // const [markerLogs, setMarkerLogs] = useState<TLogFormData[] | []>(
  //   marker.logs
  // );

  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      setModalMode(false);
    }
  };

  const onLogCreation = () => {
    setModalMode(false)
    
  }

  return (
    <GeneralContainer>
      <NextLink href={`/notes/${notebook.id}`}>
        <i className="fi fi-br-angle-small-left" /> {notebook.title}
      </NextLink>
      <>
        <h2>{marker.title}</h2>
        <i onClick={() => setModalMode("EDIT_MARKER")} className="fi fi-rr-edit" />
        <p>{formatDate(marker.created_at)}</p>
        <p>{marker.description}</p>
      </>
      <ButtonContainer>
        <Button onClick={() => setModalMode("ADD_FILE")}>Add file</Button>
      </ButtonContainer>
      {modalMode === "EDIT_MARKER" && (
        <EditMarkerLogic
          notebookId={notebook.id}
          initialData={marker}
          closeModal={closeModal}
        />
      )}
      <LogsGrid>
        {marker.logs.length > 0 && <LogMap markerLogs={marker.logs} />}
      </LogsGrid>
      {modalMode === "ADD_FILE" && (
        <CreateLogLogic
          id={marker.id}
          closeModal={closeModal}
          onLogCreation={onLogCreation}
          notebookId={notebook.id}
        />
      )}
    </GeneralContainer>
  );
};

export default MarkerDisplay;
