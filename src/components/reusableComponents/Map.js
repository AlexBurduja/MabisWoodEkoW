import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix the default marker icon issue in Leaflet with React
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41], // Default size
  iconAnchor: [12, 41], // Anchor at bottom center
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = () => {
  const markers = [
    { id: 1, position: [51.505, -0.09], popup: "Marker 1" },
    { id: 2, position: [51.515, -0.1], popup: "Marker 2" },
  ];

  return (
    <MapContainer
      center={[51.505, -0.09]} // Initial center of the map
      zoom={13} // Initial zoom level
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((marker) => (
        <Marker key={marker.id} position={marker.position}>
          <Popup>{marker.popup}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
