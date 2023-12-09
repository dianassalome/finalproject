type TMarkerCreation = {
    location: { lat: number; lng: number } | null;
    notebook_id: number | undefined;
    closeModal: React.MouseEventHandler<HTMLElement>;
    updateUserMarkers: Function;
  };

  export type {TMarkerCreation}