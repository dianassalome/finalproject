type TMarkerCreation = {
    location: { lat: number; lng: number } | null;
    closeModal: React.MouseEventHandler<HTMLElement>;
    updateNotebookMarkers: Function;
  };

  export type {TMarkerCreation}