import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression } from "leaflet";


export default function HeatMap() {
   const position: LatLngExpression = [20, 0]; // Center at equator

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapContainer
        center={position}
        zoom={2}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          // ✅ Use the correct props for react-leaflet 4.x and 5.x
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}