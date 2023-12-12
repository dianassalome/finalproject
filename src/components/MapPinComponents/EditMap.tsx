import { useState } from "react";
import styled from "@emotion/styled";

//Map
import { useRef } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

//Types
import { TPin } from "../NotebookComponents/types";
import DraggableMarker from "./DraggableMarker";

const StyledMapContainer = styled(MapContainer)`
  height: 300px;
  width: 300px;
  cursor: crosshair !important;
`;

type TEditMapProps = {
  location: {lat: number, lng: number}
  onLocationChange: Function
};

const EditMapCoordinates = ({ location, onLocationChange }: TEditMapProps) => {
  // const [position, setPosition] = useState(location);
  const mapRef = useRef(null);

  return (
    <StyledMapContainer
      ref={mapRef}
      center={location}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker location={location} onLocationChange={onLocationChange}/>
    </StyledMapContainer>
  );
};

export default EditMapCoordinates;
