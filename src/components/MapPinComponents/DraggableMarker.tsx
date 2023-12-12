import { useState, useRef, useMemo, useCallback } from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";

type TDraggableMarkerProps = {
  location: { lat: number; lng: number };
  onLocationChange: Function;
};
const DraggableMarker = ({
  location,
  onLocationChange,
}: TDraggableMarkerProps) => {
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const latLng = (marker as any).getLatLng();
          console.log("ISTO È O QUE",latLng)
          onLocationChange(latLng);
        }
      },
    }),
    []
  );

  const icon = L.icon({
    iconUrl: "/map/red_marker.png",
    iconSize: [34, 34],
    iconAnchor: [17, 35],
  });

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={location}
      ref={markerRef}
      icon={icon}
    ></Marker>
  );
};

export default DraggableMarker;
