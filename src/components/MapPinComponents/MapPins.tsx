import { useState } from "react";
import styled from "@emotion/styled";
import NextLink from "../GeneralComponents/NextLink";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { selectMarker } from "@/state/notebook/notesSlice";

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
// import { TPin } from "../NotebookComponents/types";

//Components
import CreateMarkerLogic from "./CreateMarkerLogic";
import EditMarkerLogic from "./EditMarkerLogic";

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


type MapPinsProps = {
  pins: TPin[] | [];
};

const StyledMapContainer = styled(MapContainer)`
  height: 100%;
  width: 100%;
  cursor: crosshair !important;
`;

const TempMarkerPopup = styled.a`
  cursor: pointer;
  font-size: 16px;
`;

const MapPins = ({ pins }: MapPinsProps) => {
  const router = useRouter();
  const mapRef = useRef(null);
  const tempMarkerRef = useRef(null);
  const dispatch = useDispatch()

  console.log("PINS", pins);

  const notebookPins = pins;

  const [pinList, setPinList] = useState<TPin[] | []>(pins || []);

  //PIN SELECTION LOGIC
  // const [selectedPin, setSelectedPin] = useState<TPin | null>(null);

  const initialMapCoordinates = pinList.length
    ? { lat: pinList[0].location.data.lat, lng: pinList[0].location.data.lng }
    : { lat: 38.707, lng: -9.13 };

  const onExpandMarkerClick = (id: number) => {
    const pin = pinList.find((pin) => pin.id === id);
    pin && dispatch(selectMarker(pin))

    setNewLocation(null);
    router.push(`/notes/marker/`);
  };

  //MODALS
  const [modalType, setModalType] = useState<"CREATE_MARKER" | false>(false);

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
    iconAnchor: [17, 35],
  });

  const tempIcon = L.icon({
    iconUrl: "/map/red_marker.png",
    iconSize: [34, 34],
    iconAnchor: [17, 35],
  });

  const onMapClick = (e: L.LeafletMouseEvent) => {
    setNewLocation(e.latlng);

    //cuidado type any
    const tempMarker = tempMarkerRef.current;
    if (tempMarker) {
      (tempMarker as any).openPopup();
    }
  };

  const MapClickComponent = () => {
    const map = useMapEvents({
      click: () => {
        map.on("click", onMapClick);
      },
    });
    return null;
  };

  const updateNotebookMarkers = (pins: TPin[] | []) => {
    setNewLocation(null);
    setModalType(false);
    setPinList(pins);
  };

  // console.log(selectedPin);
  return (
    <>
      <StyledMapContainer
        ref={mapRef}
        center={initialMapCoordinates}
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
              <Marker key={id} position={location.data} icon={icon}>
                <Popup>
                  <div>
                    <i
                      onClick={onExpandMarkerClick.bind(null, id)}
                      className="fi fi-br-arrow-up-right-from-square"
                    />
                    <h4>{title}</h4>
                    <p>{description}</p>
                  </div>
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
              <TempMarkerPopup onClick={() => setModalType("CREATE_MARKER")}>
                📌 Pin this location!
              </TempMarkerPopup>
            </Popup>
          </Marker>
        )}
      </StyledMapContainer>
      {modalType === "CREATE_MARKER" && (
        <CreateMarkerLogic
          location={newLocation}
          closeModal={closeModal}
          updateNotebookMarkers={updateNotebookMarkers}
        ></CreateMarkerLogic>
      )}
    </>
  );
};

export default MapPins;
