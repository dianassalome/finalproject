import { MapContainer as LMapContainer } from "react-leaflet";


//any
export const MapContainer = ({ forwardedRef, ...props }: any) => (
  <LMapContainer {...props} ref={forwardedRef} />
);
