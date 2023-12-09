import { useEffect, useState } from "react";
import styled from "@emotion/styled";

//Map
import { useRef } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

//Types
import { TPin } from "../NotebookComponents/types";

//Components
import CreateMarkerLogic from "./CreateMarkerLogic";

type MapPinsProps = {
  pins: TPin[] | [];
  notebook_id: number;
};

const StyledMapContainer = styled(MapContainer)`
  height: 100%;
  width: 100%;
  cursor: crosshair !important;
`;

const MapPins = ({ pins, notebook_id }: MapPinsProps) => {
  const mapRef = useRef(null);
  const tempMarkerRef = useRef(null);

  const notebookPins = pins;

  const [pinList, setPinList] = useState<TPin[] | []>(notebookPins);

  console.log("PIN LIST", pinList);

  //PIN SELECTION LOGIC
  const [selectedPin, setSelectedPin] = useState<TPin | null>(null);
  const onExpandMarkerClick = (id: number) => {
    const pin = pinList.find((pin) => pin.id === id);
    //Typescript - ele acha que pode não encontrar um id, então o resultado pode ser undefined
    selectedPin?.id === id ? setSelectedPin(null) : setSelectedPin(pin!);
    setNewLocation(null);
  };

  //MODALS
  type TFormTypes = "CREATE_MARKER" | "EDIT_MARKER";
  const [modalType, setModalType] = useState<TFormTypes | false>(false);

  //SELECT LOCATION TO CREATE NEW PIN LOGIC
  const [newLocation, setNewLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      setModalType(false);
    }
  };

  const icon = L.icon({
    iconUrl: "/map/yellow_marker.png",
    iconSize: [34, 34],
  });

  //iconAnchor: [largura/2, altura+1px]
  const tempIcon = L.icon({
    iconUrl: "/map/red_marker.png",
    iconSize: [34, 34],
    iconAnchor: [17, 35],
  });

  const onMapClick = (e: L.LeafletMouseEvent) => {
    setNewLocation(e.latlng);
    setSelectedPin(null);
  };

  const MapClickComponent = () => {
    const map = useMapEvents({
      click: () => {
        map.on("click", onMapClick);
      },
    });
    return null;
  };

  const tempMarker = tempMarkerRef.current;
  if (tempMarker) {
    (tempMarker as any).openPopup();
  }

  const updateUserMarkers = (pins: TPin[] | []) => {
    setNewLocation(null);
    setModalType(false);
    setPinList(pins);
  };

  console.log("SELECTED PIN", selectedPin);

  return (
    <>
      <StyledMapContainer
        ref={mapRef}
        center={[38.779, -9.23]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <MapClickComponent />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pinList.length &&
          pinList.map(({ id, location, title, description }) => {
            return (
              <Marker
                key={id}
                position={[location.data.lat, location.data.lng]}
                icon={icon}
              >
                <Popup>
                  <div>
                    <h4>{title}</h4>
                    <i
                      onClick={() => onExpandMarkerClick(id)}
                      className="fi fi-br-arrow-up-right-from-square"
                    />
                  </div>
                  <p>{description}</p>
                </Popup>
              </Marker>
            );
          })}
        {newLocation && (
          <Marker
            ref={tempMarkerRef}
            position={[newLocation.lat, newLocation.lng]}
            icon={tempIcon}
          >
            <Popup>
              <a onClick={() => setModalType("CREATE_MARKER")}>Pin this location!</a>
            </Popup>
          </Marker>
        )}
      </StyledMapContainer>
      {modalType === "CREATE_MARKER" && (
        <CreateMarkerLogic
          location={newLocation}
          notebook_id={notebook_id}
          closeModal={closeModal}
          updateUserMarkers={updateUserMarkers}
        ></CreateMarkerLogic>
      )}
      {/* {selectedPin && (
        <MarkerContent
          id={selectedPin.id}
          location={selectedPin.location}
          created_at={selectedPin.created_at}
          title={selectedPin.title}
          description={selectedPin.description}
        />
      )} */}
    </>
  );
};

export default MapPins;
