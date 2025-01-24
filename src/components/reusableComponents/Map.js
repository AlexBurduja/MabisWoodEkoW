import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// Fix for Leaflet marker icons
  import L from 'leaflet';

  const icon = L.icon({ iconUrl: "/marker-icon.png"})

export default function Map(location) {
  return (
    <div>
    <MapContainer center={[44.671364,25.645547]} zoom={7} scrollWheelZoom={false} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[44.866328, 25.131094]} icon={icon}>
        <Popup>
          Mabis Wood Eko <br /> DC97A, Agres, Bogati.
        </Popup>
      </Marker>
      <Marker position={[44.4764, 26.1600]} icon={icon}>
        <Popup>
          Mabis Mob <br /> Sos. Colentina 447-449, Bucuresti.
        </Popup>
      </Marker>
    </MapContainer>

    </div>
  );
}
