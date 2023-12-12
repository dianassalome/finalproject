import MarkerModalLayout from "../ModalComponents/MarkerModalLayout";

import { TPin } from "../NotebookComponents/types";
import formatDate from "@/actions/formatDate";

import { useState } from "react";
import EditMarkerLogic from "./EditMarkerLogic";

type TMarkerDisplayProps = {
  notebookId: number;
  marker: TPin;
  closeModal: React.MouseEventHandler<HTMLElement>;
  updateNotebookMarkers: Function;
};

const MarkerDisplay = ({
  closeModal,
  marker,
  notebookId,
  updateNotebookMarkers,
}: TMarkerDisplayProps) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <MarkerModalLayout closeModal={closeModal}>
      {!editMode ? (
        <div>
          <h3>{marker.title}</h3>
          <i onClick={() => setEditMode(true)} className="fi fi-rr-edit" />
          <p>{formatDate(marker.created_at)}</p>
          <p>{marker.description}</p>
        </div>
      ) : (
        <EditMarkerLogic
          notebookId={notebookId}
          initialData={marker}
          closeModal={closeModal}
          updateNotebookMarkers={updateNotebookMarkers}
        />
      )}
    </MarkerModalLayout>
  );
};

export default MarkerDisplay;
