import MarkerModalLayout from "../../ModalComponents/MarkerModalLayout";
import emotionStyled from "@emotion/styled";

import { TPin } from "../../NotebookComponents/types";
import formatDate from "@/actions/formatDate";

import { use, useState } from "react";
import EditMarkerLogic from "../EditMarkerLogic";
import Button from "../../Button";
import CreateLogLogic from "../../LogComponents/CreateLogLogic";
import { useEffect } from "react";
import axios from "axios";
// import LogListElement from "../LogComponents/LogListElement";
import { TNotesFormData } from "../../NotebookComponents/types";
import { getCookies } from "@/actions/cookies";
import LogElement from "../../LogComponents/LogElement";
import LogMap from "../../LogComponents/LogMap";
import { TFormData } from "../../UserComponents/types";

const MarkerDescriptionContainer = emotionStyled.div`
width: 80%;
`;

const LogsGrid = emotionStyled.div`
display: grid;
width: 80%;
grid-template-columns: repeat(3, 1fr);
// gap: 3%;
// justify-content: center;
`;

type TMarkerDisplayProps = {
  notebookId: number;
  marker: TPin;
  closeModal: React.MouseEventHandler<HTMLElement>;
  updateNotebookMarkers: Function;
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

const MarkerDisplay = ({
  closeModal,
  marker,
  notebookId,
  updateNotebookMarkers,
}: TMarkerDisplayProps) => {
  const [editMode, setEditMode] = useState(false);

  const [addFile, setAddFile] = useState(false);

  const [markerLogs, setMarkerLogs] = useState<TLogFormData[] | []>([]);

  useEffect(() => {
    const fetchMarkerLogs = async () => {
      try {
        const token = await getCookies("authToken");
        const pin = await axios.get(
          `https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/pin/${marker.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("FETCHED PIN", pin.data);
        setMarkerLogs(pin.data.logs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMarkerLogs();
  }, []);

  return (
    <MarkerModalLayout closeModal={closeModal}>
      {!editMode ? (
        <MarkerDescriptionContainer>
          <h2>{marker.title}</h2>
          <i onClick={() => setEditMode(true)} className="fi fi-rr-edit" />
          <p>{formatDate(marker.created_at)}</p>
          <p>{marker.description}</p>
        </MarkerDescriptionContainer>
      ) : (
        <EditMarkerLogic
          notebookId={notebookId}
          initialData={marker}
          closeModal={closeModal}
          updateNotebookMarkers={updateNotebookMarkers}
        />
      )}
      <LogsGrid>
        {markerLogs.length > 0 && <LogMap markerLogs={markerLogs} />}
      </LogsGrid>
      <Button onClick={() => setAddFile(!addFile)}>Add file</Button>
      {addFile && (
        <CreateLogLogic
          id={marker.id}
          setAddFile={setAddFile}
          // fetchPin={fetchPin}
        />
      )}
    </MarkerModalLayout>
  );
};

export default MarkerDisplay;

// {markerLogs.length &&
//   markerLogs.map((log: {id: number, title: string}) => {
//     console.log("DENTRO DO MAP", log, log.id, log.title);
//     return (
//       <LogListElement
//         key={log.id}
//         // markerId={marker.id}
//         // id={log.id}
//         title={log.title}
//         // file={log.file}
//         // fetchPin={fetchPin}
//       />
//     );
//   })}
